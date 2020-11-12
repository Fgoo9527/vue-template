import { asyncRoutes, constantRoutes } from '@/router'
import { isExternal } from '@/utils/validate'
import path from 'path'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * @param routes
 * @param baseUrl
 * @returns {[]}
 */
function filterRoutes(routes, roles, baseUrl = '/') {
  return routes
    .filter((route) => {
      if (route.meta && route.meta.roles) {
        return hasPermission(roles, route)
      } else {
        return true
      }
    })
    .map((route) => {
      if (route.path !== '*' && !isExternal(route.path)) {
        route.path = path.resolve(baseUrl, route.path)
      }
      route.fullPath = route.path
      if (route.children) {
        route.children = filterRoutes(route.children, roles, route.fullPath)
      }
      return route
    })
}

const state = {
  routes: []
}
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}
const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const accessedRoutes = filterRoutes([...constantRoutes, ...asyncRoutes], roles)
      commit('SET_ROUTES', accessedRoutes)
      resolve([...asyncRoutes])
    })
  }
}

export default { state, mutations, actions }
