<!--
 * @name: 
 * @Date: 2020-12-01 17:46:51
 * @LastEditTime: 2020-12-01 17:57:46
 * @FilePath: \vue3-typescript-element-admin\src\Layout\model\nav.vue
 * @permission: 
-->
<template>
  <div class="nav">
    <el-tag
      v-for="tag in tags"
      :key="tag.name"
      size="medium"
      closable
      effect="plain"
      :type="tag.type"
    >
      {{ tag.name }}
    </el-tag>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "nav",
  setup() {
    const tags = reactive([
      { name: "标签一", type: "" },
      { name: "标签二", type: "success" },
      { name: "标签三", type: "info" },
      { name: "标签四", type: "warning" },
      { name: "标签五", type: "danger" }
    ]);
    return { tags };
  }
});
</script>

<style scoped>
.nav {
  width: 100vw;
  height: 40px;
  box-shadow: 2px 2px 2px #f0f0f0;
  display: flex;
  align-items: center;
  padding-left: 10px;
  box-sizing: border-box;
}
.el-tag {
  cursor: pointer;
  margin-right: 4px;
  border-radius: 0;
}
</style>
