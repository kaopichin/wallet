import { app, BrowserWindow,Menu,ipcRenderer } from 'electron'
import Vue from 'vue'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`  

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 750,
    useContentSize: true,
    width: 1230 ,
    frame: false ,
    minWidth:995
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null 
  })
  
  
}

app.on('ready', function () {
createWindow()
//const menu = Menu.buildFromTemplate(template)
//Menu.setApplicationMenu(menu)
})

app.commandLine.appendSwitch('ignore-certificate-errors')

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit() 
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  } 
}) 
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
//关闭窗口
import { ipcMain ,shell} from 'electron'
ipcMain.on('window-close',function(){
    mainWindow.close();
})
//最大化
ipcMain.on('window-max',function(){
  if(mainWindow.isMaximized()){
      mainWindow.restore();  
  }else{
      mainWindow.maximize();
  }
  
})
//最小化
ipcMain.on('window-min',function(){
  mainWindow.minimize();
})


