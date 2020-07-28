// Main process
const { app, BrowserWindow, Menu, ipcMain, globalShortcut } = require('electron')

const menu = require('./main/menu.js')
const selectDir = require('./main/select-file.js')
const setProjectManager = require('./main/set-project-manager.js')

global.projectManager = null

function createWindow () {
  win = new BrowserWindow({
    width: 1440,
    height: 810,
    minWidth: 640,
    minHeight: 360,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      webviewTag: true
    }
  })
  win.loadURL(`file://${__dirname}/templates/index.html`)
  win.webContents.openDevTools()
}

ipcMain.on('selectDir', selectDir)
ipcMain.on('setProjectManager', setProjectManager)
ipcMain.on('hotkeySetting',function(event,labelID, hotKey){
  console.log(labelID)
  console.log(hotKey)
  globalShortcut.register(hotKey, () => {
        console.log('HIHI')
  })
})

app.on('ready', () => {
  createWindow()
  Menu.setApplicationMenu(menu)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

