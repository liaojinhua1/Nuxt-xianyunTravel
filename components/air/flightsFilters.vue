<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data
        .info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <!-- label：下拉列表显示的数据 
          value：触发handleAirport时，选择下拉列表中的数据时的值-->
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            v-for="(item,index) in sizeOptions"
            :key="index"
            :label="item.name"
            :value="item.plane_size"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //   接收父组件传递过来的航班总数据
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      //   机型大小的数组对象
      sizeOptions: [
        { name: "大", plane_size: "L" },
        { name: "中", plane_size: "M" },
        { name: "小", plane_size: "S" }
      ]
    };
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      const arr = this.data.flights.filter(v => {
        return value === v.org_airport_name;
      });
      console.log(arr);
      // 触发父组件的修改dataList的函数
      this.$emit("setDataList", arr);
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      //   console.log(value); //6,12
      //   使用解构取出 from 和 to
      const [from, to] = value.split(",");
        console.log(from, to);
      const arr = this.data.flights.filter(v => {
        //   获取当前的 dep_time （出发时间） 的时，并转换为数值型
        const start = +v.dep_time.split(":")[0];
        console.log(start);
        return start >= from && start < to;
      });
      // 触发父组件的修改dataList的函数
      this.$emit("setDataList", arr);
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      //   console.log(value);
      //   filter 会把符合条件的数据筛选出来，返回一个新的数组
      const arr = this.data.flights.filter(v => {
        return value === v.airline_name;
      });
      // 触发父组件的修改dataList的函数
      this.$emit("setDataList", arr);
    },

    // 选择机型时候触发
    handleAirSize(value) {
      console.log(value);
      const arr = this.data.flights.filter(v => {
        return value === v.plane_size;
      });
      //   触发父组件的修改dataList的函数
      this.$emit("setDataList", arr);
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
        this.airport = "", 
        this.flightTimes = "",
        this.company = "", 
        this.airSize =""
        //   触发父组件的修改dataList的函数
      this.$emit("setDataList", this.data.flights);
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>