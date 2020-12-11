<!--
 * @name: 
 * @Date: 2020-12-02 14:12:56
 * @LastEditTime: 2020-12-11 16:28:48
 * @FilePath: \vue3-typescript-element-admin\src\views\login\login.vue
 * @permission: 
-->
<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="right"
    >
      <div class="title-container">
        <h3 class="title">Login</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon
            icon-class="user"
            class="el-input__icon"
            style="height: 39px;width: 13px;margin-left: 2px;"
          />
        </span>
        <!-- loginForm.username -->
        <el-input
          ref="username"
          v-model="test"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <el-form-item class="el-form-item-none" label="记住密码" align="right">
        <el-checkbox
          v-model="loginForm.remember"
          @change="changeRemember"
        ></el-checkbox>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  onMounted,
  nextTick,
  toRefs
} from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "login",
  setup() {
    const test = ref("text");
    const data = reactive({
      loginForm: { username: "", password: "", remember: false },
      loginRules: {
        username: [{ required: true, trigger: "blur", message: "不能为空" }]
      },
      password: [{ required: true, trigger: "blur", message: "不能为空" }],
      loading: false,
      passwordType: "password",
      redirect: undefined
    });
    const router = useRouter();
    function toLogin() {
      localStorage.setItem("TOKEN-VUE3-TS-EL-ADMIN", "xxxxxxxxxx");
      router.push({ path: "/" });
    }
    onMounted(() => {
      if (localStorage.getItem("remember")) {
        data.loginForm = {
          username: localStorage.getItem("username") || "",
          password: localStorage.getItem("password") || "",
          remember: true
        };
      }
    });
    function showPwd() {
      if (data.passwordType === "password") {
        data.passwordType = "";
      } else {
        data.passwordType = "password";
      }
      nextTick(() => {
        const password: any = ref(null);
        password.value.focus();
      });
    }
    function changeRemember(val: boolean) {
      if (val) {
        localStorage.setItem("remember", "true");
        localStorage.setItem("username", data.loginForm.username);
        localStorage.setItem("password", data.loginForm.password);
      } else {
        localStorage.removeItem("remember");
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
    }
    function handleLogin() {
      if (data.loginForm.remember) {
        localStorage.setItem("remember", "true");
        localStorage.setItem("username", data.loginForm.username);
        localStorage.setItem("password", data.loginForm.password);
      } else {
        localStorage.removeItem("remember");
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
      interface Ref {
        value: any;
      }
      const loginForm: Ref = ref(null);
      loginForm.value.validate((valid: boolean) => {
        if (valid) {
          data.loading = true;
          // data.$store
          //   .dispatch("user/login", this.loginForm)
          //   .then(() => {
          //     this.$router.push({ path: "/" });
          //     this.loading = false;
          //   })
          //   .catch(() => {
          //     this.loading = false;
          //   });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
    return {
      ...data,
      test,
      changeRemember,
      toLogin,
      showPwd,
      handleLogin
    };
  }
});
</script>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .el-form-item-none {
    border: none;
    background: none;
    border-radius: 0;
  }
  .el-form-item-none .el-form-item__label {
    width: 94%;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
