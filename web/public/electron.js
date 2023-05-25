const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

app.whenReady().then(createWindow);
app.on('window-all-closed', onClose);
app.on('activate', onActivate);

function onActivate() {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
}

function onClose() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
}

function createWindow() {
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true,
  });

  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL(startUrl);

  app.on('window-all-closed', onClose);
}