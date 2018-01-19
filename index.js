const electron = require('electron');

//Menu --> constructor for custom menus
const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({}); //browser window object
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    mainWindow.on('close', () => { app.quit() }); //on close event, quit everything

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow(){
    addWindow = new BrowserWindow({
        //since this window will be smaller...
        height: 200,
        width: 300,
        title: 'Add New Todo'
    });
    addWindow.loadURL(`file://${__dirname}/addTodo.html`);
}

//array of labels on main menu
const menuTemplate = [
    //{}, <--- for OSX compatibility menu, but in Windows will 
    //generate a small menu at the beginning with nothing 
    {
        label: 'File',
        submenu: [
            {
                label: 'New Todo',
                accelerator: process.platform === 'darwin' ? 'Command+N' : 'Ctrl+N',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Quit',
                //listen for keyboard keys
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q', 
                /*or use imediate invoke function in javascript
                (() => { 
                    if (process.platform === 'darwin'){
                        return 'Command+Q';
                    }else{
                        return 'Ctrl+Q';
                    }
                })(), */ 
                click(){
                    app.quit();
                }
            }
        ]
    }
];

//To solve the menu compatibility system, it does a test
//to see which platform it's executing.
if (process.platform === 'darwin'){
    menuTemplate.unshift({});
};

// 'production'
// 'development' <-- this one :D
// 'staging'
// 'test'
if (process.env.NODE_ENV !== 'production'){
    menuTemplate.push({
        label: 'View',
        submenu: [
            {
                label: 'Toggle Developer Tools',
                accelerator: 'F12',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools(); //will toggle 'dev tools' menu on the focused window
                }
            }
        ]
    });
}
