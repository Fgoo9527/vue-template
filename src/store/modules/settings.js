import defaultSettings from '@/settings'
import Cookies from 'js-cookie'

const { showSettings, title, navbarTheme, headerTheme, tagsView, fixedHeader, sidebarLogo, collapsed } = defaultSettings

const state = {
  showSettings: showSettings,
  title: title,
  navbarTheme: navbarTheme,
  headerTheme: headerTheme,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  collapsed: collapsed,
  themeColor: Cookies.get('themeColor') || '#1890FF',
  locale: Cookies.get('locale') || 'zhCN'
}
const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      state[key] = value
    }
  },
  CHANGE_THEME_COLOR: (state, color) => {
    state.themeColor = color
    Cookies.set('themeColor', color)
  },
  CHANGE_LOCALE: (state, locale) => {
    state.locale = locale
    Cookies.set('locale', locale)
  }
}
const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  changeThemeColor({ commit }, color) {
    commit('CHANGE_THEME_COLOR', color)
  },
  changeLocale({ commit }, locale) {
    commit('CHANGE_LOCALE', locale)
  }
}

export default { state, mutations, actions }
