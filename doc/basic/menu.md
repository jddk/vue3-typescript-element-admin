## 路由和侧边栏

路由和侧边栏是组织起一个后台应用的关键骨架。

本项目侧边栏和路由是绑定在一起的，所以你只有在 @/router/router.ts 下面配置对应的路由，侧边栏就能动态的生成了。大大减轻了手动重复编辑侧边栏的工作量。当然这样就需要在配置路由的时候遵循一些约定的规则。

## 配置

```javascript
{
  path: "/home",  // 路径
  name: "home",  // 因为<keep-alive>的需要，name必须与.vue文件里的name一致
  meta: {
    title: "首页", // 设置该路由在侧边栏和面包屑中展示的名字
    icon: "index", // 设置该路由的图标
    affix: true, // 如果设置为true，它则会固定在tags-view中(默认 false)
    noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
  }
},
```
