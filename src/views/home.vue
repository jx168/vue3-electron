<template>
  <p>vuetify框架的按钮</p>
  <v-btn
    class="mb20"
    append-icon="mdi-account-circle"
    prepend-icon="mdi-check-circle"
  >
    <template #prepend>
      <v-icon color="success"></v-icon>
    </template>
    Button
  </v-btn>

  <p>element-plus框架</p>
  <el-button type="primary">el按钮</el-button>


  <div class="tex mbt10" @click="cli">使用less变量，改变文字颜色</div>

  <div class="fa mb20">
    使用scss变量，改变的
    <p class="son">scss变量文件已配置vite，自动引入</p>
  </div>

  <div class="mb20">
    vue-i18n的支持
    <p class="primary">{{ $t('welcome') }}</p>
  </div>
  <div class="mb20">
    pinia支持：
    {{ counterStore.count }}

    <v-btn @click="piniaClick"> 点击增加pinia数量 </v-btn>
  </div>
  <div class="mb20">
    {{ msg1 }}
  </div>
  <div class="mb20">
    {{ msg2 }}
  </div>
  <div v-show="msg3"> electron端查询数据库得到的数据：{{ msg3 }} </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
const router = useRouter()

const msg1 = ref('')
const msg2 = ref('')
const msg3 = ref('')

const counterStore = useCounterStore()
// console.log(counterStore, '000')

// 渲染进程中
window.addEventListener('message', (e) => {
  if (e?.data?.type === 'messageFromMain') {
    // console.log(e.data.data); // 主进程传来的第一条信息
    msg1.value = e.data.data
  } else if (e?.data?.type === 'messageFromMain2') {
    // console.log(e.data.data); // 主进程传来的第一条信息
    msg2.value = e.data.data
  } else if (e?.data?.type === 'goToAbout') {
    console.log('要跳转关于页面啦+++')
    router.push({ path: '/about' })
  } else if (e?.data?.type === 'nedbFind') {
    console.log('electron端查询数据后得到的信息：', e.data.data)
    msg3.value = e.data.data
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
    // color: blue;
    font-size: 20px;
  }
}
</style>

<style lang="scss" scoped>
.son {
  color: $primary-color;
}
</style>
