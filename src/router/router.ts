/*
 * @name:
 * @Date: 2020-11-27 09:49:28
 * @LastEditTime: 2020-12-02 14:40:00
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
    meta: { title: "登录", icon: "logo" }
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
        meta: { title: "首页", icon: "index", noCache: true, affix: true }
      },
      {
        path: "/order",
        component: () => import("../views/rent/order/order.vue"),
        name: "order",
        meta: { title: "订单", icon: "index", noCache: true, affix: true }
      },
      {
        path: "/contract",
        component: () => import("../views/rent/contract/contract.vue"),
        name: "contract",
        meta: { title: "合同", icon: "index", noCache: true, affix: true }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
