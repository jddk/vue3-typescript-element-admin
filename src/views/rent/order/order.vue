<!--
 * @name: 
 * @Date: 2020-11-27 10:43:29
 * @LastEditTime: 2021-01-23 14:36:39
 * @FilePath: \vue3-typescript-element-admin\src\views\rent\order\order.vue
 * @permission: 
-->
<template>
  <div>
    订单
    <el-input v-model="test"></el-input>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "contract",
  setup() {
    const test = ref("");
    return { test };
  }
});
</script>

<style scoped></style>
