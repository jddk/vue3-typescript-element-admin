/*
 * @name:
 * @Date: 2020-11-27 09:49:28
 * @LastEditTime: 2020-12-07 09:49:21
 * @FilePath: \vue3-typescript-element-admin\src\main.ts
 * @permission:
 */
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router/router";
import "./router/routerIntercept";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, { size: "small" })
  .mount("#app");
