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
        <el-select size="mini" v-model="airport" placeholder="起飞机场">
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
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间">
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司">
          <el-option
            v-for="(item,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型">
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
    <!-- 随便调用为了函数可以执行 -->
    <span>{{filterData}}</span>
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
  computed: {
    // 用于监听选项的变化，返回过滤后符合条件的数组，返回给父组件
    filterData() {
      const arr = this.data.flights.filter(item => {
        // 默认每条数据都是符合条件
        let valid = true;
        // 当输入框的数据与传递过来的数据的  机场  相等时，才将数据返回给父组件
        if (this.airport && item.org_airport_name !== this.airport) {
          valid = false;
        }

        // 当输入框的数据与传递过来的数据的  时间  相等时，才将数据返回给父组件
        if (this.flightTimes && item.dep_time !== this.flightTimes) {
          //   使用解构取出 from 和 to
          const [from, to] = this.flightTimes.split(",");
          //   获取当前的 dep_time （出发时间） 的时，并转换为数值型
          const start = +item.dep_time.split(":")[0];
          console.log(start);
          if (start < from || start >= to) {
            valid = false;
          }
        }

        // 当输入框的数据与传递过来的数据的  航空公司  相等时，才将数据返回给父组件
        if (this.company && item.airline_name !== this.company) {
          valid = false;
        }

        // 当输入框的数据与传递过来的数据的  机型  相等时，才将数据返回给父组件
        if (this.airSize && item.plane_size !== this.airSize) {
          valid = false;
        }
        return valid;
      });
      // 触发父组件的修改dataList的函数
      this.$emit("setDataList", arr);
      return "";
    }
  },
  methods: {
    // // 选择机场时候触发
    // handleAirport(value) {
    //   const arr = this.data.flights.filter(v => {
    //     return value === v.org_airport_name;
    //   });
    //   console.log(arr);
    //   // 触发父组件的修改dataList的函数
    //   this.$emit("setDataList", arr);
    // },

    // // 选择出发时间时候触发
    // handleFlightTimes(value) {
    //   //   console.log(value); //6,12
    //   //   使用解构取出 from 和 to
    //   const [from, to] = value.split(",");
    //   console.log(from, to);
    //   const arr = this.data.flights.filter(v => {
    //     //   获取当前的 dep_time （出发时间） 的时，并转换为数值型
    //     const start = +v.dep_time.split(":")[0];
    //     console.log(start);
    //     return start >= from && start < to;
    //   });
    //   // 触发父组件的修改dataList的函数
    //   this.$emit("setDataList", arr);
    // },

    // // 选择航空公司时候触发
    // handleCompany(value) {
    //   //   console.log(value);
    //   //   filter 会把符合条件的数据筛选出来，返回一个新的数组
    //   const arr = this.data.flights.filter(v => {
    //     return value === v.airline_name;
    //   });
    //   // 触发父组件的修改dataList的函数
    //   this.$emit("setDataList", arr);
    // },

    // // 选择机型时候触发
    // handleAirSize(value) {
    //   console.log(value);
    //   const arr = this.data.flights.filter(v => {
    //     return value === v.plane_size;
    //   });
    //   //   触发父组件的修改dataList的函数
    //   this.$emit("setDataList", arr);
    // },

    // 撤销条件时候触发
    handleFiltersCancel() {
      (this.airport = ""),
        (this.flightTimes = ""),
        (this.company = ""),
        (this.airSize = "");
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