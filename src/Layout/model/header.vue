<!--
 * @name: 
 * @Date: 2020-11-27 17:14:22
 * @LastEditTime: 2020-12-08 14:03:02
 * @FilePath: \vue3-typescript-element-admin\src\Layout\model\header.vue
 * @permission: 
-->
<template>
  <div class="header">
    <div class="left">
      <i
        class="el-icon-s-fold header-btn"
        :class="{ active: !isCollapse }"
        @click="changeMenu"
      ></i>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in data.routeList" :key="item.path">{{
          item.meta.title
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-button @click="toLogout">退出登录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  onBeforeUnmount
} from "vue";
import {
  useRouter,
  useRoute,
  onBeforeRouteUpdate,
  RouteRecordRaw
} from "vue-router";
import Bus from "./bus";
// 当前路由层级计算
function getRouteList() {
  interface Data {
    routeList: RouteRecordRaw[];
  }
  const data = reactive<Data>({
    routeList: []
  });
  // 根据路由path计算
  function pathToArr(path: string, routes: RouteRecordRaw[]) {
    const pathArr: string[] = path.split("/").splice(1);
    const arr = [];
    for (const i of pathArr) {
      for (const j of routes) {
        if (i === j.name) {
          arr.push(j);
          break;
        }
      }
    }
    data.routeList = arr;
  }

  // 初始化
  onMounted(() => {
    const route = useRoute();
    pathToArr(route.path, route.matched[0].children);
  });
  // 路由更新
  onBeforeRouteUpdate((to: any) => {
    pathToArr(to.path, to.matched[0].children);
  });

  return data;
}
export default defineComponent({
  name: "md-header",
  setup() {
    // 1、展开收起侧边栏逻辑
    const isCollapse = ref(true);
    function changeMenu() {
      isCollapse.value = !isCollapse.value;
      Bus.$emit("change-menu");
    }
    onBeforeUnmount(() => {
      Bus.$off("change-menu");
    });

    // 2、退出登录
    const router = useRouter();
    function toLogout() {
      localStorage.removeItem("TOKEN-VUE3-TS-EL-ADMIN");
      router.push({ path: "/login" });
      location.reload();
    }

    // 3、当前路由层级计算
    const data = getRouteList();

    return { isCollapse, changeMenu, toLogout, data };
  }
});
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 50px;
  border-bottom: 2px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  box-sizing: border-box;
}
.header-btn {
  margin-right: 10px;
  font-size: 20px;
  cursor: pointer;
}
.left {
  display: flex;
  align-items: center;
}

.active {
  transform: rotate(180deg);
}
</style>
