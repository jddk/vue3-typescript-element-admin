/*
 * @name:
 * @Date: 2020-11-27 09:49:28
 * @LastEditTime: 2020-12-03 17:20:54
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

const routes: Array<RouteRecordRaw> = [
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
        component: () => import("../views/home/home.vue"),
        name: "home",
        meta: { title: "首页", icon: "index" }
      }
    ]
  },
  {
    path: "/order",
    name: "order",
    component: Layout,
    meta: { parentName: "租赁", parentPath: "rent" },
    children: [
      {
        path: "/order",
        name: "order",
        component: () => import("../views/rent/order/order.vue"),
        meta: { title: "订单", icon: "index" }
      }
    ]
  },
  {
    path: "/contract",
    name: "contract",
    component: Layout,
    meta: { parentName: "租赁", parentPath: "rent" },
    children: [
      {
        path: "/contract",
        name: "contract",
        component: () => import("../views/rent/contract/contract.vue"),
        meta: { title: "合同", icon: "index", noCache: true }
      }
    ]
  },
  {
    path: "/webApi",
    name: "webApi",
    component: Layout,
    meta: { parentName: "系统设置", parentPath: "setting" },
    children: [
      {
        path: "/webApi",
        name: "webApi",
        component: () => import("../views/setting/webApi/webApi.vue"),
        meta: { title: "webApi", icon: "index", noCache: true }
      }
    ]
  },
  {
    path: "/role",
    name: "role",
    component: Layout,
    meta: { parentName: "权限管理", parentPath: "permissions" },
    children: [
      {
        path: "/role",
        name: "role",
        component: () => import("../views/setting/permissions/role/role.vue"),
        meta: { title: "角色管理", icon: "index", noCache: true }
      }
    ]
  },
  {
    path: "/user",
    name: "user",
    component: Layout,
    meta: { parentName: "权限管理", parentPath: "permissions" },
    children: [
      {
        path: "/user",
        name: "user",
        component: () => import("../views/setting/permissions/user/user.vue"),
        meta: { title: "用户管理", icon: "index", noCache: true }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
