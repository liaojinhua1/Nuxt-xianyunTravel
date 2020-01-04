<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrderForm :data="infoData" />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <OrderAside :data="infoData" />
      </div>
    </el-row>
  </div>
</template>

<script>
// 导入订单表单组件
import OrderForm from "@/components/air/orderForm.vue";
// 导入侧边栏组件
import OrderAside from "@/components/air/orderAside.vue";
export default {
  data() {
    return {
      // 机票信息
      infoData: {
        insurances: [], // 初始化保险数据
        seat_infos: {} // 座位的列表
      }
    };
  },
  components: {
    OrderForm,
    OrderAside
  },
  mounted() {
    // console.log(this.$route.query);
    // id是动态参数
    const { id, seat_xid } = this.$route.query;
    //   发送订单详情页
    this.$axios({
      url: "/airs/" + id,
      params: {
        seat_xid
      }
    }).then(res => {
      this.infoData = res.data;
      console.log(this.infoData);
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>