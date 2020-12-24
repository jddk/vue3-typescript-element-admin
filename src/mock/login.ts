/*
 * @name:
 * @Date: 2020-12-24 12:04:12
 * @LastEditTime: 2020-12-24 17:55:48
 * @FilePath: \vue3-typescript-element-admin\src\mock\login.ts
 * @permission:
 */
import Mock from "mockjs";

// 设置延时时间
Mock.setup({
  timeout: "300-600"
});

export function login() {
  const menu = Mock.mock({
    "menu|10": [
      {
        id: "@id",
        path: "@word(4)/@word(4)",
        meta: {
          title: "@cword(5)",
          icon: Mock.Random.image("200x100", "#4A7BF7", "Hello")
        },
        name: "@word(4)"
      }
    ]
  });
  //实现对拦截到请求的处理
  Mock.mock("api/login", "post", (req: any) => {
    console.log("==", req);
    const { username, password } = JSON.parse(req.body);
    if (username == "admin" && password == "123456") {
      return {
        code: 1,
        msg: "成功",
        token: "teosdsfdfdksdfs232323",
        menu
      };
    } else {
      return {
        code: 0,
        msg: "账号密码错误"
      };
    }
  });
}
