# Electron Crypto App Notifier
>  A simple electron desktop app that fetches Bitcoin price and shows desktop notifications 

This is a desktop app created with Electron that displays the current Bitcoin price. The app fetches the price using the [Crypto Compare API](https://www.cryptocompare.com/api/#-api-data-price-). Also, the app allows the user to register a target Bitcoin price that when it's reached, it shows a desktop notification letting them know about it. Moreover, it has menu buttons with options like to be redirected to [Coin Market Cap webiste](https://coinmarketcap.com/) and to close the application. 

## TL;DR
To quick experience the app, do the following:
```
git clone https://github.com/psatler/crypto-app-electron.git
npm install
npm start
```

## Creating the initial app template
Some of the steps taken to create the app are mentioned below.

```
mkdir crypto-app-electron
cd crypto-app-electron
npm init -y
npm install electron --save-dev --save-exact
```
then, in the project's root directory 
- I created a file named `main.js`. 
- After that, in the `package.json` file at the _main_ key I replaced the **index.js** to **main.js** in order to match the newly created `main.js` file. 
- then, in the _scripts_ key, the content was replaced to `"start: "electron ."`, so the developer are able to run in via `npm start`.
- finally, open the electron's [quick start guide](https://electronjs.org/docs/tutorial/first-app) and copy the contents of that page to yours `main.js` file and `index.html` file (create one if you hasn't already)
- then just run `npm start` to see the initial template running.

## Deploying the app
To create the app's _exe_ (executables), install the electron packager via `npm install electron-packager --save-dev`. Then follow the instructions shown in this [tutorial](https://www.christianengvall.se/electron-packager-tutorial/). Especially, the one that says abouts the deploy scripts (item 4 of that tutorial). So, in the `package.json` create a _scripts_ entry as shown below:
```json
"scripts": {
 "package-mac": "electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds",
"package-win": "electron-packager . electron-tutorial-app --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"Electron Tutorial App\"",    
"package-linux": "electron-packager . electron-tutorial-app --overwrite --asar=true --platform=linux --arch=x64 --icon=assets/icons/png/1024x1024.png --prune=true --out=release-builds"
 }
```
Then, you can run `npm run package-mac`, `npm run package-win` or `npm run package-linux`. **NOTE:** Make sure the icon's path is correct.

## Main Dependecies
- [Electron](https://electronjs.org/): Build cross platform desktop apps with JavaScript, HTML, and CSS
- [Axios](https://github.com/axios/axios): Promise based HTTP client for the browser and node.js
- [Node-Notifier](https://github.com/mikaelbr/node-notifier): A Node.js module for sending notifications on native Mac, Windows and Linux (or Growl as fallback)
- [Electron Packager](https://github.com/electron-userland/electron-packager): Customize and package your Electron app with OS-specific bundles (.app, .exe, etc.) via JS or CLI 

## License
This project is licensed under the terms of the [MIT License](https://opensource.org/licenses/mit-license.html) © Pablo Satler 2018