/*
 * @name:
 * @Date: 2020-11-27 09:49:28
 * @LastEditTime: 2020-12-24 17:52:58
 * @FilePath: \vue3-typescript-element-admin\src\main.ts
 * @permission:
 */
import { createApp } from "vue";
import "normalize.css/normalize.css";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router/router";
import "./router/routerIntercept";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "@/styles/index.scss"; // global css

import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";

// mock
import { login } from "./mock/login";
login();

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, { size: "small" })
  .component("svg-icon", SvgIcon)
  .mount("#app");

// 自动导入svg
const requireAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().map(requireContext);
const req = require.context("./icons/svg", false, /\.svg$/);
requireAll(req);
