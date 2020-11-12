<template>
  <div class="tabs-nav">
    <div
      class="tabs-nav-left-panel"
      :style="`width: calc(100% - ${tagsViewWidth}px)`"
    >
      <a-tabs
        @tab-click="handleTabClick"
        @edit="handleTabRemove"
        v-model:activeKey="tabActive"
        hide-add
        type="editable-card"
      >
        <a-tab-pane
          v-for="item in visitedViews"
          :key="item.fullPath"
          :closable="!isAffix(item)"
          :tab="generateTitle(item.meta.title)"
        ></a-tab-pane>
      </a-tabs>
    </div>
    <div class="tabs-nav-right-panel">
      <a-dropdown>
        <template v-slot:overlay>
          <a-menu @click="handleClick">
            <a-menu-item key="closeOthersTabs">
              <a>{{$t('tagsView.closeOthers')}}</a>
            </a-menu-item>
            <a-menu-item key="closeLeftTabs">
              <a>{{$t('tagsView.closeLeftTabs')}}</a>
            </a-menu-item>
            <a-menu-item key="closeRightTabs">
              <a>{{$t('tagsView.closeRightTabs')}}</a>
            </a-menu-item>
            <a-menu-item key="closeAllTabs">
              <a>{{$t('tagsView.closeAllTabs')}}</a>
            </a-menu-item>
          </a-menu>
        </template>
        <a-button style="margin-left: 8px">
          {{$t('tagsView.more')}}
          <DownOutlined />
        </a-button>
      </a-dropdown>
    </div>
  </div>
</template>
<script>
import path from 'path'
import { DownOutlined } from '@ant-design/icons-vue'
import { generateTitle } from '@/utils/i18n'
export default {
  components: {
    DownOutlined
  },
  data() {
    return {
      tabActive: null,
      affixTags: []
    }
  },
  computed: {
    visitedViews() {
      return this.$store.getters.visitedViews
    },
    routes() {
      return this.$store.getters.permission_routes
    },
    tagsViewWidth() {
      return this.$store.state.app.device === 'mobile' ? 117 : (this.$store.state.app.sidebar.collapsed ? 197 : 337)
    }
  },
  watch: {
    $route: {
      handler(route) {
        this.addTags(route)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags(this.$route)
  },
  methods: {
    handleTabClick(tab) {
      const route = this.visitedViews.filter((item) => item.path === tab)[0]
      if (this.$route.fullPath !== route.fullPath) this.$router.push(route)
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes))
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    },
    addTags(tag) {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
      this.tabActive = tag.fullPath
      return false
    },
    async handleTabRemove(fullPath) {
      const view = this.visitedViews.find((item) => {
        return fullPath === item.fullPath
      })
      await this.$store.dispatch('tagsView/delView', view)
      if (this.isActive(view)) this.toLastTag()
    },
    handleClick({ key }) {
      switch (key) {
        case 'closeOthersTabs':
          this.closeOthersTabs()
          break
        case 'closeLeftTabs':
          this.closeLeftTabs()
          break
        case 'closeRightTabs':
          this.closeRightTabs()
          break
        case 'closeAllTabs':
          this.closeAllTabs()
          break
      }
    },
    async closeOthersTabs() {
      await this.$store.dispatch('tagsView/delOthersViews', this.toThisTag())
    },
    async closeLeftTabs() {
      await this.$store.dispatch('tagsView/delLeftViews', this.toThisTag())
    },
    async closeRightTabs() {
      await this.$store.dispatch('tagsView/delRightViews', this.toThisTag())
    },
    closeAllTabs() {
      this.$store.dispatch('tagsView/delAllViews').then(() => {
        this.toLastTag()
      })
    },
    toLastTag() {
      const latestView = this.visitedViews.slice(-1)[0]
      if (latestView) this.$router.push(latestView)
      else this.$router.push('/')
    },
    toThisTag() {
      const view = this.visitedViews.find(
        (item) => item.fullPath === this.$route.fullPath
      )
      if (this.$route.path !== view.path) this.$router.push(view)
      return view
    },
    generateTitle
  }
}
</script>
<style lang="less" scoped>
::v-deep.tabs-nav {
  display: flex;
  align-items: center;
  &-left-panel {
    float: left;
  }
  &-right-panel {
    float: left;
    width: 52px;
  }
  padding: 10px 0;
  position: fixed;
  width: 100%;
  z-index: 10;
  background: #f0f2f5;
  .ant-tabs-bar {
    margin: 0;
  }
}
</style>
