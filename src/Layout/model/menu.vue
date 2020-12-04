<!--
 * @name: 
 * @Date: 2020-11-27 11:15:08
 * @LastEditTime: 2020-12-04 17:53:25
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
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <template #title>首页</template>
      </el-menu-item>
      <el-submenu index="/rent">
        <template #title>
          <i class="el-icon-s-management"></i>
          <span>租赁</span>
        </template>
        <el-menu-item index="/contract">
          <i class="el-icon-s-check"></i>
          <span>合同</span>
        </el-menu-item>
        <el-menu-item index="/order">
          <i class="el-icon-s-claim"></i>
          <span>订单</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="setting">
        <template #title>
          <i class="el-icon-s-management"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/webApi">
          <i class="el-icon-s-management"></i>
          <span>webApi</span>
        </el-menu-item>
        <el-submenu index="permissions">
          <template #title>
            <i class="el-icon-s-management"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item index="/role">
            <i class="el-icon-s-management"></i>
            <span>角色</span>
          </el-menu-item>
          <el-menu-item index="/user">
            <i class="el-icon-s-management"></i>
            <span>用户管理</span>
          </el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import Bus from "./bus";
export default defineComponent({
  setup() {
    const isCollapse = ref(false);
    const router = useRouter();
    const route = useRoute();
    // 当前路由path
    const currentRoute = computed(() => route.path);

    // const routers = computed(() => {
    //   // router.options.routes
    // });

    const routes: any = router.options.routes;
    let menus: any = [];
    let treeMenus = [];
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].path === "/") {
        menus = routes[i].children.map((item: any) => {
          return {
            path: item.path,
            name: item.name,
            meta: { ...item.meta }
          };
        });
        break;
      }
    }

    menus.forEach((item: any) => {
      menus.forEach((cell: any) => {
        if (item.meta.parent === cell.name) {
          cell.children = cell.children || [];
          cell.children.push(item);
        }
      });
    });
    treeMenus = menus.filter((item: any) => !item.meta.parent);
    console.log(treeMenus);

    onMounted(() => {
      Bus.$on("change-menu", () => {
        isCollapse.value = !isCollapse.value;
      });
    });

    function toSelect(path: string) {
      router.push({ path: path });
    }

    return { isCollapse, currentRoute, toSelect };
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
