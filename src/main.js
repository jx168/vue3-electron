import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from '@/locales/i18n'
import '@/styles/common.less'
import vuetify from '@/vuetify/vuetifyConfig'

const app = createApp(App)

app.use(createPinia())
.use(router)
.use(i18n)
.use(vuetify)

app.mount('#app')
