<template>
  <div class="loginForm">
    <el-form :model="loginForm" ref="loginForm"  class="form">
      <el-form-item class="form-item">
        <el-input placeholder="用户名/手机"></el-input>
      </el-form-item>

      <el-form-item class="form-item">
        <el-input placeholder="密码" type="password"></el-input>
      </el-form-item>

      <p class="form-text">
        <nuxt-link to="#">忘记密码</nuxt-link>
      </p>

      <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      loginForm:{},
      // 表单规则
      rules: {}
    };
  },
  methods: {
    handleLoginSubmit() {
      this.$store.commit('user/setName', "jack")
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>