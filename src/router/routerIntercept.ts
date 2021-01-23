/*
 * @name:
 * @Date: 2020-12-02 14:16:02
 * @LastEditTime: 2021-01-23 14:34:25
 * @FilePath: \vue3-typescript-element-admin\src\router\routerIntercept.ts
 * @permission:
 */
import router from "./router";
import { user, setUser } from "@/store/user";
import { getUserInfo } from "@/api/login";
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;

  const hasToken = localStorage.getItem("TOKEN-VUE3-TS-EL-ADMIN");
  const whiteList = ["/login"];
  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      if (user.username) {
        next();
      } else {
        // 刷新重新获取用户信息
        getUserInfo().then((res: any) => {
          setUser({ id: res.id, role: res.role, username: res.username });
          next();
        });
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next("/login");
    }
  }
});
