// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const Wifi = require('./wifi');
const Settings = require('./settings');
const Apps = require('./apps');

function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	// and load the index.html of the app.
	const startUrl =
		process.env.ELECTRON_START_URL ||
		url.format({
			pathname: path.join(__dirname, '/../build/index.html'),
			protocol: 'file:',
			slashes: true,
		});
	mainWindow.loadURL(startUrl);

	// Open the DevTools.
	// mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	ipcMain.handle('hotspot-on', async (event, ssid, password) => {
		console.log('hotspot on');
		const wow = await Wifi.startHotspot({
			ssid: ssid,
			password: password,
		});
		return wow;
	});

	ipcMain.handle('hotspot-off', async () => {
		console.log('hotspot off');
		const wiw = await Wifi.stopHotspot();
		return wiw;
	});

	ipcMain.handle('status-wifi', async () => {
		const statusSol = await Wifi.statusHotspot();
		return statusSol;
	});

	ipcMain.handle('update-hotspot', async (event, settings) => {
		console.log('update values');
		console.log(settings);
		await Settings.setSettings(settings);
	});

	ipcMain.handle('get-settings', async () => {
		console.log('get-settings');
		const settings = await Settings.getSettings();
		return settings;
	});

	ipcMain.handle('get-installed-apps', async () => {
		console.log('get-installed-apps');
		const apps = await Apps.getInstalledApps();
		return apps;
	});

	ipcMain.handle('install-app', async () => {
		console.log('install-app');
		await Apps.installApp();
	});

	ipcMain.handle('start-app', async (event, appName) => {
		console.log('start-app');
		await Apps.startApp(appName);
	});

	ipcMain.handle('stop-app', async (event, appName) => {
		console.log('stop-app');
		await Apps.stopApp(appName);
	});

	ipcMain.handle('restart-app', async (event, appName) => {
		console.log('restart-app');
		await Apps.restartApp(appName);
	});

	ipcMain.handle('get-apps-status', async () => {
		console.log('get-apps-status');
		return Apps.getAppsStatus();
	});

	ipcMain.handle('get-running-app', async () => {
		console.log('get-running-app');
		return Apps.getRunningApp();
	});

	createWindow();

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
