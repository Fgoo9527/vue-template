<template>
  <div class="header-box">
    <div class="logo-box" v-if="needLogo && device === 'desktop'">
      <img v-if="logo" :src="logo" class="sidebar-logo" />
      <div class="logo">{{ title }}</div>
    </div>
    <div class="breadcrumb-box">
      <icon-font
        v-if="collapsed"
        type="iconindent"
        class="trigger"
        @click="toggleCollapsed"
      />
      <icon-font
        v-else
        type="iconoutdent"
        class="trigger"
        @click="toggleCollapsed"
      />
      <icon-font
        v-if="device === 'desktop'"
        type="iconredo"
        class="trigger"
        @click="handleToRefresh"
      />
      <Breadcrumb v-show="device === 'desktop'" />
    </div>
    <div class="nav-box">
      <span class="nav-item" v-if="device === 'desktop'">
        <HeaderSearch />
      </span>
      <span class="nav-item" v-if="device === 'desktop'">
        <router-link to="/error-log/index">
          <a-badge
            :count="errorLogs.length"
            :numberStyle="{ 'box-shadow': 'none' }"
            :offset="[-6, 0]"
          >
            <icon-font type="iconbug" class="nav-icon" />
          </a-badge>
        </router-link>
      </span>
      <span class="nav-item" v-if="device === 'desktop'">
        <Screenfull />
      </span>
      <span class="nav-item" v-if="device === 'desktop'">
        <LangSelect />
      </span>
      <a-dropdown
        :trigger="['click']"
        placement="bottomCenter"
        v-if="device === 'desktop'"
        :disabled="messageList.length === 0"
      >
        <span class="nav-item">
          <a-badge
            :count="messageList.length"
            :numberStyle="{ 'box-shadow': 'none' }"
            :offset="[-6, 0]"
          >
            <icon-font type="iconbell" class="nav-icon" />
          </a-badge>
        </span>
        <template v-slot:overlay>
          <a-menu>
            <a-menu-item v-for="(item, index) in messageList" :key="index">
              <div>
                <h4>{{ item.content }}</h4>
              </div>
              <div>{{ item.time }}</div>
            </a-menu-item>
            <a-menu-divider></a-menu-divider>
            <a-menu-item key="clearAll" @click="clearAllMessage">
              <div style="text-align: center">全部已读</div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-dropdown>
        <div class="avatar-box">
          <a-avatar shape="circle" size="large" :src="avatar.src"> </a-avatar>
          <span>{{ avatar.value }}</span>
        </div>
        <template v-slot:overlay>
          <a-menu>
            <a-menu-item>
              <router-link to="/setting/user">
                <div>
                  <icon-font type="iconuser" />
                  <span style="margin-left: 10px">{{ $t('navbar.user') }}</span>
                </div>
              </router-link>
            </a-menu-item>
            <a-menu-item>
              <router-link to="/setting/account">
                <div>
                  <icon-font type="iconwrench" />
                  <span style="margin-left: 10px">{{
                    $t('navbar.account')
                  }}</span>
                </div>
              </router-link>
            </a-menu-item>
            <a-menu-item>
              <div @click="handleToLogout">
                <icon-font type="iconexport" />
                <span style="margin-left: 10px">{{ $t('navbar.logOut') }}</span>
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <span class="nav-item" @click="showDrawer">
        <icon-font type="iconsetting" class="nav-icon" />
      </span>
    </div>
  </div>
  <setting :visible="visible" @close-settings="closeSettings" />
</template>
<script>
import { defineComponent, reactive, ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Breadcrumb from '@/components/Breadcrumb'
import HeaderSearch from '@/components/HeaderSearch'
import LangSelect from '@/components/LangSelect'
import Screenfull from '@/components/Screenfull'
import setting from '../setting'
import { getMessage } from '@/api/user'
import { useStore } from 'vuex'
export default defineComponent({
  setup(props, { emit }) {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const avatar = reactive({
      value: store.getters.name,
      src: store.getters.avatar
    })
    const title = computed(() => store.state.settings.title)
    const logo = ref(
      'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    )
    const needLogo = computed(() => store.state.settings.sidebarLogo)
    const device = computed(() => store.state.app.device)
    const collapsed = computed(() => store.state.app.sidebar.collapsed)
    const toggleCollapsed = () => {
      store.dispatch('app/toggleSideBar')
    }
    const handleToLogout = async() => {
      await store.dispatch('user/logout')
      router.push(`/login?redirect=${route.fullPath}`)
    }
    const visible = ref(false)
    const showDrawer = () => {
      visible.value = !visible.value
    }
    const closeSettings = (val) => {
      visible.value = val
    }
    const messageList = ref([])
    const clearAllMessage = () => {
      messageList.value = []
    }
    const handleToRefresh = () => {
      location.reload()
    }
    const errorLogs = computed(() => store.getters.errorLogs)
    onMounted(() => {
      getMessage().then((res) => {
        if (res.code === 20000) {
          messageList.value = res.data
        }
      })
    })
    return {
      avatar,
      collapsed,
      toggleCollapsed,
      handleToLogout,
      visible,
      showDrawer,
      closeSettings,
      title,
      logo,
      needLogo,
      messageList,
      clearAllMessage,
      handleToRefresh,
      errorLogs,
      device
    }
  },
  components: {
    Breadcrumb,
    setting,
    HeaderSearch,
    LangSelect,
    Screenfull
  }
})
</script>

<style lang="less" scoped>
.header-box {
  overflow: hidden;
  .logo-box {
    float: left;
    height: 40px;
    .sidebar-logo {
      height: 80%;
      vertical-align: middle;
      margin-right: 10px;
    }
    .logo {
      display: inline-block;
      margin-right: 10px;
      font-weight: 600;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
  .breadcrumb-box {
    float: left;
    display: flex;
    align-items: center;
    height: 64px;
    .trigger {
      cursor: pointer;
      font-size: 20px;
      margin: 0 4px;
    }
  }
  .nav-box {
    float: right;
    justify-content: flex-end;
    height: 64px;
    display: flex;
    align-items: center;
    .nav-item {
      cursor: pointer;
      .nav-icon {
        font-size: 20px;
        margin: 0 10px;
      }
    }
    .avatar-box {
      display: flex;
      align-items: center;
      margin: 0 10px;
      .ant-avatar {
        margin-right: 10px;
      }
    }
    a {
      color: inherit;
    }
  }
}
</style>
