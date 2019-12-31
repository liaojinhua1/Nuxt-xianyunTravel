<template>
  <div class="registeForm">
    <el-form :model="registeForm" ref="registeForm" :rules="rules" class="form">
      <el-form-item class="form-item" prop="username">
        <el-input placeholder="用户名/手机" v-model="registeForm.username"></el-input>
      </el-form-item>

      <!-- <el-form-item>
        <el-col :span="16">
          <el-input placeholder="验证码" class="code"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button @click.prevent="handleSendCaptcha(registeForm.username)" class="sendCode">发送验证码</el-button>
        </el-col>
      </el-form-item>-->

      <el-form-item class="form-item" prop="captcha">
        <el-input placeholder="验证码" v-model="registeForm.captcha">
          <template slot="append">
            <el-button @click="handleSendCaptcha()">发送验证码</el-button>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item class="form-item" prop="nickname">
        <el-input placeholder="你的名字" v-model="registeForm.nickname"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input type="password" placeholder="密码" v-model="registeForm.password"></el-input>
      </el-form-item>

      <el-form-item prop="checkPassword">
        <el-input type="password" placeholder="确认密码" v-model="registeForm.checkPassword"></el-input>
      </el-form-item>

      <p class="form-text">
        <nuxt-link to="#">已有账号，去登录</nuxt-link>
      </p>

      <el-button class="submit" type="primary" @click="handleRegisteSubmit">注册</el-button>
    </el-form>
  </div>
</template>

<script>
import { teal } from 'color-name';
export default {
  data() {
    // rule: 定义校验规则（不是必须的）
    // value: 表单输入框的值
    // callback: 回调函数，可以接受错误的提示，如果验证通过callback就不用传递参数，callback必须要调用
    const validateUsername = (rule, value, callback) => {
      const reg = /^1[3-9][0-9]{9}$/;
      // 正则下面的test方法返回布尔值
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else if (reg.test(value)) {
        // 验证通过
        callback();
      } else {
        callback("手机号码格式错误");
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.rules.checkPassword !== "") {
          this.$refs.registeForm.validateField("checkPassword");
        }
        callback();
      }
    };
    const validatePassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registeForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      registeForm: {
        username: "", // 用户名
        captcha: "", // 手机验证码
        nickname: "", //昵称
        password: "", //密码
        checkPassword: "" //确认密码
      },
      // 表单规则
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        checkPassword: [{ validator: validatePassword2, trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    //   注册事件
    handleRegisteSubmit() {
      //   检验整个表单的值是否符和规则，如果符合才发送请求
      //  validate 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，
      // 并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
      this.$refs["registeForm"].validate(valid => {
        if (valid) {
            // 用对象结构，把registeForm中多定义的checkPassword去除
            const {checkPassword,...data} = this.registeForm
          // 调用actions中的registe方法
          this.$store.dispatch('user/registe', data).then(res=>{
            if(res === 'true'){
              // 如果注册成功返回true
              this.$message.success('注册成功')
            }
          })
          // 调用api，发送请求
          // this.$axios({
          //   url: "/accounts/register",
          //   method: "POST",
          //   data
          // }).then(res => {
          //   console.log(res.data);
          // });
        }
      });
    },
    // 发送验证码事件
    handleSendCaptcha() {
      // 如果没有输入用户名（手机号），则终止
      if (this.registeForm.username.trim() === '') {
        this.$confirm("手机号码不能为空", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
         // 调用actions中的captcha方法
      this.$store.dispatch('user/sendCaptcha',this.registeForm.username).then(res => {   
        this.$message.success('验证码为：000000')    
        console.log(111);      
        // // 发送验证码成功后，把res.data.code 结构出来
        // const {code} = res.data
        // // 把验证码模拟出来，用弹框显示出来
        // this.$confirm(`模拟手机验证码为:${code}`, "提示", {
        //   confirmButtonText: "确定",
        //   showCancelButton: false,
        //   type: "warning"
        // });
        
      });
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
// .code{
//     width: 80%;
// }
// .sendCode{
//     width: 20%;
// }
</style>
