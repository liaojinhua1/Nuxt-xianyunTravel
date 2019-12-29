<template>
  <div class="loginForm">
    <el-form :model="loginForm" ref="loginForm" :rules="rules" class="form">
      <el-form-item class="form-item" prop="username">
        <el-input placeholder="用户名/手机" v-model="loginForm.username"></el-input>
      </el-form-item>

      <el-form-item class="form-item" prop="password">
        <el-input placeholder="密码" type="password" v-model="loginForm.password"></el-input>
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
    // rule: 定义校验规则（不是必须的）
    // value: 表单输入框的值
    // callback: 回调函数，可以接受错误的提示，如果验证通过callback就不用传递参数，callback必须要调用
    const validateUsername = (rule, value, callback) => {
      const reg = /^1[3-9][0-9]{9}$/;
      if (value === "") {
        callback("请输入手机号");
      } else {
        // 正则下面的test方法返回布尔值
        if (reg.test(value)) {
          // 验证通过
          callback();
        } else {
          callback("手机号码格式错误");
        }
      }
    };
    return {
      // 表单数据
      loginForm: {
        username: "",
        password: ""
      },
      // 表单规则
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleLoginSubmit() {
      // 验证整个表单是否符合输入规则
     this.$refs["loginForm"].validate(valid=>{
       if(!valid) return;
      //  调用api发送请求
       this.$axios({
         url:'/accounts/login',
         method:'POST',
         data:this.loginForm
       }).then(res=>{
         console.log(res.data);
       })
     })
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