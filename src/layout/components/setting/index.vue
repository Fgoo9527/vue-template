 <template>
  <a-drawer
    placement="right"
    :closable="false"
    @close="onClose"
    v-model:visible="isVisible"
  >
    <div class="drawer-container">
      <h3 class="drawer-title">{{$t('setting.theme')}}</h3>
      <div class="theme-container">
        <div class="theme-colors">
          <template v-for="(item, index) in colorList" :key="index">
            <div
              class="theme-color-selector"
              :class="currentColor === item.color ? 'selected' : ''"
            >
              <a-tooltip>
                <template v-slot:title>
                  <span>{{ item.name }}</span>
                </template>
                <div
                  @click="changeThemeColor(item.color)"
                  :style="'background-color:' + item.color"
                ></div>
              </a-tooltip>
            </div>
          </template>
        </div>
      </div>
      <h3 class="drawer-title">{{$t('setting.title')}}</h3>
      <div class="drawer-item">
        <div
          class="item-radio"
          :class="navbarTheme === 'dark' ? 'active' : ''"
          @click="handleToChangeNavbarTheme('dark')"
        >
          <a-tooltip>
            <template v-slot:title>{{$t('setting.darkSidebar')}}</template>
            <img src="../../../assets/img/nav-theme-dark.svg" />
          </a-tooltip>
        </div>
        <div
          class="item-radio"
          :class="navbarTheme === 'light' ? 'active' : ''"
          @click="handleToChangeNavbarTheme('light')"
        >
          <a-tooltip>
            <template v-slot:title>{{$t('setting.brightSidebar')}}</template>
            <img src="../../../assets/img/nav-theme-light.svg" />
          </a-tooltip>
        </div>
      </div>
      <div class="drawer-item">
        <div
          class="item-radio"
          :class="headerTheme === 'light' ? 'active' : ''"
          @click="handleToChangeHeaderTheme('light')"
        >
          <a-tooltip>
            <template v-slot:title>{{$t('setting.brightNavbar')}}</template>
            <img src="../../../assets/img/nav-theme-dark.svg" />
          </a-tooltip>
        </div>
        <div
          class="item-radio"
          :class="headerTheme === 'dark' ? 'active' : ''"
          @click="handleToChangeHeaderTheme('dark')"
        >
          <a-tooltip>
            <template v-slot:title>{{$t('setting.darkNavBar')}}</template>
            <img src="../../../assets/img/header-theme-dark.svg" />
          </a-tooltip>
        </div>
                <div
          class="item-radio"
          :class="headerTheme === 'primary' ? 'active' : ''"
          @click="handleToChangeHeaderTheme('primary')"
        >
          <a-tooltip>
            <template v-slot:title>{{$t('setting.primaryNavBar')}}</template>
            <img src="../../../assets/img/header-theme-primary.svg" />
          </a-tooltip>
        </div>
      </div>
      <h3 class="drawer-title">{{$t('setting.nav')}}</h3>
      <div class="drawer-item">
        <span>{{$t('setting.tagsView')}}</span>
        <a-switch v-model:checked="tagsView" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>{{$t('setting.fixedHeader')}}</span>
        <a-switch v-model:checked="fixedHeader" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>{{$t('setting.sidebarLogo')}}</span>
        <a-switch v-model:checked="sidebarLogo" class="drawer-switch" />
      </div>
    </div>
  </a-drawer>
</template>

<script>
import { defineComponent, watch, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { generateThemeColor, changeAntdTheme } from 'mini-dynamic-antd-theme'
import Cookies from 'js-cookie'
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close-settings'],
  setup(props, { emit }) {
    const store = useStore()
    const isVisible = ref(false)
    const navbarTheme = computed({
      get: () => store.state.settings.navbarTheme,
      set: (val) => {
        store.dispatch('settings/changeSetting', {
          key: 'navbarTheme',
          value: val
        })
      }
    })
    const headerTheme = computed({
      get: () => store.state.settings.headerTheme,
      set: (val) => {
        store.dispatch('settings/changeSetting', {
          key: 'headerTheme',
          value: val
        })
      }
    })
    const tagsView = computed({
      get: () => store.state.settings.tagsView,
      set: (val) => {
        store.dispatch('settings/changeSetting', {
          key: 'tagsView',
          value: val
        })
      }
    })
    const fixedHeader = computed({
      get: () => store.state.settings.fixedHeader,
      set: (val) => {
        store.dispatch('settings/changeSetting', {
          key: 'fixedHeader',
          value: val
        })
      }
    })
    const sidebarLogo = computed({
      get: () => store.state.settings.sidebarLogo,
      set: (val) => {
        store.dispatch('settings/changeSetting', {
          key: 'sidebarLogo',
          value: val
        })
      }
    })
    const handleToChangeNavbarTheme = (theme) => {
      if (navbarTheme.value !== theme) {
        navbarTheme.value = theme
      }
    }
    const handleToChangeHeaderTheme = (theme) => {
      if (headerTheme.value !== theme) {
        headerTheme.value = theme
      }
    }
    watch(
      () => props.visible,
      (val) => {
        isVisible.value = val
      }
    )
    const onClose = () => {
      emit('close-settings', false)
    }
    const colorList = ref([
      { name: '青空蓝', color: '#1890FF' },
      { name: '蜜柑橙', color: '#F58220' },
      { name: '暗夜黑', color: '#212121' },
      { name: '若草绿', color: '#11A983' },
      { name: '浅葱青', color: '#13C2C2' },
      { name: '葡萄紫', color: '#7D5886' },
      { name: '赤焰红', color: '#F5222D' }
    ])
    const currentColor = computed(() => store.state.settings.themeColor)
    const changeThemeColor = (color) => {
      store.dispatch('settings/changeThemeColor', color)
      changeAntdTheme(generateThemeColor(color))
    }
    onMounted(() => {
      changeThemeColor(Cookies.get('themeColor') || '#1890FF')
    })
    return {
      isVisible,
      onClose,
      tagsView,
      fixedHeader,
      sidebarLogo,
      navbarTheme,
      headerTheme,
      handleToChangeNavbarTheme,
      handleToChangeHeaderTheme,
      changeThemeColor,
      colorList,
      currentColor
    }
  }
})
</script>

<style lang="less" scoped>
.drawer-container {
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  .theme-container {
    display: flex;
    font-size: 12px;
    margin-bottom: 10px;
    width: 280px;
    .theme-colors {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      .theme-color-selector {
        margin: 0 0 8px 8px;
        width: 20px;
        height: 20px;
        border-radius: 4px;
        cursor: pointer;
        div {
          display: flex;
          height: 100%;
          border-radius: 3px;
        }
        &:nth-child(10n + 1) {
          margin-left: 0;
        }
      }
      .selected {
        box-shadow: 0 0 3px 2px #1890ff;
      }
    }
  }
  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
    .item-radio {
      margin-right: 10px;
      cursor: pointer;
      display: inline-block;
      &:after {
        content: '';
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 6px;
        background: transparent;
        margin: 0 auto;
      }
    }
    .active {
      &:after {
        background-color: #19be6b;
      }
    }
  }

  .drawer-switch {
    float: right;
  }
}
</style>
