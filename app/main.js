// Main process
const { app, BrowserWindow, ipcMain } = require('electron');

const selectDir = require('./main/select-file.js');
const setProjectManager = require('./main/set-project-manager.js');

global.projectManager = null;

function createWindow() {
  win = new BrowserWindow({
    fullscreen: true,
    minWidth: 1200,
    minHeight: 810,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      webviewTag: true,
    },
  });
  win.loadURL(`file://${__dirname}/templates/index.html`);
  win.webContents.openDevTools();
}

ipcMain.on('selectDir', selectDir);
ipcMain.on('setProjectManager', setProjectManager);

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
