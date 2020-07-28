
// const electron = require('electron')
const BrowserWindow = remote.BrowserWindow
const { ipcMain } = remote.ipcMain

function createVirtualWindow() {
    /* Your setup code here */
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        show: false,
        webPreferences:{
            nodeIntegration : true
        }
    })

    mainWindow.loadURL(`file://${__dirname}/keyboard.html`)
    mainWindow.webContents.setFrameRate(30)

    mainWindow.show()
    mainWindow.webContents.openDevTools()
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}
$('#keyboard').on('click', () => {
    createVirtualWindow();
  }) 
