// 定义一些常量

import { join, dirname } from 'path'
import { name, version } from '../package.json'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

export default class Constants {
  static APP_NAME = name.toUpperCase()
  static APP_VERSION = version
  // 是否开发环境
  static IS_DEV = process.env.NODE_ENV === 'development'
  // 是否苹果电脑系统
  static IS_MAC_SYSTEM = process.platform === 'darwin'

  // 开发与生产环境，electron加载vue3工程的路径
  static APP_DEV_URL = 'http://localhost:5173'
  static APP_PROD_URL = join(__dirname, '../index.html')

  static __dirname = __dirname
}
