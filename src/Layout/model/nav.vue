<!--
 * @name: 
 * @Date: 2020-12-01 17:46:51
 * @LastEditTime: 2020-12-22 16:55:48
 * @FilePath: \vue3-typescript-element-admin\src\Layout\model\nav.vue
 * @permission: 
-->
<template>
  <div class="nav">
    <el-tag
      v-for="(tag, i) in data.tags"
      :key="tag.path"
      size="medium"
      :closable="!tag.meta.affix"
      :effect="tag.effect"
      :type="tag.type"
      @close="toClose(i, tag)"
      @click="toClick(tag)"
    >
      {{ tag.meta.title }}
    </el-tag>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { onBeforeRouteUpdate, useRouter, useRoute } from "vue-router";
import Bus from "./bus";
export default defineComponent({
  name: "app-nav",
  setup() {
    interface Tags {
      // 路由相关
      fullPath: string;
      hash: string;
      meta?: {
        [x: string]: string | symbol | boolean;
        [x: number]: string | symbol | boolean;
      };
      name: string | symbol | null | undefined;
      params: { [x: string]: any; [x: number]: any };
      path: string;
      query: { [x: string]: any; [x: number]: any };
      // 样式相关
      type: string;
      effect: string;
    }
    interface Data {
      tags: Tags[];
    }

    const data = reactive<Data>({
      tags: []
    });
    // 1、关闭单个
    const router = useRouter();
    const route = useRoute();
    function toClose(i: number, tag: Tags) {
      data.tags.splice(i, 1);
      // 传递关闭的组件名称用户删除缓存
      Bus.$emit("closeTag", tag.name);
      if (route.path === tag.path) {
        if (data.tags.length === 0) {
          router.push({
            path: "/home"
          });
        } else {
          const item = data.tags[i - 1];
          router.push({
            path: item.path,
            params: { ...item.params },
            query: { ...item.params }
          });
        }
      }
    }
    // 2、跳转
    function toClick(tag: Tags) {
      data.tags.forEach((item: Tags) => {
        if (tag.path === item.path) {
          item.type = "success";
          item.effect = "dark";
        } else {
          item.type = "info";
          item.effect = "plain";
        }
      });
      router.push({
        path: tag.path,
        params: { ...tag.params },
        query: { ...tag.params }
      });
    }

    // 3、新增标签
    function addTags(to: any) {
      // 如果存在直接结束
      let hasThisTag = false;
      data.tags.forEach((item: Tags) => {
        if (to.path === item.path) {
          item.type = "success";
          item.effect = "dark";
          hasThisTag = true;
        } else {
          item.type = "info";
          item.effect = "plain";
        }
      });
      if (hasThisTag) return false;

      // 如果不存在重复向数组中添加
      data.tags.push({
        fullPath: to.fullPath,
        hash: to.hash,
        meta: { ...to.meta },
        name: to.name,
        params: { ...to.params },
        path: to.path,
        query: { ...to.query },
        type: "success",
        effect: "dark"
      });
      // 添加缓存
      if (!to.meta.noCache) {
        Bus.$emit("addCachedViews", to.name);
      }
    }

    // 监听路由变化
    onBeforeRouteUpdate((to: any) => {
      addTags(to);
    });

    // 初始化时添加路由标签
    onMounted(() => {
      addTags(route);
    });

    return { data, toClose, toClick };
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
