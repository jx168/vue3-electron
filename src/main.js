import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from '@/locales/i18n'
// 这里想用less或者scss，自己决定
import '@/styles/common.less'
// import '@/styles/common-scss.scss'
import vuetify from '@/vuetify/vuetifyConfig'

const app = createApp(App)

app.use(createPinia()).use(router).use(i18n).use(vuetify)

app.mount('#app')
