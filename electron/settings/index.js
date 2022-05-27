const fs = require("fs").promises;

let settings = null;

async function setSettings(_settings) {
	settings = _settings;
	await fs.writeFile("./settings/config.json", JSON.stringify(settings));
}

async function getSettings() {
	if (!settings) {
		if (fs.existsSync("./settings/config.json")) {
			settings = JSON.parse(await fs.readFile("./settings/config.json"));
		} else {
			settings = {
				ssid: "DefaultName",
				password: "DefaultPassword",
			};
		}
	}

	return settings;
}
module.exports = { setSettings, getSettings };
