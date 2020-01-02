<template>
  <div class="flight-item">
    <div @click="isShow = !isShow">
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{data.airline_name}}</span>
          {{data.flight_no}}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{data.dep_time}}</strong>
              <span>{{data.dst_airport_name}}{{data.dst_airport_quay}}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{rankTime}}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{data.arr_time}}</strong>
              <span>{{data.org_airport_name}}{{data.org_airport_quay}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price">{{data.seat_infos[0].org_settle_price_child}}</span>起
        </el-col>
      </el-row>
    </div>
    <div class="flight-recommend" v-if="isShow">
      <!-- 隐藏的座位信息列表 -->
      <el-row
        type="flex"
        justify="space-between"
        align="middle"
        v-for="(item,index) in data.seat_infos"
        :key="index"
      >
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row type="flex" justify="space-between" align="middle" class="flight-sell">
            <el-col :span="16" class="flight-sell-left">
              <span>{{item.name}}</span>
              | {{item.supplierName}}
            </el-col>
            <el-col :span="5" class="price">￥{{item.org_settle_price}}</el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini">选定</el-button>
              <p>剩余：{{item.discount}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    
  </div>
</template>

<script>
export default {
  // 接收父组件传的航班数据列表
  // props:['data'], 这种方式传值只能传递一个数值，而不能传递一个对象
  props: {
    data: {
      // 组件传值的类型
      type: Object,
      // 如果组件传过来的值为空，则给data一个空值，这样渲染的时候才不会报错
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  //   使用computed会自动监听实例的改变，相比methods不需要再调用
  computed: {
    //  监听时间的变化，重新计算航班所用的时间
      rankTime(){
        //   把出发时间转换为分
        const dep = this.data.dep_time.split(':')
        const dep_min = +dep[0]*60 + +dep[1]
        //   把到达时间转换为分
        const arr = this.data.arr_time
        let arr_min = +arr[0]*60 + +arr[1]
        //   判断到达时间是不是第二天，是的话，到达就加上24*60分
        if(arr_min < dep_min){
            arr_min += 24*60
        }
        //   用到达时间减去出发时间，得到航班所用时间，单位为分
        let dis = arr_min - dep_min
        //   用/计算，并向下取整，获得航班所用时间的时
        const hours = Math.floor(dis/60)
        //   用%计算，获得航班所用时间的分
        const minute = dis%60
        //   拼接字符串
          return `${hours}时${minute}分`
      }
  }
};
</script>

<style scoped lang="less">
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>