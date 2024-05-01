module.exports = {
  appId: 'com.xiaoluo.electron-app',
  productName: '番茄小说下载',
  asar: true,
  directories: {
    output: 'dist'
  },
  // eslint-disable-next-line no-template-curly-in-string
  artifactName: '${productName}_${version}_${os}_${arch}.${ext}',
  // 指定打包时所需要打包的文件夹
  // files: ['electron/**/*', 'src/**/*', 'dist/**/*'],
  files: ['dist/**/*'],
  nsis: {
    // 是否启用一键安装模式
    oneClick: false,
    // 是否允许提升权限进行安装
    allowElevation: true,
    // 是否允许用户更改安装目录
    allowToChangeInstallationDirectory: true,
    // 安装程序的图标文件路径
    installerIcon: '../electron/icons/vuelectron.ico',
    // 卸载程序的图标文件路径
    uninstallerIcon: '../electron/icons/vuelectron.ico',
    // 安装程序的头部图标文件路径
    installerHeaderIcon: '../electron/icons/200x200.png',
    // 是否在桌面上创建快捷方式
    createDesktopShortcut: true,
    // 是否在开始菜单中创建快捷方式
    createStartMenuShortcut: true,
    // 创建的快捷方式的名称
    shortcutName: '番茄小说下载',
    // 卸载时删除用户数据
    deleteAppDataOnUninstall: true
  },
  win: {
    // 指定应用程序的图标文件路径
    icon: '../electron/icons/vuelectron.ico',
    target: [
      {
        target: 'nsis',
        arch: ['x64']
      }
    ]
  },
  linux: {
    target: [
      {
        target: 'AppImage',
        arch: ['x64']
      }
    ]
  },
  mac: {
    target: [
      {
        target: 'dmg',
        arch: ['x64']
      }
    ]
  }
  // 指定预先下载的 Electron 包的路径。
  // 由于打包时需要使用electron的相关包文件，为了提高打包速度，我们一般会提前下载与我们node_modules相同版本的.zip包，然后打包时使用electronDist指定打包用的文件目录，可以缩减打包时间
  // electronDist: "../lib"
}
