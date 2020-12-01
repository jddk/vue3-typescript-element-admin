/*
 * @name:
 * @Date: 2020-11-27 09:49:28
 * @LastEditTime: 2020-11-27 10:48:39
 * @FilePath: \fy_erp_vue3\src\router\index.ts
 * @permission:
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "../Layout/Layout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Layout,
    redirect: "home",
    children: [
      {
        path: "home",
        component: () => import("../views/home/home.vue"),
        name: "home",
        meta: { title: "首页", icon: "index", noCache: true, affix: true }
      },
      {
        path: "order",
        component: () => import("../views/rent/order/order.vue"),
        name: "order",
        meta: { title: "订单", icon: "index", noCache: true, affix: true }
      },
      {
        path: "contract",
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
