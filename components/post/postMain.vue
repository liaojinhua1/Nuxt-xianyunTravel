<template>
  <div class="posts-main">
    <!-- 输入框 -->
    <el-input
      placeholder="请输入地名"
      suffix-icon="el-icon-search"
      v-model="searchCity"
      class="search-bar"
    ></el-input>
    <!-- 推荐 -->
    <div class="search-recommend">
      <span>推荐：</span>
      <a href="#" v-for="(item) in ['广州','上海','北京']" :key="item">{{item}}</a>
    </div>
    <!-- 推荐攻略头部 -->
    <el-row class="post-title" type="flex" justify="space-between">
      <h4>推荐攻略</h4>
      <el-button type="primary" icon="el-icon-edit">写游记</el-button>
    </el-row>
    <!-- 文章列表 -->
    <div class="post-item" v-for="(item,index) in dataListComputed" :key="index">
      <!-- 显示三张图片，images.length>=3 -->
      <div v-if="item.images.length>=3">
        <!-- href="/post/detail?id=4" -->
        <h4 class="post-item-title" @click="$router.push(`/post/detail?id=${item.id}`)">
          <a>{{item.title}}</a>
        </h4>
        <p class="post-item-summary" @click="$router.push(`/post/detail?id=${item.id}`)">
          <a>{{item.summary}}</a>
        </p>
        <el-row
          class="post-item-img"
          type="flex"
          justify="space-between"
          @click="$router.push(`/post/detail?id=${item.id}`)"
        >
          <a v-for="(imgList,index) in item.images.slice(0,3)" :key="index">
            <img :src="imgList" />
          </a>
        </el-row>

        <!--用户信息 -->
        <el-row class="post-item-info" type="flex" justify="space-between">
          <el-row class="post-item-info-left" type="flex" justify="space-between">
            <span>
              <i class="el-icon-location-outline"></i>
              {{item.cityName}}
            </span>
            <el-row class="post-item-user" type="flex" align="middle">
              by
              <a href="#">
                <img :src="$axios.defaults.baseURL + item.account.defaultAvatar" alt />
              </a>
              <a href="#">{{item.account.nickname}}</a>
            </el-row>
            <span>
              <i class="el-icon-view"></i>
              {{item.watch}}
            </span>
          </el-row>
          <el-row
            class="post-item-info-right"
            type="flex"
            justify="space-between"
          >{{item.like || 0}}&nbsp;赞</el-row>
        </el-row>
      </div>

      <!-- 显示一张图片，0<images.length<3 -->
      <div v-if="item.images.length<3  && item.images.length>0">
        <el-row type="flex" justify="space-between">
          <!-- 图片 -->
          <div class="post-item-cover" @click="$router.push(`/post/detail?id=${item.id}`)">
            <a>
              <img :src="item.images[0]" alt />
            </a>
          </div>
          <div class="post-item-content" @click="$router.push(`/post/detail?id=${item.id}`)">
            <h4 class="post-item-title">
              <a>{{item.title}}</a>
            </h4>
            <p class="post-item-summary" @click="$router.push(`/post/detail?id=${item.id}`)">
              <a>{{item.summary}}</a>
            </p>
            <!--用户信息 -->
            <el-row class="post-item-info" type="flex" justify="space-between">
              <el-row class="post-item-info-left" type="flex" justify="space-between">
                <span>
                  <i class="el-icon-location-outline"></i>
                  {{item.cityName}}
                </span>
                <el-row class="post-item-user" type="flex" align="middle">
                  by
                  <a href="#">
                    <img :src="$axios.defaults.baseURL + item.account.defaultAvatar" alt />
                  </a>
                  <a href="#">{{item.account.nickname}}</a>
                </el-row>
                <span>
                  <i class="el-icon-view"></i>
                  {{item.watch}}
                </span>
              </el-row>
              <el-row
                class="post-item-info-right"
                type="flex"
                justify="space-between"
              >{{item.like || 0}}&nbsp;赞</el-row>
            </el-row>
          </div>
        </el-row>
      </div>
      <!-- 没有图片，images<0 -->
      <div v-if="item.images.length<0">
        <h4 class="post-item-title" @click="$router.push(`/post/detail?id=${item.id}`)">
          <a>{{item.title}}</a>
        </h4>
        <p class="post-item-summary" @click="$router.push(`/post/detail?id=${item.id}`)">
          <a>{{item.summary}}</a>
        </p>
        <!-- 用户信息 -->
        <el-row class="post-item-info" type="flex" justify="space-between">
          <el-row class="post-item-info-left" type="flex" justify="space-between">
            <span>
              <i class="el-icon-location-outline"></i>
              {{item.cityName}}
            </span>
            <el-row class="post-item-user" type="flex" align="middle">
              by
              <a href="#">
                <img :src="$axios.defaults.baseURL + item.account.defaultAvatar" alt />
              </a>
              <a href="#">{{item.account.nickname}}</a>
            </el-row>
            <span>
              <i class="el-icon-view"></i>
              {{item.watch}}
            </span>
          </el-row>
          <el-row
            class="post-item-info-right"
            type="flex"
            justify="space-between"
          >{{item.like || 0}}&nbsp;赞</el-row>
        </el-row>
      </div>
    </div>
    <!-- 分页 -->
    <el-row type="flex" justify="center" class="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[3,5,10,15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchCity: "", // 输入框中的输入地点名
      postList: [], //文章列表
      pageIndex: 1, //当前页数
      pageSize: 3, // 每页显示文章的条数
      total: 0 //文章的总数
    };
  },
  mounted() {
    this.getPostList();
  },
  computed: {
    // 计算属性监听函数内部引用实例的属性变化，一旦发生了变化，该函数会重新计算，并且返回新的值
    dataListComputed() {
      // 请求如果还没完成，返回空数组
      if (!this.postList) return [];
      // 计算分页的数据,使用slice分割数组---包含从 start 到 end （不包括该元素）的 arrayObject 中的元素
      // (0,2)  (3,5)  (6,8)  3个 this.pageSize
      // 1        2       3
      return this.postList.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    }
  },
  methods: {
    //   获取文章列表
    getPostList() {
      this.$axios({
        url: "posts"
      }).then(res => {
        this.postList = res.data.data;
        // 文章总数量
        this.total = this.postList.length;
        console.log(this.postList);
      });
    },
    //   每页显示的文章条数改变时触发
    handleSizeChange(value) {
      console.log(value);
      this.pageSize = value;
    },
    //   改变当前页时触发
    handleCurrentChange(value) {
      this.pageIndex = value;
    }
  }
};
</script>

<style lang="less" scoped>
.posts-main {
  a {
    cursor: pointer;
  }
  // 输入框
  .search-bar {
    width: 100%;
    box-sizing: border-box;
    height: 46px;
    line-height: 40px;
    border: 3px solid orange;
    /deep/input {
      flex: 1;
      padding: 0 20px;
      line-height: 40px;
      outline: none;
      border: none;
      background: none;
    }
    /deep/i {
      font-size: 24px;
      color: orange;
      font-weight: 700;
      margin-right: 10px;
    }
  }
  // 推荐
  .search-recommend {
    padding: 10px 0;
    font-size: 12px;
    color: #666;
    a {
      margin: 0 5px 0 0;
      &:hover {
        text-decoration: underline;
        color: orange;
      }
    }
  }
  // 攻略头部
  .post-title {
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    h4 {
      line-height: 40px;
      font-weight: 400;
      font-size: 18px;
      color: orange;
      &::after {
        display: block;
        content: "";
        width: 72px;
        height: 2px;
        background: orange;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }
  //   文章详情列表
  .post-item {
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    // 标题
    .post-item-title {
      cursor: pointer;
      font-size: 18px;
      font-weight: 400;
      margin-bottom: 15px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &:hover {
        color: orange;
      }
    }
    // 文章文字内容
    .post-item-summary {
      height: 63px;
      color: #666;
      cursor: pointer;
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 15px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      text-overflow: ellipsis;
    }
    // 图片
    .post-item-img {
      margin: 15px 0;
      img {
        width: 220px;
        height: 150px;
        display: block;
        object-fit: cover;
        -o-object-fit: cover;
      }
    }
    // 用户信息
    .post-item-info {
      .post-item-info-left {
        color: #999;
        font-size: 12px;
        span {
          margin-right: 10px;
          line-height: 26px;
        }
        .post-item-user {
          margin-right: 10px;
          img {
            display: block;
            width: 16px;
            height: 16px;
            border-radius: 100px;
            margin: 5px;
          }
          a {
            color: orange;
          }
        }
      }
      .post-item-info-right {
        color: orange;
      }
    }
    .post-item-content {
      width: 470px;
    }
    .post-item-cover {
      width: 220px;
      height: 150px;
      overflow: hidden;
      flex-shrink: 0;
      margin-right: 10px;
      img {
        display: block;
        width: 100%;
        height: 100%;
        -o-object-fit: cover;
        object-fit: cover;
      }
    }
  }
  //   分页
  .paging {
    margin-top: 10px;
  }
}
</style>