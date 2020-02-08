const { app, BrowserWindow, Menu, Tray } = require('electron');

const isDev = process.env.NODE_ENV === 'dev';

let win;

let tray = null
function createWindow() {
    tray = new Tray('./src/icon/512x512.png');
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
    win.webContents.openDevTools();

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