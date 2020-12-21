<!--
 * @name: 
 * @Date: 2020-12-21 16:09:16
 * @LastEditTime: 2020-12-21 17:43:48
 * @FilePath: \vue3-typescript-element-admin\src\Layout\model\main.vue
 * @permission: 
-->
<template>
  <div class="content">
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <keep-alive :include="data.cachedViews">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, reactive } from "vue";
import { useRoute, RouteRecordRaw } from "vue-router";

interface Data {
  cachedViews: Array<string | undefined | symbol>;
}

export default defineComponent({
  name: "app-main",
  setup() {
    const route = useRoute();
    const data: Data = reactive({ cachedViews: [] });
    const fullPath = computed(() => route.fullPath);

    onMounted(() => {
      const childrens = route.matched[0].children;
      childrens.forEach((item: RouteRecordRaw) => {
        if (item.meta && !item.meta.noCache) {
          data.cachedViews.push(item.name);
        }
      });
    });
    return { data, fullPath };
  }
});
</script>

<style lang="scss" scoped>
.content {
  padding: 10px;
  box-sizing: border-box;
}
</style>
