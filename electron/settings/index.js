const fs = require('fs');
const fsPromises = require('fs').promises;

let settings = null;

async function saveSettings() {
	await fsPromises.writeFile("./settings/config.json", JSON.stringify(settings));
}

async function setSettings(_settings) {
	settings = _settings;
	await saveSettings();
}

async function getSettings() {
	if (!settings) {
		if (fs.existsSync("./settings/config.json")) {
			settings = JSON.parse(await fsPromises.readFile("./settings/config.json"));
		} else {
			settings = {
				ssid: "DefaultName",
				password: "DefaultPassword",
			};
		}
		await saveSettings();
	}

	return settings;
}
module.exports = { setSettings, getSettings };
