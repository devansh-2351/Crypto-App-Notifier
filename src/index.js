const electron = require('electron');
const path = require('path'); //for working with files
const BrowserWindow = electron.remote.BrowserWindow; //it's gonna allow us to create an actually window
const axios = require('axios')
const notifier = require('node-notifier') //for notifications 
const ipc = electron.ipcRenderer

const notifyBtn = document.getElementById('notifyBtn') //refering the Notify Me When button
const price = document.querySelector('h1')
const targetPrice = document.getElementById('targetPrice')
let targetPriceVal

const notification = {
    title: 'BTC Alert',
    body: 'BTC just beat your target price!',
    icon: path.join(__dirname, '../assets/icons/btc.png')
}


function getBTC() {
    // https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH&tsyms=BTC,USD,EUR
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
        .then( res => {
            const cryptos = res.data.BTC.USD
            price.innerHTML = `$ ${cryptos.toLocaleString('en')}` //replacing the h1 with the current BTC price

            //creating the notification
            if(targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD) {
                // const myNotification = new window.Notification(notification.title, notification);
                notifier.notify({
                    title: 'BTC Alert',
                    message: 'BTC just beat your target price!',
                    icon: path.join(__dirname, '../assets/icons/btc.png'),
                    sound: true,
                    wait: false
                })
            }
        })
}
getBTC(); //calling the function to run it
setInterval(getBTC, 30000); //then calling again every 30s


notifyBtn.addEventListener('click', function(event) { //loads the add window
    const modalPath = path.join('file://', __dirname, 'add.html');
    let win = new BrowserWindow({ 
        frame: false, //removing the top menu section
        transparent: true,
        alwaysOnTop: true,
        width: 400, 
        height: 200 
    });

    win.on('close', () => {
        win = null;
    })
    win.loadURL(modalPath)
    win.show()
})

ipc.on('targetPriceVal', (event, arg) => {
    targetPriceVal = Number(arg)
    targetPrice.innerHTML = `$ ${targetPriceVal.toLocaleString('en')}`
})