const { app, BrowserWindow, protocol} = require('electron')
var path = require('path');
var fs = require('fs');

let mainWindow

app.on('ready', async () => {
  await serveFileFromProtocol('bar', path.join(__dirname, 'index.html'));
  await serveFileFromProtocol('foo', path.join(__dirname, 'index.html'));

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nativeWindowOpen: true,
      webviewTag: true,
      // sandbox: true,
      // nodeIntegration: true
    }
  })
  mainWindow.loadFile('app.html');
  // mainWindow.loadURL('http://localhost:9001/index.html');

})

function serveFileFromProtocol(protocolName, filePath) {
  return new Promise((resolve, reject) => {
    protocol.registerBufferProtocol(protocolName, (request, callback) => {
      // Disabled due to false positive in StandardJS
      // eslint-disable-next-line standard/no-callback-literal
      callback({
        mimeType: 'text/html',
        data: fs.readFileSync(filePath)
      })
    }, (error) => {
      if (error != null) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}
