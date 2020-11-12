
import Cookies from 'js-cookie'

const state = {
  sidebar: {
    collapsed: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop'
}
const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.collapsed = !state.sidebar.collapsed
    state.sidebar.withoutAnimation = false
    if (state.sidebar.collapsed) {
      Cookies.set('sidebarStatus', 0)
    } else {
      Cookies.set('sidebarStatus', 1)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 1)
    state.sidebar.collapsed = true
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}
const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}
export default { state, mutations, actions }
