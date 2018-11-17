import path from 'path';
const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  menus: state => {
    let menuItems = [];
    let setParentPath = (router, parentRouter) => {
      router.parentPath = '';
      if (parentRouter) {
        if (parentRouter.parentPath) {
          router.parentPath = path.resolve(parentRouter.parentPath, parentRouter.path);
        } else {
          router.parentPath = parentRouter.path;
        }
      }
      if (router.children) {
        router.children.forEach(item => {
          setParentPath(item, router);
        });
      }
    };

    state.permission.routers.forEach(item => {
      setParentPath(item, null);

      if (item.children) {
        if (item.children.length == 1 && !item.isMenu) {
          item.children.forEach(child => {
            menuItems.push(child);
          });
        } else {
          menuItems.push(item);
        }
      }
    });
    return menuItems;
  },
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
};
export default getters;
