/*
 * @name:
 * @Date: 2020-12-24 12:03:47
 * @LastEditTime: 2020-12-24 12:20:09
 * @FilePath: \vue3-typescript-element-admin\src\api\login.ts
 * @permission:
 */
import request from "@/request/request";

export function login(data: any) {
  return request({
    url: "api/login",
    method: "post",
    data
  });
}
