<template>
  <a-layout id="layout" :class="isMobile">
    <a-layout-header
      class="header"
      :class="headerTheme"
      :style="'color:white;background-color:' + headerPrimaryTheme"
    >
      <Navbar />
    </a-layout-header>
    <a-layout>
      <div
        v-if="isMobile === 'mobile' && !collapsed"
        class="drawer-bg"
        @click="handleCloseMenu"
      />
      <a-layout-sider
        width="220"
        style="overflow-x: scroll"
        :class="navbarTheme + (collapsed ? ' hideMenu' : ' openMenu')"
        v-model:collapsed="collapsed"
        :trigger="null"
      >
        <Menu />
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <tagView v-if="needTagsView" />
        <a-layout-content class="layout-content">
          <app-main />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import { defineComponent, computed, watch, ref } from 'vue'
import tagView from './components/tagview/index'
import Menu from './components/menu/index'
import Navbar from './components/navbar/index'
import AppMain from './components/AppMain'
import ResizeMixin from './mixin/ResizeHandler'
import { useStore } from 'vuex'
export default defineComponent({
  mixins: [ResizeMixin],
  setup(props, ctx) {
    const store = useStore()
    const collapsed = computed(() => store.state.app.sidebar.collapsed)
    const needTagsView = computed(() => store.state.settings.tagsView)
    const headerTheme = computed(() => store.state.settings.headerTheme)
    const navbarTheme = computed(() => store.state.settings.navbarTheme)
    const isMobile = computed(() => store.state.app.device)
    const themeColor = computed(() => store.state.settings.themeColor)
    const headerPrimaryTheme = ref('')
    watch(
      () => [headerTheme.value, themeColor.value],
      ([theme], [color]) => {
        headerPrimaryTheme.value = theme === 'primary' ? themeColor.value : ''
      }
    )
    const handleCloseMenu = () => {
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
    return {
      collapsed,
      needTagsView,
      headerTheme,
      navbarTheme,
      isMobile,
      handleCloseMenu,
      headerPrimaryTheme
    }
  },
  components: {
    Menu,
    tagView,
    AppMain,
    Navbar
  }
})
</script>

<style scoped lang="less">
#layout {
  height: 100%;
  width: 100%;
  .header {
    padding: 0 5px;
  }
  .dark {
    background-color: #001529 !important;
    color: white !important;
  }
  .light {
    background-color: white !important;
    color: #001529 !important;
  }
  .breadcrumb-box {
    display: flex;
    align-items: center;
    .app-breadcrumb {
      position: relative;
      bottom: 2px;
    }
    .trigger {
      font-size: 18px;
      line-height: 34px;
      padding-right: 10px;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }
  }
  .layout-content {
    margin: 0;
    margin-top: 60px;
  }
  &.mobile {
    .hideMenu {
      position: fixed;
      left: -220px;
      top: 64px;
    }
    .openMenu {
      position: fixed;
      left: 0;
      top: 64px;
      z-index: 1001;
      height: 100%;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .ant-layout {
    .ant-layout {
      padding: 0 10px 10px !important;
    }
  }
}
</style>
