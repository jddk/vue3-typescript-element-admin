<!--
 * @name: 
 * @Date: 2020-11-27 11:15:08
 * @LastEditTime: 2020-12-07 17:33:29
 * @FilePath: \vue3-typescript-element-admin\src\Layout\model\menu.vue
 * @permission: 
-->
<template>
  <div class="menu">
    <el-menu
      :default-active="currentRoute"
      :router="true"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :collapse="isCollapse"
      @select="toSelect"
    >
      <md-menu-item :menus="treeMenus" />
    </el-menu>
  </div>
</template>

<script lang="ts">
interface Menus {
  path: string;
  name: string | symbol | undefined;
  meta?: { [x: string]: string; [x: number]: string };
  comments?: string;
  children?: Menus[];
}

import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  onBeforeMount,
  computed
} from "vue";
import { useRouter, useRoute, RouteRecordRaw } from "vue-router";
import mdMenuItem from "./menu-item.vue";
import Bus from "./bus";

// 将路由转成树
function routesToTree() {
  const router = useRouter();
  const routes: RouteRecordRaw[] = router.options.routes;
  let menus: Menus[] = [];
  let treeMenus: Menus[] = [];
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].path === "/") {
      const children: RouteRecordRaw[] = routes[i].children || [];
      menus = children.map((item: RouteRecordRaw) => {
        return {
          path: item.path,
          name: item.name,
          meta: { ...item.meta }
        };
      });
      break;
    }
  }

  menus.forEach((item: Menus) => {
    menus.forEach((cell: Menus) => {
      if (item.meta && item.meta.parent === cell.name) {
        cell.children = cell.children || [];
        cell.children.push(item);
      }
    });
  });
  treeMenus = menus.filter((item: Menus) => {
    if (item.meta) {
      return !item.meta.parent;
    }
  });
  Bus.$emit("tree-menus", treeMenus);
  return treeMenus;
}
export default defineComponent({
  components: { mdMenuItem },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const isCollapse = ref(false);
    const treeMenus = reactive(routesToTree());

    // 当前路由path
    const currentRoute = computed(() => route.path);

    onMounted(() => {
      Bus.$on("change-menu", () => {
        isCollapse.value = !isCollapse.value;
      });
    });

    onBeforeMount(() => {
      Bus.$off("tree-menus");
    });

    function toSelect(path: string) {
      router.push({ path: path });
    }

    return { isCollapse, currentRoute, toSelect, treeMenus };
  }
});
</script>

<style lang="scss" scoped>
.menu {
  box-shadow: 2px 2px 2px #f0f0f0;
}
.el-menu {
  height: 100vh;
  overflow-y: auto;
}
.el-menu:not(.el-menu--collapse) {
  width: 220px;
  min-height: 400px;
}
.menu {
  // 整个滚动条
  ::-webkit-scrollbar {
    width: 10px;
    background: #304156;
  }

  /*滚动条中间滑动部分*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #304156;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(144, 147, 153, 0.3);
  }
}
</style>
