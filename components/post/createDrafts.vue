<template>
  <div class="drafs">
    <h4 class="drafs-title">草稿箱(0)</h4>
    <div class="drafts-list">
      <div class="drafs-item">
        <span class="iconfont el-icon-edit"></span>
        <p>data</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.drafs {
  width: 200px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  padding: 10px;
  .drafs-title {
    margin-bottom: 10px;
    font-weight: 400;
    color: #666;
  }
  .drafts-list {
    .drafs-item {
      margin-bottom: 10px;
      font-size: 14px;
    }
  }
}
</style>