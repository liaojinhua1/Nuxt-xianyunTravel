<template>
  <div class="menus">
    <div class="menus-body">
      <!-- collapse-transition :collapse-transition="true" 展开时是否有动画 -->
      <el-menu
        :default-active="activeIndex"
        class="el-menu"
        mode="horizontal "
        @select="handleSelect"
        :collapse="true"
        text-color="#000"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title" class="active">san</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-1">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">san</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
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

<style lang="less" scoped>
.active {
  border-right-color: #fff !important;
  color: orange !important;
}
/deep/.el-icon-arrow-right:before {
  content: "";
}
/deep/.el-menu--collapse
  > .el-submenu
  > .el-submenu__title
  .el-submenu__icon-arrow {
  display: block !important;
  // content: "";
  width: 10px;
  height: 10px;
  border-right: 1px solid #999;
  border-top: 1px solid #999;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  right: 20px;
  // top: 15px;
}
.el-menu {
  border-right: none;
}
/deep/.el-menu--collapse {
  width: 260px;
  border: 1px solid #ddd;
  border-right: none;
  border-bottom: none;
  box-shadow: 0 0 1px #f5f5f5;
  //     z-index: 2;
}
/deep/.el-submenu__title {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  padding: 0 20px;
  font-size: 14px;
  position: relative;
  // z-index: 2;
}
.el-menu--collapse .el-submenu {
  position: relative;
  width: 260px;
  //     z-index: 2;
}

// .menus-wrapper .menu-item[data-v-053600ae]:after {
//     display: block;
//     content: "";
//     width: 10px;
//     height: 10px;
//     border-right: 1px solid #999;
//     border-top: 1px solid #999;
//     -webkit-transform: rotate(45deg);
//     transform: rotate(45deg);
//     position: absolute;
//     right: 20px;
//     top: 15px;
// }

// 箭头
// .menus-wrapper .menu-item[data-v-053600ae]:after {
//     display: block;

// }
</style>