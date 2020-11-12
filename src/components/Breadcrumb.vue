<template>
  <div :class="headerTheme">
    <a-breadcrumb class="app-breadcrumb" separator="/">
      <a-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ generateTitle(item.meta.title) }}</span
        >
        <span
          class="breadcrumn-other"
          v-else
          @click.prevent="handleLink(item)"
          >{{ generateTitle(item.meta.title) }}</span
        >
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
import { generateTitle } from '@/utils/i18n'
import * as pathToRegexp from 'path-to-regexp'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      levelList: null
    }
  },
  computed: {
    ...mapGetters({
      headerTheme: 'headerTheme'
    })
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      )
      const first = matched[0]

      if (!this.isHome(first)) {
        matched = [{ path: '/home', meta: { title: 'home' }}].concat(matched)
      }

      this.levelList = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
    },
    isHome(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Home'.toLocaleLowerCase()
    },
    pathCompile(path) {
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    },
    generateTitle
  }
}
</script>

<style lang="less" scoped>
::v-deep.app-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 30px;
  margin-left: 4px;
  .breadcrumn-other {
    cursor: pointer;
  }
  .no-redirect {
    cursor: text;
  }
}
::v-deep.dark {
  .app-breadcrumb {
    .ant-breadcrumb-separator {
      color: #fff;
    }
    .breadcrumn-other {
      color: #fff;
    }
    .no-redirect {
      color: #97a8be;
    }
  }
}
::v-deep.light {
  .app-breadcrumb {
    .ant-breadcrumb-separator {
      color: #001529;
    }
    .breadcrumn-other {
      color: #001529;
    }
    .no-redirect {
      color: #97a8be;
    }
  }
}
</style>
