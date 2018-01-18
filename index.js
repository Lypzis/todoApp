const electron = require('electron');

//Menu --> constructor for custom menus
const { app, BrowserWindow, Menu } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({}); //browser window object
    mainWindow.loadURL(`file://${__dirname}/main.html`);

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

//array of labels on main menu
const menuTemplate = [
    {
        label: 'File'
    }
];