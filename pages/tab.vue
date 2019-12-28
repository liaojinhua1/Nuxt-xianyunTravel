<template>
  <div class="tab">
    <span
      v-for="(item,index) in tabList"      :key="index"      @click="show(index)" :class="{active:index===num}"    >{{item}}&nbsp;&nbsp;&nbsp;
    </span>
    <div v-for="(item,index) in tabList" :key="index">
      <ul v-if="num===index">
        <li>{{item}}新闻1</li>
        <li>{{item}}新闻2</li>
        <li>{{item}}新闻3</li>
      </ul>   
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabList: ["新闻", "体育", "娱乐"],
      num: 0,
    //   isactive: false
    };
  },
  methods: {
    show(index) {
      this.num = index;
    //   this.isactive = true
    }
  }
};
</script>

<style>
.active {
  color: red;
}
</style>