/*
 * @name:
 * @Date: 2020-12-02 14:16:02
 * @LastEditTime: 2020-12-07 09:33:40
 * @FilePath: \vue3-typescript-element-admin\src\router\routerIntercept.ts
 * @permission:
 */
import router from "./router";
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;

  const hasToken = localStorage.getItem("TOKEN-VUE3-TS-EL-ADMIN");
  const whiteList = ["/login"];
  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      // 根据权限加载路由
      // ......
      next();
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next(`/login`);
    }
  }
});
