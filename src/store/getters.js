const getters = {
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  occupation: state => state.user.occupation,
  address: state => state.user.address,
  team: state => state.user.team,
  tags: state => state.user.tags,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  navbarTheme: state => state.settings.navbarTheme,
  headerTheme: state => state.settings.headerTheme,
  errorLogs: state => state.errorLog.logs,
  collapsed: state => state.app.sidebar.collapsed,
  language: state => state.settings.locale
}
export default getters
