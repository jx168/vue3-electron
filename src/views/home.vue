<template>
  <div class="tex" @click="cli">12--asda阿斯达-5652321</div>
  <div class="fa">
    阿萨德
    <p class="son">阿斯达</p>
  </div>
  <div>
    vue-i18n的支持
    <p class="primary">{{ $t('welcome') }}</p>
  </div>
  <div>
    {{ msg1 }}
  </div>
  <div>
    {{ msg2 }}
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const msg1 = ref('')
const msg2 = ref('')

// 渲染进程中
window.addEventListener('message', (e) => {
  console.log(e, '0000')
  if (e?.data?.type === 'messageFromMain') {
    // console.log(e.data.data); // 主进程传来的第一条信息
    msg1.value = e.data.data
  } else if (e?.data?.type === 'messageFromMain2') {
    // console.log(e.data.data); // 主进程传来的第一条信息
    msg2.value = e.data.data
  } else if (e?.data?.type === 'goToAbout') {
    console.log('要跳转关于页面啦+++')
    router.push({ path: '/about' })
  }
})

function cli() {
  console.log(window.electronApi)
  // 调用预加载的 Electron API 发送消息给主进程
  window.electronApi.sendMessage('我是前端传来的数据')
}
</script>
<style lang="less" scoped>
.tex {
  color: @info-color;
}
.fa {
  color: red;
  .son {
    color: blue;
  }
}
</style>
