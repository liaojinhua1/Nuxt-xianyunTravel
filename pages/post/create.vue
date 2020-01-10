<template>
  <div class="create-container">
    <el-row :gutter="50">
      <el-col :span="18" class="main">
        <h2>发表新攻略</h2>
        <p class="create-desc">分享你的个人游记，让更多人看到哦！</p>
        <!-- 表单 -->
        <el-form ref="strategForm" :model="strategForm">
          <!-- 标题 -->
          <el-form-item>
            <el-input v-model="strategForm.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <!-- 富文本编辑器 -->
          <el-form-item>
            <VueEditor :config="config" ref="vueEditor" />
          </el-form-item>
          <!-- 选择城市 -->
          <el-form-item label="选择城市" label-width="80px">
            <el-input style="width:202px" v-model="strategForm.city" placeholder="请搜索游玩城市"></el-input>
          </el-form-item>
        </el-form>
        <!-- 发表或者保存到草稿箱 -->
        <div class="create-button">
          <el-button type="primary" size="small">发布</el-button>
          <span class="submit-side">
            或者
            <a href="javascript:;">保存到草稿箱</a>
          </span>
        </div>
      </el-col>
      <el-col :span="4">
        <CreateDrafts />
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 导入草稿箱
import CreateDrafts from "@/components/post/createDrafts.vue";

// 导入富文本编辑器
import "quill/dist/quill.snow.css";
import VueEditor from "vue-word-editor";
export default {
  components: {
    VueEditor,
    CreateDrafts
  },
  data() {
    return {
      // 攻略表单数据
      strategForm: {
        title: "", //标题
        city: "" //城市
      },
      //   富文本编辑器
      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://localhost:1337/upload",
          name: "file",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data.url);
          }
        },
        // 上传视频的配置
        uploadVideo: {
          url: "http://localhost:1337/upload",
          name: "file",
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data.url);
          }
        },
        // 配置富文本编辑器需要的功能，不配置则会显示全部
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["image"],
            // ['header'],
            ["video"]
          ]
        }
      }
    };
  }
};
</script>

<style lang="less" scoped>
.create-container {
  width: 1000px;
  margin: 20px auto;
  .main {
    h2 {
      font-weight: 400;
      font-size: 22px;
      margin-bottom: 10px;
    }
    .create-desc {
      font-size: 12px;
      color: #999;
      margin-bottom: 10px;
    }
    /deep/.ql-editor {
      height: 400px;
      img {
        width: 100px;
      }
    }
    .create-button {
      .submit-side {
        margin-left: 10px;
        font-size: 14px;
        a {
          color: orange;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  //    width: 260px;
}
</style>