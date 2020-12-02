<!--
 * @name: 
 * @Date: 2020-11-27 10:26:19
 * @LastEditTime: 2020-12-02 14:09:58
 * @FilePath: \vue3-typescript-element-admin\src\views\home\home.vue
 * @permission: 
-->
<template>
  <div class="home">
    {{ test }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "home",
  props: {},
  setup() {
    const test = ref("首页");
    return { test };
  }
});
</script>
