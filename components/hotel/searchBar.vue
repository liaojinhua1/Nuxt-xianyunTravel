<template>
  <div class="searchBar">
    <el-row>
      <!-- 输入后匹配建议文本框
      fetch-suggestions	返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它
      select	选中 input 中的文字
      trigger-on-focus	是否在输入框 focus 时显示建议列表
      -->
      <el-col :span="5.2" style="margin-right:10px">
        <el-autocomplete
          class="inline-input"
          v-model="cityName"
          :fetch-suggestions="queryCitySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          @select="handleCitySelect"
        ></el-autocomplete>
      </el-col>
      <el-col :span="8.8" style="margin-right:10px">
        <!-- 日期选择器 data        -->
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="入住日期"
          end-placeholder="离店日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="5" style="margin-right:10px">
        <!-- 选择人数 -->
        <el-popover placement="bottom" width="326" :visible-arrow="false" trigger="click">
          <div class="select">
            <el-row>
              <el-col :span="9">
                <span style="padding-top:2px;text-align: left; margin: 0;">每间</span>
              </el-col>
              <!-- v-model的值为当前被选中的el-option的 value 属性值
         change	选中值发生变化时触发	目前的选中值
              -->
              <div style="text-align: right; margin:0">
                <el-col :span="7" style="margin-right:12px">
                  <el-select v-model="value" placeholder="2成人" size="mini">
                    <el-option
                      v-for="item in adult"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      @change="personSelected"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="7">
                  <el-select v-model="value" placeholder="0儿童" size="mini">
                    <el-option
                      v-for="item in children"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      @change="personSelected"
                    ></el-option>
                  </el-select>
                </el-col>
              </div>
            </el-row>
          </div>
          <div style="text-align: right; margin: 0">
            <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
          </div>
          <el-input slot="reference" placeholder="人数未定" suffix-icon="el-icon-user"></el-input>
        </el-popover>
      </el-col>
      <el-col :span="5">
        <!-- 查看价格 -->
        <el-button type="primary">查看价格</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityName: "",
      // 酒店城市的下拉列表数据
      citytData: [],
      date: "", // 时间
      value: "",
      adult: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        }
      ], // 成年人
      children: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        }
      ], // 儿童
      hotelsCondition: {
        // id:0, //酒店id(酒店详情)
        city: 74, //城市id
        // price_in:0, //酒店价格
        // scenic:0, //景点id
        // name_contains:'', //名字模糊查询
        // hotellevel:0,    //酒店星级
        // hoteltype:0,     //酒店类型
        // hotelbrand:0,   //酒店品牌
        // hotelasset:0,   //酒店设施
        // enterTime:2018-11-11,    // 入店时间
        // leftTime:2018-11-11,      //离开时间
        person: 0 //人数
        // _sort:'',     //排序
        // _limit:0,       //条数
        // _start:0    //开始数据（分页
      }
    };
  },
  methods: {
    // 监听出发城市的输入时候触发的事件
    // 出发城市---返回输入建议的方法
    // value是输入框的值
    // cb是回调函数, 调用时候展示下拉列表，注意参数必须是数组，数组中元素必须是对象，对象中必须包含value属性
    queryCitySearch(value, callback) {
      if (value.trim() === "") {
        callback([]);
        return;
      }
      //   根据输入框的value值发送请求
    },
    // 到达城市---点击选中建议项时触发
    handleCitySelect(item) {
      this.cityName = item;
    },
    // 输入框失去焦点时，触发
    handleDestChange() {
      if (this.citytData.length > 0) {
        this.cityName = this.citytData[0].value;
      }
    },
    // change	选中值发生变化时触发	目前的选中值
    personSelected() {}
  }
};
</script>

<style lang="less" scoped>

.select {
  height: 60px;
  padding-top: 20px;
  // text-align: center;
  border-bottom: 1px solid #dcdfe6;
  margin-bottom: 20px;
}
</style>