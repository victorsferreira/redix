const { app, BrowserWindow } = require('electron');

const isDev = process.env.NODE_ENV === 'dev';

let win;

function createWindow() {
    // app.getPath('userData');
    // win.loadFile('./src/index.html');
    
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    const url = isDev ?
    'http://localhost:3000/' :
    `file://${path.join(__dirname, '../build/index.html')}`;

    win.loadURL(url);

    if (isDev) {
        win.webContents.openDevTools();
    }

    win.on('closed', () => {
        win = null
    });
}

app.on('ready', createWindow);

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});