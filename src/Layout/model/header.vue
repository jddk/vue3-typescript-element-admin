<!--
 * @name: 
 * @Date: 2020-11-27 17:14:22
 * @LastEditTime: 2020-11-30 17:53:21
 * @FilePath: \fy_erp_vue3\src\Layout\model\header.vue
 * @permission: 
-->
<template>
  <div class="header">
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
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Bus from "./bus";
export default defineComponent({
  setup() {
    const isCollapse = ref(true);

    function changeMenu() {
      isCollapse.value = !isCollapse.value;
      Bus.$emit("change-menu");
    }

    return { changeMenu, isCollapse };
  }
});
</script>

<style lang="scss" scoped>
.header {
  width: 100vw;
  height: 50px;
  box-shadow: 2px 2px 2px #f0f0f0;
  display: flex;
  align-items: center;
  padding-left: 10px;
  box-sizing: border-box;
}
.header-btn {
  margin-right: 10px;
  font-size: 20px;
  cursor: pointer;
}

.active {
  transform: rotate(180deg);
}
</style>
