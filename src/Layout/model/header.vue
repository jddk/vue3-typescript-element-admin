<!--
 * @name: 
 * @Date: 2020-11-27 17:14:22
 * @LastEditTime: 2020-12-07 17:59:24
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
interface Items {
  path: string;
  name: string | symbol | undefined;
  meta?: { [x: string]: string; [x: number]: string };
}
interface Menus {
  path?: string;
  name?: string | symbol | undefined;
  meta?: { [x: string]: string; [x: number]: string };
  comments?: string;
  children?: Menus[];
}
interface Data {
  routeList: Items[];
}
export default defineComponent({
  name: "md-header",
  setup() {
    const isCollapse = ref(true);
    const router = useRouter();
    const route = useRoute();
    let treeMenus: Menus[] = [];
    const data = reactive<Data>({
      routeList: []
    });

    // 打开和收起侧边栏
    function changeMenu() {
      isCollapse.value = !isCollapse.value;
      Bus.$emit("change-menu");
    }

    function toLogout() {
      localStorage.removeItem("TOKEN-VUE3-TS-EL-ADMIN");
      router.push({ path: "/login" });
      location.reload();
    }

    onBeforeRouteUpdate((to: any) => {
      if (to.meta.parent) {
        const paths: string[] = to.path.split("/").splice(1);
        let treeWrap: Menus = {};
        treeMenus.forEach((item: Menus) => {
          paths.forEach((cell: string) => {
            if (item.name === cell) {
              treeWrap = JSON.parse(JSON.stringify(item));
            }
          });
        });
        while (treeWrap.children) {
          // data.routeList.push({name:})
        }
      } else {
        data.routeList = [
          { path: to.path, name: to.name, meta: { title: to.meta.title } }
        ];
      }
    });
    onMounted(() => {
      Bus.$on("tree-menus", (val: Menus[]) => {
        treeMenus = val;
      });
    });
    onBeforeUnmount(() => {
      Bus.$off("change-menu");
    });

    return { changeMenu, isCollapse, toLogout, data };
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
