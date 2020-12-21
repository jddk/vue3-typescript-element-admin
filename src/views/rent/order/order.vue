<!--
 * @name: 
 * @Date: 2020-11-27 10:43:29
 * @LastEditTime: 2020-12-21 16:06:34
 * @FilePath: \vue3-typescript-element-admin\src\views\rent\order\order.vue
 * @permission: 
-->
<template>
  <div>
    <el-input v-model="test"></el-input>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onActivated } from "vue";

export default defineComponent({
  name: "order",
  setup() {
    const test = ref("");
    onActivated(() => {
      console.log("activated");
    });
    onMounted(() => {
      console.log("====onMounted");
    });
    return { test };
  }
});
</script>

<style scoped></style>
