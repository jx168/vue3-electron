const { contextBridge, ipcRenderer } = require('electron')

// 在渲染进程中安全地暴露部分 ElectronAPI
contextBridge.exposeInMainWorld('electronApi', {
  // vue3端页面使用：window.electronApi.sendMessage('Hello from Vue!')
  // electron端使用：ipcMain.on('message', (arg)=> {})
  sendMessage: (message) => {
    ipcRenderer.send('message', message)
  }
})


// 在渲染进程中，我们应该使用 window.addEventListener('message'） 来监听这些消息
ipcRenderer.on('messageFromMain', (event, arg) => {
  // *号：意味着消息将发送到任何窗口，无论其来源是否与当前窗口的来源相匹配
  window.postMessage({ type: 'messageFromMain', data: arg }, '*')
})

ipcRenderer.on('messageFromMain2', (event, arg) => {
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
