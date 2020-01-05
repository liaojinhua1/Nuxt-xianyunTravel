<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in data.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`"
            border
            @change="handleInsurance(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <span>{{allPrice}}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      users: [
        {
          username: "",
          id: ""
        }
      ], // <Object{username,id}> 用户列表，存放username，id
      insurances: [], // 保险 id
      contactName: "", // 联系人名字
      contactPhone: "", //联系人电话
      captcha: "", //手机验证码
      invoice: false, //  Boolean 是否需要发票
      seat_xid: "", //座位id
      air: 0 //航班id
    };
  },
  computed: {
    //   实使计算订单总金额，总价格展示在侧边栏的组件
    allPrice() {
      // 总价price，price = （机票价格 + 保险（可能购买多种保险） + 燃油费）* 人数
      let price = 0;

      if (!this.data.seat_infos.org_settle_price) return;

      // 机票的单价
      price += this.data.seat_infos.org_settle_price;
      // 燃油费
      price += this.data.airport_tax_audlet;
      // 保险
      price += this.insurances.length * 30;
      // 根据乘机人的数量翻倍
      price *= this.users.length;
      // 传递给store
      this.$store.commit("air/setAllPrice", price);
      // 在模板中返回空值，因为computed中的属性一定要在模板中调用
      return "";
    }
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users.push({
        username: "",
        id: ""
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index, 1);
    },
    // 保险选中事件
    handleInsurance(id) {
      const index = this.insurances.indexOf(id);
      // 有的话删除掉该id
      if (index > -1) {
        this.insurances.splice(index, 1);
      } else {
        // 没有的话添加
        this.insurances.push(id);
      }
    },
    // 发送手机验证码
    handleSendCaptcha() {
      // 如果手机号为空
      if (!this.contactPhone) {
        this.$confirm("手机号码不能为空", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      //   验证手机号码是否有11位
      if (this.contactPhone.length !== 11) {
        this.$confirm("手机号码格式错误", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      // 调用actions的发送手机验证码的接口
      this.$store.dispatch("user/sendCaptcha", this.contactPhone).then(res => {
        this.$confirm(`"手机验证码发送成功：000000"`, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      });
    },

    // 提交订单
    handleSubmit() {      
      // 提交给创建订单接口的参数
      const data = {
        users: this.users,
        insurances: this.insurances, // 保险id
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        captcha: this.captcha,
        invoice: false,
        seat_xid: this.$route.query.seat_xid, // 座位的id
        air: this.$route.query.id // 航班的id
      };
      //   使用对象结构结构出userInfo
      const {
        user: { usreInfo  }
      } = this.$store.state;

      this.$message({
        message: "正在生成订单！请稍等",
        type: "success"
      });

      // 创建订单接口
      this.$axios({
        url: "/airorders",
        method: "POST",
        headers: {
          // Bearer是token字符串前面必须要声明的，后面加上空格，再连接上token
          Authorization: `Bearer ${usreInfo.token || "NO TOKEN"}`
          // Authorization: "Bearer " + this.$store.state.user.usreInfo.token
        },
        data
      }).then(res => {
        // 订单的id
        const { id } = res.data.data;
        // console.log(res);
        // 跳转到付款页
        this.$router.push({
          path: "/air/pay",
          query: {
            id
          }
        });
      });
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>