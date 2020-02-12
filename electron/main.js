const { app, BrowserWindow, Menu, Tray } = require('electron');

const path = require('path');
const isDev = process.env.NODE_ENV === 'dev';
const packageJson = require('../package');
global.packageJson = packageJson;

let win;

let tray = null
function createWindow() {
    const trayImagePath = path.join(__dirname, '..', 'src/assets/512x512.png');
    tray = new Tray(trayImagePath);

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Open', type: 'normal', click: () => {
                if (!win.isVisible()) {
                    console.log("Will show window");
                    win.show();
                }
            }
        },
        { type: 'separator' },
        {
            label: 'About', type: 'normal', click: () => {
                win.webContents.send('open-about-page', true);
                console.log("vai abrir about")
            }
        },
        { type: 'separator' },
        {
            label: 'Exit', type: 'normal', click: () => {
                console.log("Will exit ");
                // win.close();
                win.destroy();
            }
        }
    ])

    // tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu);
    tray.setIgnoreDoubleClickEvents(true);

    // app.getPath('userData');
    // win.loadFile('./src/index.html');

    win = new BrowserWindow({
        width: 1150,
        height: 750,
        webPreferences: {
            nodeIntegration: true,
            // sandbox: true
        }
    });

    win.webContents.on('new-window', function (e, url) {
        e.preventDefault();
        console.log("will open external link")
        require('electron').shell.openExternal(url);
    });

    const url = isDev ?
        'http://localhost:3000/' :
        `file://${path.join(__dirname, '../build/index.html')}`;

    console.log(`Will create window ${url}`);
    win.loadURL(url);
    win.setAutoHideMenuBar(true);
    win.removeMenu();
    win.setMenu(null);
    if(isDev) win.webContents.openDevTools();

    // win.on('closed', (e) => { });

    win.on('close', (e) => {
        console.log("Will hide window");
        e.preventDefault();
        e.returnValue = false;
        win.hide();
    });
}

app.on('ready', createWindow);

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});