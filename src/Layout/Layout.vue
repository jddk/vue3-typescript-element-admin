<!--
 * @name: 
 * @Date: 2020-11-27 10:19:30
 * @LastEditTime: 2020-11-30 17:14:35
 * @FilePath: \fy_erp_vue3\src\Layout\Layout.vue
 * @permission: 
-->
<template>
  <div class="layout">
    <!-- 左侧菜单 -->
    <md-menu />
    <div class="main">
      <!-- 头部信息 -->
      <md-header />
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import mdMenu from "./model/menu.vue";
import mdHeader from "./model/header.vue";

export default defineComponent({
  components: {
    mdMenu,
    mdHeader
  },
  setup() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
}
.content {
  padding: 10px;
  box-sizing: border-box;
}
</style>
