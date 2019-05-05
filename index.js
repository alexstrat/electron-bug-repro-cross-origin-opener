const {app, BrowserWindow} = require('electron')
var StaticServer = require('static-server');
var hostile = require('hostile')

let mainWindow

app.on('ready', async () => {
  var server1 = new StaticServer({
    rootPath: __dirname,
    port: 9001,
  });
  await new Promise(resolve => server1.start(resolve));
  
  // var server2 = new StaticServer({
  //   rootPath: __dirname,
  //   port: 9002,
  // });
  // await new Promise(resolve => server2.start(resolve));

  // To simulate navigation between 2 different domains,
  // using ports (localhost:port1, localhost:port2) did not
  // seem be enough: no render process change happened
  // Instead, we are tweaking host files (using `hostile`)
  // to have 2 totaly different hostnames (host2.local
  // and host1.local) pointing to localhost.
  hostile.set('127.0.0.1', 'host2.local')
  hostile.set('127.0.0.1', 'host1.local')

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