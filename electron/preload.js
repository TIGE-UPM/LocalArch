const { contextBridge, ipcRenderer } = require("electron");

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

contextBridge.exposeInMainWorld("electronAPI", {
	hotspotOn: async (ssid, password) => {
		console.log("hotspotOn");
		return await ipcRenderer.invoke("hotspot-on", ssid, password);
	},
	hotspotOff: async () => {
		console.log("hotspotOff");
		return await ipcRenderer.invoke("hotspot-off");
	},
	hotspotStatus: async () => {
		console.log("hotspotStatus");
		return await ipcRenderer.invoke("status-wifi");
	},
	setSettings: async (settings) => {
		console.log("updateValues");
		console.log(settings);
		return await ipcRenderer.invoke("update-hotspot", settings);
	},
	getSettings: async () => {
		console.log("getSettings preload");
		return await ipcRenderer.invoke("get-settings");
	},
});
