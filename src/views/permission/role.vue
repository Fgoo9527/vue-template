<template>
  <a-card>
    <a-button type="primary" @click="handleToAddRole">{{$t('permission.addRole')}}</a-button>
    <a-table :columns="columns" :data-source="rolesList">
      <template v-slot:name="{ text }">
        <a>{{ text }}</a>
      </template>
      <template v-slot:action="{ record, index }">
        <span>
          <a-space>
            <a-button type="primary" @click="handleToEditRole(record)">{{$t('permission.editPermission')}}</a-button>
            <a-popconfirm
              title="Are you sure delete this task?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="handleToDeleteRole(record, index)"
              @cancel="cancel"
            >
              <a-button type="danger">{{$t('permission.delete')}}</a-button>
            </a-popconfirm>
          </a-space>
        </span>
      </template>
    </a-table>
  </a-card>
  <a-modal
    :title="dialogType === 'edit' ? 'Edit Role' : 'New Role'"
    v-model:visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
  >
    <a-form :model="form.role">
      <a-form-item label="Name">
        <a-input v-model:value="form.role.name" placeholder="Role Name" />
      </a-form-item>
      <a-form-item label="Desc">
        <a-input
          v-model:value="form.role.description"
          placeholder="Role Description"
          type="textarea"
        />
      </a-form-item>
      <a-form-item>
        <a-tree
          checkable
          :tree-data="treeData"
          v-model:checkedKeys="checkedKeys"
          :replaceFields="replaceFields"
          @select="onSelect"
          @check="onCheck"
        >
        </a-tree>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  reactive,
  nextTick
} from 'vue'
import path from 'path'
import { deepClone } from '@/utils'
import {
  getRoutes,
  getRoles,
  updateRole,
  deleteRole,
  addRole
} from '@/api/role'
import { notification, message } from 'ant-design-vue'
export default defineComponent({
  setup() {
    const columns = ref([
      {
        title: 'Role Key',
        dataIndex: 'key',
        key: 'key'
      },
      {
        title: 'Role Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description'
      },
      {
        title: 'Action',
        key: 'action',
        slots: { customRender: 'action' }
      }
    ])
    const defaultRole = {
      key: '',
      name: '',
      description: '',
      routes: []
    }
    const form = reactive({ role: Object.assign({}, defaultRole) })
    const _onlyOneShowingChild = (children = [], parent) => {
      let onlyOneChild = null
      const showingChildren = children.filter((item) => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    }
    const generateRoutes = (routes, basePath = '/') => {
      const res = []

      for (let route of routes) {
        // skip some route
        if (route.hidden) {
          continue
        }

        const onlyOneShowingChild = _onlyOneShowingChild(route.children, route)

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title
        }

        // recursive child routes
        if (route.children) {
          data.children = generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    }
    const serviceRoutes = ref([])
    const routes = ref([])
    const _getRoutes = async() => {
      const res = await getRoutes()
      serviceRoutes.value = res.data
      routes.value = generateRoutes(res.data)
    }
    const rolesList = ref([])
    const _getRoles = async() => {
      const res = await getRoles()
      rolesList.value = res.data
    }
    const visible = ref(false)
    const generateArr = (routes) => {
      let data = []
      routes.forEach((route) => {
        data.push(route)
        if (route.children) {
          const temp = generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    }
    const treeData = computed(() => routes.value)
    const checkedKeys = ref([])
    const replaceFields = ref({ key: 'path' })
    const dialogType = ref('new')
    const handleToEditRole = async(record) => {
      dialogType.value = 'edit'
      visible.value = true
      form.role = deepClone(record)
      await nextTick()
      const routes = generateRoutes(form.role.routes)
      const routesArr = generateArr(routes)
      const routeKeys = []
      routesArr.forEach((item) => {
        routeKeys.push(item.path)
      })
      checkedKeys.value = routeKeys
    }
    const handleToDeleteRole = async(record, index) => {
      await deleteRole(record.key)
      rolesList.value.splice(index, 1)
      message.success('Delete success')
    }
    const cancel = () => {
      console.log('cancel')
    }
    const handleToAddRole = () => {
      form.role = Object.assign({}, defaultRole)
      // if (this.$refs.tree) {
      //   this.$refs.tree.setCheckedNodes([])
      // }
      dialogType.value = 'new'
      visible.value = true
    }
    const confirmLoading = ref(false)
    const generateTree = (routes, basePath = '/', checkedKeys) => {
      const res = []

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = generateTree(route.children, routePath, checkedKeys)
        }

        if (
          checkedKeys.includes(routePath) ||
          (route.children && route.children.length >= 1)
        ) {
          res.push(route)
        }
      }
      return res
    }
    const handleOk = async() => {
      const isEdit = dialogType.value === 'edit'
      confirmLoading.value = true
      console.log(checkedKeys)
      form.role.routes = generateTree(
        deepClone(serviceRoutes.value),
        '/',
        checkedKeys.value
      )

      if (isEdit) {
        await updateRole(form.role.key, form.role)
        for (let index = 0; index < rolesList.value.length; index++) {
          if (rolesList.value[index].key === form.role.key) {
            rolesList.value.splice(index, 1, Object.assign({}, form.role))
            break
          }
        }
      } else {
        const { data } = await addRole(form.role)
        form.role.key = data.key
        rolesList.value.push(form.role)
      }

      const { description, key, name } = form.role
      notification.success({
        message: 'Success',
        description: `
            Role Key: ${key}
            Role Name: ${name}
            Description: ${description}
          `
      })
      visible.value = false
      confirmLoading.value = false
    }
    onMounted(() => {
      _getRoutes()
      _getRoles()
    })
    const onSelect = () => {

    }
    const onCheck = () => {

    }
    return {
      rolesList,
      columns,
      visible,
      handleToEditRole,
      handleToDeleteRole,
      handleToAddRole,
      handleOk,
      treeData,
      checkedKeys,
      replaceFields,
      cancel,
      form,
      confirmLoading,
      dialogType,
      onSelect,
      onCheck
    }
  }
})
</script>
