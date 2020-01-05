<template>
  <div class="contianer">
  <el-row type="flex" justify="space-between">
    <!-- 侧边栏 -->
    <div class="nav-menus">
      <Menus />
    </div>
    <!-- 顶部过滤列表 -->
    <div class="flights-content"></div>
  </el-row>
  </div>
</template>

<script>
// 导入侧边栏组件
import Menus from "@/components/post/menus.vue";
export default {
  components: {
    Menus
  },
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
  width: 725px;
  font-size: 14px;
}

.nav-menus {
  width: 260px;
}
.el-pagination {
  text-align: center;
}
</style>