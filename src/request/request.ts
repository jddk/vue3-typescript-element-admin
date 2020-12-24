/*
 * @name:
 * @Date: 2020-12-24 12:06:10
 * @LastEditTime: 2020-12-24 12:16:45
 * @FilePath: \vue3-typescript-element-admin\src\request\request.ts
 * @permission:
 */
import axios from "axios";
import router from "@/router/router";
import { ElNotification, ElMessageBox } from "element-plus";
import store from "../store";

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 60000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    // login接口不传token
    if (localStorage.getItem("token") && config.url != "auth/login") {
      config.headers["Authorization"] =
        "Bearer " + localStorage.getItem("token"); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    const code = response.status;
    if (code < 200 || code > 300) {
      const value: any = response;
      ElNotification({
        title: "异常提示",
        type: "error",
        message: value.message
      });
      return Promise.reject("error");
    } else {
      return response.data;
    }
  },
  error => {
    let code = 0;
    try {
      code = error.response.data.status;
    } catch (e) {
      if (error.toString().indexOf("Error: timeout") !== -1) {
        ElNotification({
          title: "异常提示",
          type: "error",
          message: "网络请求超时"
        });
        return Promise.reject(error);
      }
      if (error.toString().indexOf("Error: Network Error") !== -1) {
        ElNotification({
          title: "异常提示",
          type: "error",
          message: "网络请求超时"
        });
        return Promise.reject(error);
      }
    }
    if (code === 401) {
      ElMessageBox.confirm(
        "登录状态已过期，您可以继续留在该页面，或者重新登录",
        "系统提示",
        {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        store.dispatch("LogOut").then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      });
    } else if (code === 403) {
      router.push({ path: "/401" });
    } else {
      const errorMsg = error.response.data.message;
      if (errorMsg !== undefined) {
        ElNotification({
          title: "异常提示",
          type: "error",
          message: errorMsg
        });
      }
    }
    return Promise.reject(error);
  }
);
export default service;
