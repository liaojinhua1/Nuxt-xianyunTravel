<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <!-- 把flightsData传递给子组件 -->
        <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList"/>
        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <!-- :data="item" 把每一项的航班列表信息传递给子组件 -->
        <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
        <!-- 分页组件 -->
        <!-- size-change: 切换每页条数时候触发事件
            current-change: 切换当前页数时候触发的事件
            current-page: 当然显示的页面
        total: 总条数-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
        <!-- :total="total"> -->
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
// 导入过滤组件
import FlightsFilters from "@/components/air/flightsFilters.vue";

export default {
  // 组件注册
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      // 航班总数据
      flightsData: {
        flights: [],
        info: {},
        options: {}
      },
      // 缓存的变量，当该变量一旦被赋值之后不会被修改
      cacheFlightsData: {
        info: {},
        options: {}
      },
      // dataList: [], //  // 存放切割出来数据,航班列表数据，用于循环flightsItem组件，单独出来是因为要分页
      pageSize: 5, // 每页显示条目个数,设置默认值为5
      pageIndex: 1, //当前页数，设置默认为1
      total: 0 // 符合条件的总数据数
    };
  },
  computed: {
    // 计算属性监听函数内部引用实例的属性变化，一旦发生了变化，该函数会重新计算，并且返回新的值
    dataList() {
      // 请求如果还没完成，返回空数组
      if (!this.flightsData.flights) return [];
      // 计算分页的数据
      return this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    }
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
        console.log(this.flightsData);
        // 给缓存变量赋值
        this.cacheFlightsData = {...res.data}
        // 总条数
        this.total = this.flightsData.total;
      });
    },
    // 给过滤的组件修改this.flightsData.flights
    setDataList(arr) {
      console.log(arr);
      // arr 就是过滤后的符合条件的数据
      this.flightsData.flights = arr;
      // 修改总条数
      this.total = arr.length;
    },  
    // 切换每页条数时候触发事件
    handleSizeChange(val) {
      this.pageSize = val;
      // this.setDataList();
    },
    // 切换当前页数时候触发的事件
    handleCurrentChange(val) {
      this.pageIndex = val;
      // this.setDataList();
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
.el-pagination {
  text-align: center;
}
</style>