<!--
 * @name: 
 * @Date: 2020-12-02 14:12:56
 * @LastEditTime: 2020-12-02 14:45:15
 * @FilePath: \vue3-typescript-element-admin\src\views\login\login.vue
 * @permission: 
-->
<template>
  <div>
    login
    <el-button @click="toLogin">登录</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    function toLogin() {
      localStorage.setItem("TOKEN-VUE3-TS-EL-ADMIN", "xxxxxxxxxx");
      router.push({ path: "/" });
    }
    return { toLogin };
  }
});
</script>

<style scoped></style>
