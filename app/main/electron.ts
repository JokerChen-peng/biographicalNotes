/**
 * @desc electron 主入口
 */
 import path from 'path';
 import customMenu from './customMenu';
 import './userData';
 import { app, BrowserWindow,dialog,ipcMain, Menu } from 'electron';
 export interface MyBrowserWindow extends BrowserWindow {
  uid?: string;
}
 const ROOT_PATH = path.join(app.getAppPath(),'../')
 ipcMain.on('get-root-path', (event, arg) => {
  event.reply('reply-root-path', isDev() ? ROOT_PATH : __dirname);
});
 ipcMain.on('open-save-resume-path', (event, arg) => {
  dialog
    .showOpenDialog({
      properties: ['openDirectory'],
    })
    .then((result) => {
      event.reply('reply-save-resume-path', result.filePaths);
    })
    .catch((err) => {
      event.reply('reply-save-resume-path', err);
    });
});
 function isDev() {
   // 👉 还记得我们配置中通过 webpack.DefinePlugin 定义的构建变量吗
   return process.env.NODE_ENV === 'development';
 }
 
 function createWindow() {
   // 创建浏览器窗口
   const mainWindow = new BrowserWindow({
     width: 1200,
     height: 800,
     webPreferences: {
       devTools: true,
       nodeIntegration: true,
     },
   });
   // 创建应用设置窗口
   const settingWindow: MyBrowserWindow = new BrowserWindow({
    width: 720,
    height: 240,
    show: false, // 设置为 false，使得窗口创建时不展示
    resizable: false,
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
    },
  });
  ipcMain.on('Electron:SettingWindow-hide-event', () => {
    if (settingWindow.isVisible()) {
      settingWindow.hide();
    }
  });
  ipcMain.on('Electron:SettingWindow-min-event', () => {
    if (settingWindow.isVisible()) {
      settingWindow.minimize();
    }
  });
   if (isDev()) {
     // 👇 看到了吗，在开发环境下，我们加载的是运行在 7001 端口的 React
     mainWindow.loadURL(`http://127.0.0.1:7001`);
     settingWindow.loadURL(`http://127.0.0.1:7001/setting.html`);
   } else {
     mainWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
     settingWindow.loadURL(`file://${path.join(__dirname, '../dist/setting.html')}`);
   }
 }
 
 app.whenReady().then(() => {
   createWindow();
   app.on('activate', function () {
     if (BrowserWindow.getAllWindows().length === 0) createWindow();
   });
   app.on('ready', () => {
    const menu = Menu.buildFromTemplate(customMenu);
    Menu.setApplicationMenu(menu);
  });
  
 });
 