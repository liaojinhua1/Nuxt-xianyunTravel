<template>
  <div class="contianer">
    <el-row type="flex" justify="space-between" :gutter="20">
      <!-- 侧边栏 -->
      <el-col :span="6">
        <div class="nav-menus">
          <Menus :data="menusData"/>
        </div>
      </el-col>
      <el-col :span="17">
        <PostMain />
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 导入侧边栏组件
import Menus from "@/components/post/menus.vue";
// 导入主体部分
import PostMain from "@/components/post/postMain.vue";

export default {
  // 注册组件
  components: {
    Menus,
    PostMain
  },
  data() {
    return {
      menusData: [] //侧边导航的城市列表数据
    };
  },
  // 发送请求获取城市列表
  mounted() {
    this.$axios({
      url: "posts/cities"
    }).then(res => {
      this.menusData = res.data.data;
      console.log(this.menusData);
    });
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
  // 侧边栏
  .nav-menus {
    width: 260px;
  }
}
</style>