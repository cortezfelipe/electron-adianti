const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
//const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const Menu = electron.Menu;
const MenuItem = electron.MenuItem
const globalShortcut = electron.globalShortcut
const Tray = electron.Tray


// Modules to control application life and create native browser window



function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }

  })
  //mainWindow.setMenuBarVisibility(false)
  // and load the index.html of the app.
  //mainWindow.loadFile('index.html')
  // Declare shortcuts
  //var userName = process.env['USERPROFILE'].split(path.sep)[2]; 
  //Linux
  if (process.platform === 'linux') {
    var userName = process.env["USER"]
  } else {
    //Windows  
    var userName = process.env['USERPROFILE'].split(path.sep)[2];
  }

  mainWindow.loadURL('http://localhost/fw7/index.php?class=WelcomeView&method=onLoad&user=' + userName)
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

let tray = null
app.on('ready', function (){
 
  createWindow()
  
  const template = [
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'Demo',
      submenu: [
        {
          label: 'Submenu1',
          click: function () {
            console.log('Clicked sub menu 1');
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Submenu2'
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About Electron',
          click: function () {
            console.log('Clicked About');
            
          },
          accelerator: 'CmdOrCtrl + Shift + H'
        }
      ]
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    }
  ];


  let template1 = [
    {
      label: 'Audio',
      submenu: [
        {
          label: 'Low',
          type: 'radio',
          checked: true
        },
        {
          label: 'High',
          type: 'radio',
        }
      ]
    },
    {
      label: 'Video',
      submenu: [
        {
          label: '1280x720',
          type: 'radio',
          checked: true
        },
        {
          label: '1920x1080',
          type: 'radio',
        }
      ]
    }
  ]


  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  let local = path.join(__dirname, 'tray.png')
  appIcon = new Tray( local )
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' }
  ])

  // Make a change to the context menu
  contextMenu.items[1].checked = false

  // Call this again for Linux because we modified the context menu
  appIcon.setContextMenu(contextMenu)
  
  

})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

