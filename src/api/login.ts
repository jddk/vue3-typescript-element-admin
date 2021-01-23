/*
 * @name:
 * @Date: 2020-12-24 12:03:47
 * @LastEditTime: 2021-01-23 14:27:41
 * @FilePath: \vue3-typescript-element-admin\src\api\login.ts
 * @permission:
 */
import request from "@/request/request";

export function login(data: any) {
  return request({
    url: "auth/login",
    method: "post",
    data
  });
}

export function getUserInfo() {
  return request({
    url: "auth/info",
    method: "get"
  });
}
