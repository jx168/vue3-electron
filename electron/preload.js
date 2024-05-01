const { contextBridge, ipcRenderer } = require('electron')
/**
 * contextBridge.exposeInMainWorld 的作用就是将主进程（electron端）的某些API注入到渲染进程（vue3端），供渲染进程使用。
 * （主进程并非所有的API或对象都能注入给渲染进程，需要参考文档）
 * 渲染进程通过 window.electronApi 调用  (因为下面代码定义的是：electronApi)
 *
 * 注意，该方法需要在应用层渲染时执行，因此我们刚好可以用到创建窗口中的option.webPreferences.preload来加载该文件
 */

// 目前：统一使用预加载脚本来处理信息。而不使用主进程和渲染进程直接通信。
// 比如，无论是主进程发信息给渲染进程，还是渲染进程发信息给主进程，都是先把信息发给预加载脚本

// 在渲染进程中安全地暴露部分 ElectronAPI
contextBridge.exposeInMainWorld('electronApi', {
  // vue3端页面使用：window.electronApi.sendMessage('Hello from Vue!')
  // electron端使用：ipcMain.on('message', (arg)=> {})
  sendMessage: (message) => {
    ipcRenderer.send('message', message)
  }
})

// 接收来自主进程的消息并将其发送到渲染进程
// electron端使用：win.webContents.send('messageFromMain', 'Hello from main process!');
//  vue3端页面使用：window.addEventListener('message',(e) => {
//   if(e.data && e.data.type === 'messageFromMain') {
//      console.log(e.data.data);
//      }
//   });

// 监听主进程消息：当监听到消息后，当收到消息时，我们使用 window.postMessage() 方法将消息发送到渲染进程
// 在渲染进程中，我们应该使用 window.addEventListener('message'） 来监听这些消息
ipcRenderer.on('messageFromMain', (event, arg) => {
  // *号：意味着消息将发送到任何窗口，无论其来源是否与当前窗口的来源相匹配
  window.postMessage({ type: 'messageFromMain', data: arg }, '*')
})

ipcRenderer.on('messageFromMain2', (event, arg) => {
  // *号：意味着消息将发送到任何窗口，无论其来源是否与当前窗口的来源相匹配
  window.postMessage({ type: 'messageFromMain2', data: arg }, '*')
})

// 告知vue端，跳转到关于页面
ipcRenderer.on('goToAbout', (e, arg) => {
  window.postMessage({ type: 'goToAbout', data: arg }, '*')
})

// 数据库查询到信息：告知vue端
ipcRenderer.on('nedbFind', (e, arg) => {
  window.postMessage({ type: 'nedbFind', data: arg }, '*')
})
