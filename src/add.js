const electron = require('electron');
const path = require('path'); //for working with files
const remote = electron.remote;
const ipc = electron.ipcRenderer

const closeBtn = document.getElementById('closeBtn')

closeBtn.addEventListener('click', (event) => {
    const window = remote.getCurrentWindow()
    window.close()
})

const updateBtn = document.getElementById('updateBtn')
updateBtn.addEventListener('click', () => {
    ipc.send('update-notify-value', document.getElementById('notifyVal').value); //sending a "signal" to main.js ipc
    
    //then closes the window
    const window = remote.getCurrentWindow()
    window.close()
})