<template>
  <a-layout id="layout">
    <a-layout-header class="header">
      <div class="logo" />
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff" v-model:collapsed="collapsed" :trigger="null">
        <a-menu
          mode="inline"
          v-model:selectedKeys="selectedKeys2"
          :style="{ height: '100%', borderRight: 0 }"
          :inline-collapsed="collapsed"
          @click="goRouter"
        >
          <a-menu-item v-for="item in routes.state" :key="item.path">
            <PieChartOutlined />
            <span>
              {{ item.name }}
              <!-- <router-link :to=item.path >{{ item.name }}</router-link> -->
            </span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <div>
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="toggleCollapsed"
          />
          <menu-fold-outlined v-else class="trigger" @click="toggleCollapsed" />
        </div>
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px'
          }"
        >
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import {
  PieChartOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons-vue'
import routess from '../router/index'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const selectedKeys2 = ref(['/'])

    const collapsed = ref(false)
    const toggleCollapsed = () => {
      collapsed.value = !collapsed.value
    }

    const routes = reactive({ state: {}})
    onMounted(() => {
      routes.state = routess.getRoutes()
    })

    const router = useRouter()
    function goRouter(data) {
      // console.log(data)
      router.push({
        path: data.key
      })
    }
    return {
      selectedKeys2,
      collapsed,
      toggleCollapsed,
      routes,
      goRouter
    }
  },
  components: {
    PieChartOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
  }
})
</script>

<style scoped lang="less">
#layout {
  height: 100%;
  width: 100%;
}
#layout .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
