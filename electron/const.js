// 定义一些常量

import { join, dirname } from 'path'
import { name, version } from '../package.json'
import { fileURLToPath } from 'url'

/**
 *在 CommonJS 模块中，可以直接使用 __dirname 来获取当前模块的所在目录的绝对路径，但是在 ES 模块中，__dirname 变量不可用。因此，我们需要借助一些 Node.js 提供的 API 来获取当前模块的所在目录的绝对路径。

在 ES 模块中，可以使用 import.meta.url 获取当前模块的 URL。然后，可以使用 url 模块的 fileURLToPath 方法将 URL 转换为文件路径，并传递给 dirname 函数获取所在目录的绝对路径
 */
const __dirname = dirname(fileURLToPath(import.meta.url))

export default class Constants {
  // static APP_NAME = name.charAt(0).toUpperCase() + name.slice(1)
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
