// import { createRouter, createWebHistory } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // 需要使用hash路由，不然打包生产环境时，启动electron白屏
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(), // 使用 hash 模式
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about.vue')
    }
  ]
})

export default router
