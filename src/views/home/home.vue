<!--
 * @name: 
 * @Date: 2020-11-27 10:26:19
 * @LastEditTime: 2020-11-27 10:26:20
 * @FilePath: \fy_erp_vue3\src\views\home\home.vue
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
    const test = ref("test");
    return { test };
  }
});
</script>
