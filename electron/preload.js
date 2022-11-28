const { contextBridge, ipcRenderer } = require('electron');

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);

contextBridge.exposeInMainWorld('electronAPI', {
	hotspotOn: async (ssid, password) => {
		console.log('hotspotOn');
		return await ipcRenderer.invoke('hotspot-on', ssid, password);
	},
	hotspotOff: async () => {
		console.log('hotspotOff');
		return await ipcRenderer.invoke('hotspot-off');
	},
	hotspotStatus: async () => {
		console.log('hotspotStatus');
		return await ipcRenderer.invoke('status-wifi');
	},
	setSettings: async (settings) => {
		console.log('updateValues');
		console.log(settings);
		return await ipcRenderer.invoke('update-hotspot', settings);
	},
	getSettings: async () => {
		console.log('getSettings preload');
		return await ipcRenderer.invoke('get-settings');
	},
	getInstalledApps: async () => {
		console.log('getInstalledApps preload');
		return await ipcRenderer.invoke('get-installed-apps');
	},
	installApp: async () => {
		console.log('installApp preload');
		return await ipcRenderer.invoke('install-app');
	},
});
