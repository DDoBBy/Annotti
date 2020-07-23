const VirtualKeyboard = require('electron-virtual-keyboard');
const electron = require('electron')
const BrowserWindow = electron.remote.BrowserWindow

let vkb; // keep virtual keyboard reference around to reuse.
function createWindow() {
    /* Your setup code here */
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        backgroundColor: '#000000',
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
    vkb = new VirtualKeyboard(window.webContents);
}

$('#keyboard').on('click', () => {
    createWindow();
  }) 