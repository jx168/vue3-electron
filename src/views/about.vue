<template>
  <div class="about-warp">
    关于本项目：
    <p
      >项目已经集成了：vite，vue3，vue-router，pinia，electron，eslint，pretter，lint-staged，vue-i18n，normalize.css，css预处理器less，UI框架vuetify，内嵌式数据库nedb，UI框架element-plus，css预处理器sass，</p
    >
    <p class="mbt10">后续还会加入：数据库sqlite3</p>

    <!-- <p class="text" >返回</p> -->
    <v-btn @click="goBack">返回</v-btn>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goBack() {
  router.push({ path: '/' })
}
</script>
<style lang="less" scoped>
.about-warp {
  margin: 30px;
  .text {
    color: orangered;
  }
}
</style>
