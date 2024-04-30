import { app, BrowserWindow, Menu, ipcMain } from 'electron'
// 在 Node.js 中，path 模块并没有提供 dirname 和 path 的命名导出。相反，你可以将 dirname 作为一个命名导出，path 作为默认导出。
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import Constants from './const'
import { getMenuTemplate } from './menuTemplate'

// 获取当前模块的 URL
const __filename = fileURLToPath(import.meta.url)
// 获取当前模块的目录路径
const __dirname = dirname(__filename)
// 在ES模式中，node里的__dirname变量不可用，需要自己处理

// 退出窗口
const exitWindow = (win) => {
  if (win && !win.isDestroyed()) {
    win.hide() // 显隐藏，防止会看到闪烁
  }
  win.destroy()
  // app.exit()
  app.quit() // 建议使用app.quit()
}

// 创建窗口
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: './icons/200x200.png',
    // type: 'toolbar', // 创建的窗口类型为工具栏窗口
    // frame: false, // 不显示窗口边框和标题栏(设置这个，可以自定义自己喜欢的顶部菜单栏)
    // 加载主进程和渲染进程之间通信的文件
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 生成菜单栏
  const menuList = getMenuTemplate(win)
  const m = Menu.buildFromTemplate(menuList)
  // 这个方法用于设置整个应用程序的菜单，它会影响到所有窗口的菜单栏。
  Menu.setApplicationMenu(m)
  // 这个方法用于设置特定窗口的菜单，它只会影响到调用该方法的那个窗口。
  // win.setMenu(m)

  // 根据运行环境，加载vue3工程
  if (Constants.IS_DEV) {
    win.loadURL(Constants.APP_DEV_URL)
  } else {
    win.loadFile(Constants.APP_PROD_URL)
  }

  // 在窗口触发"ready-to-show"时显示窗口是为了使加载时的白屏时间不被用户看到
  // 'ready-to-show' 事件表示 Electron 主进程已经创建了窗口，但是还没有呈现给用户。
  win.once('ready-to-show', () => {
    win.setAlwaysOnTop(true) // 将窗口设置为始终显示在其他窗口的顶部
    win.show() // 这个方法用于显示窗口。即使窗口之前是隐藏的，调用此方法也会使窗口显示出来。
    win.focus() // 这个方法将焦点设置到窗口，使其成为用户当前与之交互的窗口。通常在显示窗口后调用。
    win.setAlwaysOnTop(false) // 这个方法用于取消将窗口置顶的设置。通过传递 false 参数，窗口将不再置顶。
  })

  // 开发环境，打开F12浏览器调试工具
  win.webContents.on('did-frame-finish-load', () => {
    if (Constants.IS_DEV) {
      win.webContents.openDevTools()
    }
  })

  // 监听从 Vue 渲染进程发来的消息
  ipcMain.on('message', (e, data) => {
    console.log(e, '前端传来的数据:', data)
  })
  setTimeout(() => {
    // 发送信息到预加载脚本，然后传给vue端
    win.webContents.send(
      'messageFromMain',
      '这是electron端传给vue端的第一条信息'
    )
    win.webContents.send('messageFromMain2', '这是另外一条信息')
  }, 4000)

  // 关闭窗口
  win.on('close', (event) => {
    event.preventDefault()
    exitWindow(win)
  })
}

// 总的来说，如果您需要等待一些特殊的初始化操作完成后再执行代码，可以使用 app.whenReady()。而如果您只是需要在应用程序准备就绪后执行一些代码，可以使用 app.on('ready')。
app.whenReady().then(createWindow) // 推荐使用这个
// app.on('ready', createWindow)
