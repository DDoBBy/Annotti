// Main process
const { app, BrowserWindow, Menu, ipcMain, remote } = require('electron')
const appMenu = require('./main/menu.js')
const selectDir = require('./main/select-file.js')

global.workingDirectory = "None"

function createWindow () {
  win = new BrowserWindow({
    width: 1440,
    height: 810,
    minWidth: 640,
    minHeight: 360,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true
    }
  })
  win.loadURL(`file://${__dirname}/templates/index.html`)
  win.webContents.openDevTools()
}

ipcMain.on('selectDir', selectDir)

app.on('ready', () => {
  createWindow()
  Menu.setApplicationMenu(appMenu)
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

