<!--
 * @name: 
 * @Date: 2020-12-01 17:46:51
 * @LastEditTime: 2020-12-02 14:56:14
 * @FilePath: \vue3-typescript-element-admin\src\Layout\model\nav.vue
 * @permission: 
-->
<template>
  <div class="nav">
    <el-tag
      v-for="(tag, i) in tags"
      :key="tag.name"
      size="medium"
      closable
      :effect="tag.effect"
      :type="tag.type"
      @close="toClose(i)"
      @click="toClick(tag)"
    >
      {{ tag.name }}
    </el-tag>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "md-nav",
  setup() {
    const tags = reactive([
      { name: "标签一", type: "success", effect: "dark" },
      { name: "标签二", type: "info", effect: "plain" },
      { name: "标签三", type: "info", effect: "plain" },
      { name: "标签四", type: "info", effect: "plain" },
      { name: "标签五", type: "info", effect: "plain" }
    ]);

    function toClose(i: number) {
      tags.splice(i, 1);
    }
    function toClick(tag: object) {
      console.log(tag);
    }
    return { tags, toClose, toClick };
  }
});
</script>

<style scoped>
.nav {
  width: 100%;
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
