const {app, BrowserWindow, Menu} = require('electron')
const shell = require('electron').shell


const ipc = require('electron').ipcMain //inter process communication, allowing communication between those windows or processes
  
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win
  
  function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 800, height: 600})
  
    // and load the index.html of the app.
    win.loadFile('src/index.html')
  
    // Open the DevTools.
    win.webContents.openDevTools()
  
    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })

    //creating the menu bar
    const menu = Menu.buildFromTemplate([
        {
            label: 'Menu',
            submenu: [
                { label: 'Adjust Notification Value'},
                { 
                    label: 'CoinMarketCap',
                    click(){
                        shell.openExternal('https://coinmarketcap.com/'); //make it open the website in the default browser
                    }
                },
                {
                    type: 'separator',
                },
                { 
                    label: 'Exit',
                    click(){
                        app.quit(); //closing the application when the user clicks the Exit submenu
                    }
                },
            ]
        },
        {
            label: 'Info',
        }
    ])
    Menu.setApplicationMenu(menu); //in order to make the menu work
  }
  
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  })
  
  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.

  //in a nutshell, ipc main will catch the message that's sent from the add.html and then it's going to send that back to the index.html so it can be displayed at the tag with id targetPrice
  ipc.on('update-notify-value', (event, arg) => {
      //sending to index.html window
      win.webContents.send('targetPriceVal', arg) //defining the name of the message as 'targetPriceVal' and binding it to the response which is whatever is entered into the text field in the add.html file. So. it's gonna send that value to 'win', which is currently bound to the index.html when we create the browser window
  })