const fs = require('fs');
const fsPromises = require('fs').promises;

let settings = null;

async function saveSettings() {
	console.log('saveSettings');
	await fsPromises.writeFile(__dirname + '/config.json', JSON.stringify(settings));
}

async function setSettings(_settings) {
	settings = _settings;
	await saveSettings();
}

async function getSettings() {
	if (!settings) {
		if (fs.existsSync(__dirname + '/config.json')) {
			settings = JSON.parse(await fsPromises.readFile(__dirname + '/config.json'));
		} else {
			settings = {
				ssid: 'DefaultName',
				password: 'DefaultPassword',
			};
		}
		await saveSettings();
	}

	return settings;
}
module.exports = { setSettings, getSettings };
