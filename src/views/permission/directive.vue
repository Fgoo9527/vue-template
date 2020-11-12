<template>
  <a-card>
    <switch-roles @change="handleRolesChange" />
    <div :key="key" style="margin-top: 30px">
      <div>
        <span v-permission="['admin']" class="permission-alert">
          Only
          <a-tag class="permission-tag" size="small">admin</a-tag> can see this
        </span>
        <a-tag
          v-permission="['admin']"
          class="permission-sourceCode"
          type="info"
        >
          v-permission="['admin']"
        </a-tag>
      </div>

      <div>
        <span v-permission="['editor']" class="permission-alert">
          Only
          <a-tag class="permission-tag" size="small">editor</a-tag> can see this
        </span>
        <a-tag
          v-permission="['editor']"
          class="permission-sourceCode"
          type="info"
        >
          v-permission="['editor']"
        </a-tag>
      </div>

      <div>
        <span v-permission="['admin', 'editor']" class="permission-alert">
          Both
          <a-tag class="permission-tag" size="small">admin</a-tag> and
          <a-tag class="permission-tag" size="small">editor</a-tag> can see this
        </span>
        <a-tag
          v-permission="['admin', 'editor']"
          class="permission-sourceCode"
          type="info"
        >
          v-permission="['admin','editor']"
        </a-tag>
      </div>
    </div>

    <div :key="'checkPermission' + key" style="margin-top: 60px">
      <a-alert :message="message" type="info" show-icon />

      <a-tabs>
        <a-tab-pane v-if="checkPermission(['admin'])" key="1" tab="Admin">
          Admin can see this
          <a-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['admin'])"
          </a-tag>
        </a-tab-pane>
        <a-tab-pane v-if="checkPermission(['editor'])" key="2" tab="Editor">
          Editor can see this
          <a-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['editor'])"
          </a-tag>
        </a-tab-pane>
        <a-tab-pane
          v-if="checkPermission(['admin', 'editor'])"
          key="3"
          tab="Admin-OR-Editor"
        >
          Both admin or editor can see this
          <a-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['admin','editor'])"
          </a-tag>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>
</template>

<script>
import SwitchRoles from './components/SwitchRoles'
import checkPermission from '@/utils/permission'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    const key = ref(1)
    const message = ref(
      '在某些情况下，不适合使用 v-permission。例如：a-tab 或 a-table-column以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。'
    )
    const handleRolesChange = () => {
      router.push({ path: '/permission/directive?' + +new Date() })
      key.value++
    }
    return {
      handleRolesChange,
      key,
      checkPermission,
      message
    }
  },
  components: {
    SwitchRoles
  }
})
</script>
<style lang="less" scoped>
.permission-alert {
  width: 320px;
  margin-top: 15px;
  background-color: #f0f9eb;
  color: #67c23a;
  padding: 8px 16px;
  border-radius: 4px;
  display: inline-block;
}
.permission-sourceCode {
  margin-left: 15px;
}
.permission-tag {
  background-color: #ecf5ff;
}
</style>
