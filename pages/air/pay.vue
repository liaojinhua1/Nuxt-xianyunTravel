<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{orderData.price}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// 生成二维码的包
import QRCode from "qrcode";
export default {
  data() {
    return {
      orderData: {},
      //   清楚定时器中使用的,定义应是null，但是在nuxt中一般不适用null ，所以给个空的字符串
      timer: ""
    };
  },
  methods: {
    isPay() {
      // 订单生成成功后，在付款页需要服务器实时推送信息给客户端，检查是否付款成功然后执行对应的操作，这里我们采用 轮询的方式 调用查询订单状态接口
      this.timer = setInterval(() => {
        const data = {
          id: this.$route.query.id,
          nonce_str: this.orderData.price,
          out_trade_no: this.orderData.payInfo.order_no
        };
        // 发送请求，查询订单付款状态
        this.$axios({
          url: "airorders/checkpay",
          method: "POST",
          data,
          headers: {
            // Bearer是token字符串前面必须要声明的，后面加上空格，再连接上token
            Authorization: `Bearer ${usreInfo.token || "NO TOKEN"}`
          }
        }).then(res => {
          //   未支付时，显示的是 订单未支付
          if (res.data.statusTxt !== "订单未支付") {
            this.$confirm("订单支付成功", "提示", {
              confirmButtonText: "确定",
              showCancelButton: false,
              type: "success"
            });
            //   停止定时器
            clearInterval(this.timer);
          }
        });
      }, 3000);
    }
  },
  mounted() {
    setTimeout(v => {
      //   获取订单id
      const { id } = this.$route.query;
      const {
        user: { usreInfo }
      } = this.$store.state;
      // 发送请求获取订单详情
      this.$axios({
        url: `airorders/${id}`,
        headers: {
          // Bearer是token字符串前面必须要声明的，后面加上空格，再连接上token
          Authorization: `Bearer ${usreInfo.token || "NO TOKEN"}`
        }
      }).then(res => {
        // 订单的详情
        this.orderData = res.data;
        console.log(this.orderData);
        // 获取canvas元素
        const stage = document.getElementById("qrcode-stage");
        // 生成二维码
        QRCode.toCanvas(stage, this.orderData.payInfo.code_url, {
          width: 200
        });
        this.isPay();
      });
    }, 1);
  },
  destroyed() {
    // 组件卸载时候清除定时器
    clearInterval(this.timer);
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>