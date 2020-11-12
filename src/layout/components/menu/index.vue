<template>
  <a-menu
    class="menu-container"
    :theme="navbarTheme"
    mode="inline"
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
  >
    <Menu v-for="route in permission_routes" :key="route.path" :item="route" />
  </a-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Menu from './Menu'

export default {
  data() {
    return {
      selectedKeys: ['/home'],
      openKeys: [],
      lastOpenKeys: []
    }
  },
  components: { Menu },
  computed: {
    ...mapGetters(['permission_routes', 'navbarTheme', 'collapsed'])
  },
  watch: {
    $route: {
      handler({ fullPath }) {
        if (this.onlyOneChildren(fullPath)) {
          const parentPath = this.getParentPath(fullPath)
          this.selectedKeys = [parentPath[0].fullPath]
        } else {
          this.selectedKeys = [fullPath]
        }
        this.openKeys = []
        if (this.$store.state.app.device === 'mobile') return
        const pathList = fullPath.split('/')
        if (pathList.length > 2) {
          for (let i = 1; i < pathList.length - 1; i++) {
            if (this.openKeys.length > 0) {
              this.openKeys.push(
                `${this.openKeys[this.openKeys.length - 1]}/${pathList[i]}`
              )
            } else {
              this.openKeys.push(`/${pathList[i]}`)
            }
          }
        } else {
          this.openKeys = [`/${pathList[pathList.length - 1]}`]
        }
        if (this.collapsed) {
          this.lastOpenKeys = this.openKeys
          this.openKeys = []
        }
      },
      immediate: true
    },
    collapsed: {
      handler(val) {
        if (val) {
          this.lastOpenKeys = this.openKeys
          this.openKeys = []
        } else {
          this.openKeys = this.lastOpenKeys
          this.lastOpenKeys = []
        }
      },
      immediate: true
    }
  },
  methods: {
    getParentPath(fullPath) {
      const parentPath = this.permission_routes.filter((item) => {
        return item.children && item.children[0].fullPath === fullPath
      })
      return parentPath
    },
    onlyOneChildren(fullPath) {
      const oneChildrenRoute = this.permission_routes.filter((item) => {
        return (
          item.children && !item.children.children && item.children.length === 1
        )
      })
      const _ = oneChildrenRoute.filter((item) => {
        return item.children[0].fullPath === fullPath
      })
      return _.length
    }
  }
}
</script>
<style lang="less" scoped>
.menu-container {
  height: 100%;
}
</style>
