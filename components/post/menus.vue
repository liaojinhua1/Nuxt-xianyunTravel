<template>
  <div class="left-menus">
    <!-- 鼠标移出整个menus -->
    <div class="menus" @mouseleave="handleleave">
      <!-- 循环生成数据 -->
      <!-- 热门 -->
      <div
        :class="['menus-item',{'avtive': tabs === index?true:false}]"
        v-for="(item, index) in data"
        :key="index"
        @mouseenter="handleenter(index)"
      >
        {{item.type}}
        <i class="el-icon-arrow-right fr"></i>
      </div>

      <!-- 单个索引 每一个生成一次  动态列表数据-->
      <div class="menus-children" v-if="data[tabs]">
        <div class="menus-children-item" v-for="(item, index) in data[tabs].children" :key="index">
          <em>{{index+1}}</em>
          &nbsp;&nbsp;
          <a href="#" class="city">{{item.city}}</a>
          <!-- <nuxt-link :to="`/post?city=${item.city}`">{{item.city}}</nuxt-link> -->
          &nbsp;&nbsp;
          <a href="#" class="desc">{{item.desc}}</a>
        </div>
      </div>
    </div>
    <!-- 推荐 aside-recommend -->
    <div class="aside-recommend">
      <h4 class="aside-title">推荐城市</h4>
      <a href="#" class="aside-recommend-item">
        <!-- <img :src="$axios.defaults.baseURL+'/assets/images/pic_sea.jpeg'" alt=""> -->
        <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt style="width: 100%" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      tabs: "",
      isActive: false     
    };
  },
  methods: {
    handleenter(index) {
      this.isActive = true;
      console.log(this.isActive);
      this.tabs = index;
      console.log(index);
    },
    handleleave(index) {
      this.isActive = false;
      console.log(this.isActive);
      this.tabs = "";
    }
  }
};
</script>

<style lang="less">
.active {
  color: #ffb800 !important;
}
.left-menus {
  .menus {
    width: 100%;
    border: 1px solid #ddd;
    box-shadow: 0 0 1px #f5f5f5;
    position: relative;
    .menus-item {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      line-height: 40px;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      font-size: 14px;
      &:hover {
        color: #ffb800;
      }
      .el-icon-arrow-right {
        line-height: 40px;
        font-size: 20px;
      }
    }
    .menus-children {
      border: 1px solid #ddd;
      z-index: 9999999999999999999999;
      width: 400px;
      height: 240px;
      position: absolute;
      left: 260px;
      top: -1px;
      background: #fff;
      box-shadow: 0 0 1px #f5f5f5;

      a {
        height: 240px/5;
        line-height: 240px/5;
      }
      .city {
        color: #ffb800;
        &:hover {
          text-decoration: underline;
        }
      }
      .desc {
        color: #999;
        &:hover {
          text-decoration: underline;
        }
      }
      em {
        color: #ffb800;
        font-size: 22px;
      }
    }
  }
  .aside-recommend {
    width: 100%;
    margin-top: 20px;
    .aside-title {
      font-weight: 400;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 10px;
    }
  }
}
</style>