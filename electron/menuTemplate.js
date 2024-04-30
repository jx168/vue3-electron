// 应用程序菜单栏

import { app } from 'electron'

// win: 窗口实例
export function getMenuTemplate(win) {
  return [
    {
      label: '文件',
      submenu: [
        {
          label: '退出',
          accelerator: 'ctrl+q',
          click: () => {
            // app.quit() 方法会尝试安全地退出应用程序，它会触发 before-quit 事件和 will-quit 事件，并且会等待所有窗口都关闭后再退出应用程序。
            app.quit()

            // app.exit() 方法会立即退出应用程序，它不会等待窗口关闭，也不会触发 before-quit 和 will-quit 事件。不管是否有窗口还在运行。这可能会导致一些未完成的操作或者资源泄漏。
            // app.exit()
          }
        }
      ]
    },
    {
      label: '关于',
      accelerator: 'ctrl+1',
      click: () => {
        // 告知vue端，跳转到关于页面
        win.webContents.send('goToAbout')
      }
      // submenu:[]
    }
  ]
}
