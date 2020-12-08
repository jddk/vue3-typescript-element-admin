<!--
 * @name: 
 * @Date: 2020-11-27 10:19:30
 * @LastEditTime: 2020-12-08 16:37:56
 * @FilePath: \vue3-typescript-element-admin\src\Layout\Layout.vue
 * @permission: 
-->
<template>
  <div class="layout">
    <!-- 左侧菜单 -->
    <md-menu />
    <div class="main">
      <!-- 头部信息 -->
      <md-header />
      <md-nav />
      <div class="content">
        <router-view :key="fullPath"></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import mdMenu from "./model/menu.vue";
import mdHeader from "./model/header.vue";
import mdNav from "./model/nav.vue";

export default defineComponent({
  components: {
    mdMenu,
    mdHeader,
    mdNav
  },
  setup() {
    const route = useRoute();
    const fullPath = computed(() => route.fullPath);
    return { fullPath };
  }
});
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
}
.main {
  width: 100%;
}
.content {
  padding: 10px;
  box-sizing: border-box;
}
</style>
