<template>
  <div class="hotelOption">
    <el-row>
      <el-col :span="13" class="content">
        <el-row class="content-details">
          <el-col :span="4">区域：</el-col>
          <el-col :span="20" :class="isShow?'hiden-area':'show-area'">
            <!-- 折叠面板 -->
            <div class="site-link">
              <a href="https://element.eleme.io" target="_blank" class="all a-label">全部</a>
              <a
                href="https://element.eleme.io"
                :key="index"
                class="a-label"
                v-for="(item,index) in placename"
              >{{item}}</a>
            </div>
            <div class="all-site">
              <i
                @click="isShow = !isShow"
                :class="['el-icon-d-arrow-right',isShow?'show-all':'hidden-all']"
              ></i>
              <span>等43个区域</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="content-details">
          <el-col :span="4">攻略：</el-col>
          <el-col :span="20">
            <p
              class="strategy"
            >北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</p>
          </el-col>
        </el-row>
        <el-row class="content-details">
          <el-col :span="4">
            <el-badge value="?" class="item" type="info">
              <el-button size="small" class="average-price">均价</el-button>
            </el-badge>
            <span>&nbsp;&nbsp;：</span>
          </el-col>
          <el-col :span="20">
            <el-row>
              <el-col :span="8">
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <span>￥332</span>
              </el-col>
              <el-col :span="8">
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <span>￥521</span>
              </el-col>
              <el-col :span="8">
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <span>￥768</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="10">
        <div class="hotelmap">
          <!-- 引入搞得地图的js -->
          <script
            type="text/javascript"
            src="https://webapi.amap.com/maps?v=1.4.15&key= 8b733ad1043f10c32268fafe5058fc32&plugin=AMap.Autocomplete,AMap.PlaceSearch"
          ></script>
          <!-- 添加div标签作为地图容器，同时为该div指定id属性  -->
          <div id="container"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 导入地图组件
export default {
  data() {
    return {
      // 存放区域数组
      placename: [
        "镇兴路沿线",
        "镇兴路沿线",
        "镇兴路沿线",
        "镇兴路沿线",
        "镇兴路沿线",
        "镇兴路沿线",
        "视觉艺术学院"
      ],
      start: "",
      isShow: false, //默认不显示,
      value: null //评分
    };
  },
  methods: {
    // 起点位置的下拉列表
    handleKeyword(value, callback) {
      if (!value) {
        callback([]);
        return;
      }
      var autoComplete = new AMap.Autocomplete({ city: "全国" });
      autoComplete.search(value, function(status, result) {
        console.log(result);
        // 搜索成功时，result即是对应的匹配数据
        const data = result.tips.map(v => {
          v.value = v.name;
          return v;
        });
        // 回调函数的参数必须是一个数组，数组的元素必须是一个对象，对象里面必须有value属性
        callback(data);
      });
    }
  },
  mounted() {
    // this.$axios({
    //   url: "/province/search?"
    // });
    // *********** 地图 **********
    // 创建的同时可以给地图设置中心点、级别、显示模式、自定义样式等属性：
    var map = new AMap.Map("container", {
      keyboardEnable: false,
      resizeEnable: true,
      zoom: 13, //级别
      center: [113.427818, 23.12933], //中心点坐标,津安创意园
      viewMode: "3D" //使用3D视图
    });
    var marker1 = new AMap.Marker({
      position: new AMap.LngLat(113.427818, 23.12933),
      //   position: [113.427818, 23.12933], 也可以是经纬度数组
      title: "津安创意园"
    });
    var marker2 = new AMap.Marker({
      position: new AMap.LngLat(120.62, 31.32),
      //   position: [120.62, 31.32], //位置
      title: "苏州市"
    });
    var marker3 = new AMap.Marker({
      position: new AMap.LngLat(118.78, 32.04),
      //   position: [118.78, 32.04], //位置
      title: "南京市"
    });
    // 多个点实例组成的数组
    var markerList = [marker1, marker2, marker3];
    //  将创建的点标记添加到已有的地图实例：
    map.add(markerList); //添加到地图

    //  搜索服务
    // AMap.plugin(["AMap.Autocomplete", "AMap.PlaceSearch"], function() {
    //   var autoOptions = {
    //     city: "北京", //城市，默认全国
    //     input: "keyword" //使用联想输入的input的id
    //   };
    //  var autocomplete = new AMap.Autocomplete(autoOptions);
    //   var placeSearch = new AMap.PlaceSearch({
    //     city: "北京",
    //     map: map
    //   });
    //   AMap.event.addListener(autocomplete, "select", function(e) {
    //     //TODO 针对选中的poi实现自己的功能
    //     placeSearch.setCity(e.poi.adcode);
    //     placeSearch.search(e.poi.name);
    //   });
    // });
  }
};
</script>

<style lang="less" scoped>
.content {
  margin-right: 15px;
}
// 折叠面板
.a-label {
  font-size: 14px;
  margin-right: 1em;
  padding: 0 2px;
  border-radius: 4px;
  display: inline-block;
}
.all {
  color: #999;
  background-color: #eee;
}
// 设置下拉面板的高度
.hiden-area {
  height: 42px;
}
.show-area {
  height: 100px;
}
// 箭头旋转
.show-all {
  -webkit-transform: rotate(270deg);
  transform: rotate(270deg);
  color: #f90;
}
.hidden-all {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  color: #f90;
}
// 皇冠
.iconhuangguan {
  color: #f90;
  font-size: 14px;
}
// 攻略
.strategy {
  width: 100%;
}
// 均价
.average-price {
  border: none;
  padding: 0;
  font-size: 16px;
  color: #000;
  margin: 0 10px 0 0;
}
// 为地图容器指定高度、宽度
#container {
  margin-top: 15px;
  width: 420px;
  height: 260px;
}
.site-link {
  height: 40px;
}
.content-details {
  margin-top: 20px;
}
</style>