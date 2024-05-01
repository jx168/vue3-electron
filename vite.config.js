import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { rmSync } from 'fs'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VitePluginEslint from 'vite-plugin-eslint'
import VitePluginElectron from 'vite-plugin-electron'
import vitePluginVuetify from 'vite-plugin-vuetify'

const isDevEnv = process.env.NODE_ENV === 'development'

export default defineConfig(() => {
  // recursive:递归删除子目录和文件，force:强制删除，即使文件不存在，也不报错
  rmSync('dist', { recursive: true, force: true })

  const electronPluginConfigs = [
    {
      entry: 'electron/main.js',
      // onstart 是 vite-plugin-electron 插件的一个配置选项(提供的一个钩子函数)，用于在启动 Electron 应用程序时执行一些操作
      onstart({ startup }) {
        startup()
      },
      vite: {
        build: {
          assetsDir: '.',
          outDir: 'dist/electron'
        }
      }
    },
    {
      entry: 'electron/preload.js',
      onstart({ reload }) {
        reload()
      },
      vite: {
        build: {
          outDir: 'dist/electron'
        }
      }
    },
    {
      entry: 'electron/const.js',
      vite: {
        build: {
          outDir: 'dist/electron'
        }
      }
    }
  ]
  return {
    resolve: {
      extensions: ['.mjs', '.js', '.less', '.vue', '.json', '.scss'],
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    base: './',
    clearScreen: false,
    build: {
      sourcemap: isDevEnv,
      minify: !isDevEnv,
      outDir: resolve('./dist')
    },
    plugins: [
      Vue(),
      // Docs: https://github.com/vuetifyjs/vuetify-loader
      vitePluginVuetify({
        autoImport: true
      }),
      /**
       * vite-plugin-eslint
       *  实时代码检查： 在开发过程中，即时检查代码，帮助开发者发现潜在的问题或错误。
          自动修复： 支持自动修复一些简单的 ESLint 错误和警告，提高开发效率。
          配置灵活： 可以通过插件选项自定义 ESLint 的配置，以满足项目的具体需求。
          适用于 Vue 项目： 可以与 Vue 项目无缝集成，支持对 Vue 单文件组件中的 JavaScript 和模板代码进行检查。
       */
      // Docs: https://github.com/gxmari007/vite-plugin-eslint
      VitePluginEslint(),
      // Docs: https://github.com/electron-vite/vite-plugin-electron
      VitePluginElectron(electronPluginConfigs)
    ],
    // 该配置，可以使全部的vue文件，都能直接使用less变量，而不需要先引入less文件才使用变量
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${resolve(__dirname, 'src/styles/var.less')}";`
        }
      }
    }
  }
})

// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   },
// })
