const { app, BrowserWindow, Menu, Tray } = require('electron');

const isDev = process.env.NODE_ENV === 'dev';

let win;

let tray = null
function createWindow() {
    tray = new Tray('./src/icon/512x512.png');
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)

    // app.getPath('userData');
    // win.loadFile('./src/index.html');
    
    win = new BrowserWindow({
        width: 1000,
        height: 750,
        webPreferences: {
            nodeIntegration: true
        }
    });

    const url = isDev ?
    'http://localhost:3000/' :
    `file://${path.join(__dirname, '../build/index.html')}`;

    win.loadURL(url);
    win.setAutoHideMenuBar(true);
    win.removeMenu();

    win.on('closed', (e) => {
        // if (!isQuiting) {
            console.log("CLOSED")
            // e.preventDefault();
            // e.returnValue = false;
            // win.hide();
            // e.returnValue = false;
        // }
    });

    win.onbeforeunload = (e) => {
        console.log('I do not want to be closed')
        e.returnValue = false // equivalent to `return false` but not recommended
    }

    win.on('minimize',function(e){
        e.preventDefault();
        console.log("MINIZE")
        win.hide();
    });
}

app.on('ready', createWindow);

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});