## 标签栏导航

标签导航的组件在 Layout/nav.vue 中,初始化时添加一次标签，监听路由变化添加标签并向 keep-alive 的 include 中添加需要缓存的组件名称；点击关闭标签时，
移除标签并向 keep-alive 的 include 中添加组件名，因为全局只用了一个 Layout，只会初始化一次所有这些逻辑没有放在 vuex 中，Layout 内部组件之间通讯采用
发布订阅通讯(Bus)。

```javascript
// 监听路由变化
onBeforeRouteUpdate((to: any) => {
  addTags(to);
});

// 初始化时添加路由标签
onMounted(() => {
  addTags(route);
});
```
