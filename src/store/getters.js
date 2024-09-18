const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  routesAdded: state => state.permission.routesAdded,
  isShowDialogAddUser: state => state.dialog.isShowDialogAddUser,
  event_id: state => state.dialog.event_id,
  isShowDialogAddAchievement: state => state.dialog.isShowDialogAddAchievement,
  event_object: state => state.dialog.event_object,
  isShowDialogHistoryTransactionFund: state => state.club.isShowDialogHistoryTransactionFund,
  objectHistoryTransactionFund: state => state.club.objectHistoryTransactionFund
}
export default getters
