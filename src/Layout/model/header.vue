<!--
 * @name: 
 * @Date: 2020-11-27 17:14:22
 * @LastEditTime: 2020-12-02 15:19:08
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
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>租赁管理</el-breadcrumb-item>
        <el-breadcrumb-item>合同列表列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-button @click="toLogout">退出登录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import Bus from "./bus";
export default defineComponent({
  name: "md-header",
  setup() {
    const isCollapse = ref(true);
    const router = useRouter();

    function changeMenu() {
      isCollapse.value = !isCollapse.value;
      Bus.$emit("change-menu");
    }

    function toLogout() {
      localStorage.removeItem("TOKEN-VUE3-TS-EL-ADMIN");
      router.push({ path: "/login" });
      location.reload();
    }

    onBeforeUnmount(() => {
      Bus.$off("change-menu");
    });

    return { changeMenu, isCollapse, toLogout };
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
