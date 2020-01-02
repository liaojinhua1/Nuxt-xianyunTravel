<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
         <!-- :data="item" 把每一项的航班列表信息传递给子组件 -->
        <FlightsItem v-for="(item,index) in dataList" :key="index"  :data="item" />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
// import moment from "moment";
// 导入飞机列表页头部组件
import FlightsListHead from "@/components/air/flightsListHead.vue";
// 导入列表页组件
import FlightsItem from "@/components/air/flightsItem.vue";

export default {
  // 组件注册
  components: {
    FlightsListHead,
    FlightsItem
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      flightsData: {}, // 航班总数据
      dataList: [] // 航班列表数据，用于循环flightsItem组件，单独出来是因为要分页
    };
  },
  methods: {
    // 获取航班总数据
    getData() {
      this.$axios({
        url: "/airs",
        params: this.$route.query // url中获取的五个参数
      }).then(res => {
        // 航班总数据
        this.flightsData = res.data;
        console.log(this.flightsData.flights);
        //  航班列表数据
        this.dataList = this.flightsData.flights;
      });
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>