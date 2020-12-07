/*
 * @name:
 * @Date: 2020-11-27 09:49:28
 * @LastEditTime: 2020-12-06 15:31:22
 * @FilePath: \vue3-typescript-element-admin\src\router\router.ts
 * @permission:
 */
/*
 * @name:
 * @Date: 2020-11-27 09:49:28
 * @LastEditTime: 2020-12-02 14:17:17
 * @FilePath: \vue3-typescript-element-admin\src\router\index.ts
 * @permission:
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "../Layout/Layout.vue";
import Login from "@/views/login/login.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { title: "登录", icon: "logo", hidden: true }
  },
  {
    path: "/",
    name: "home",
    component: Layout,
    redirect: "home",
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/home.vue"),
        name: "home",
        meta: { title: "首页", icon: "index" }
      },
      {
        path: "/rent",
        name: "rent",
        component: () => import("./Empty.vue"),
        meta: { title: "租赁管理", icon: "index" }
      },
      {
        path: "/order",
        name: "order",
        component: () => import("@/views/rent/order/order.vue"),
        meta: { title: "订单", icon: "index", parent: "rent" }
      },
      {
        path: "/contract",
        name: "contract",
        component: () => import("@/views/rent/contract/contract.vue"),
        meta: { title: "合同", icon: "index", parent: "rent" }
      },
      {
        path: "/setting",
        name: "setting",
        component: () => import("./Empty.vue"),
        meta: { title: "系统设置" }
      },
      {
        path: "/webApi",
        name: "webApi",
        component: () => import("@/views/setting/webApi/webApi.vue"),
        meta: { title: "接口文档", parent: "setting" }
      },
      {
        path: "/permission",
        name: "permission",
        component: () => import("./Empty.vue"),
        meta: { title: "权限管理", parent: "setting" }
      },
      {
        path: "/role",
        name: "role",
        component: () => import("@/views/setting/permission/role/role.vue"),
        meta: { title: "角色管理", parent: "permission" }
      },
      {
        path: "/user",
        name: "user",
        component: () => import("@/views/setting/permission/user/user.vue"),
        meta: { title: "用户管理", parent: "permission" }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
