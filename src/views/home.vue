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
    pinia支持：
    {{ counterStore.count }}
    <p @click="piniaClick">点击增加pinia数量</p>
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
import { useCounterStore } from '@/stores/counter'
const router = useRouter()

const msg1 = ref('')
const msg2 = ref('')

const counterStore = useCounterStore()
// console.log(counterStore, '000')

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

function piniaClick() {
  counterStore.increment()
  // counterStore.$dispose() // $dispose 是一个方法，用于在组件销毁时手动释放 Pinia Store 实例。
  // 手动修改状态，将 count 设置为 10
  // counterStore.$patch({ count: 10 }) // $patch 是一个方法，用于手动修改 Pinia Store 实例中的状态。
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
