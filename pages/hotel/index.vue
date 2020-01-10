<template>
  <div class="contianer">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item>南京市酒店预订</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 存放酒店模块的文件夹 -->
    <div class="searchBar">
      <SearchBar />
    </div>
    <div class="hotelOption">
      <HotelOption />
    </div>
    <div class="hotelSelect">
      <HotelSelect />
    </div>
  </div>
</template>

<script>
// 导入搜索组件
import SearchBar from "@/components/hotel/searchBar.vue";
// 导入地图组件
import HotelOption from "@/components/hotel/hotelOption.vue";
// 导入选择酒店组件
import HotelSelect from "@/components/hotel/hotelSelect.vue";

export default {
  components: {
    SearchBar,
    HotelOption,
    HotelSelect
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.contianer {
  width: 1000px;
  margin: 20px auto;
}
.el-breadcrumb {
  margin: 15px 0;
  // font-size: 20px;
  font-weight: normal;
}
// /deep/.el-breadcrumb__inner.is-link {
//   font-weight: normal !important;
// }
</style>