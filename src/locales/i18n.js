import { createI18n } from 'vue-i18n'
import { getCurrentLocale } from '@/utils/utils'

import zh from '@/locales/zh.json'
import en from '@/locales/en.json'

export default createI18n({
  // 是否启用 Vue I18n 的传统模式.当设置为 false 时，将使用 Vue 3 的 Composition API，这是 Vue I18n 的推荐做法。默认值为 false
  legacy: false,
  // 指定当前的语言环境(默认使用中文语言)
  locale: getCurrentLocale(),
  // 备用的语言环境，当无法在当前语言环境下找到相应的翻译时会使用该备用语言环境.
  fallbackLocale: 'en',
  // 是否将 Vue I18n 的实例注入到全局 Vue 实例中。设置为 true 后，在所有的 Vue 组件中都可以通过 this.$i18n 访问到 Vue I18n 的实例
  globalInjection: true,
  messages: {
    zh,
    en
  }
})
