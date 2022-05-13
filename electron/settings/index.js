const fs = require("fs").promises;

async function setSettings(settings) {
	console.log("set settings index");
	console.log(settings);
	console.log(JSON.stringify(settings));
	await fs.writeFile("./config.json", JSON.stringify(settings));
}

async function getSettings() {
	console.log("settings index");
	const data = await fs.readFile("./config.json", "utf-8");
	try {
		if (data.length == 0) {
			console.log("empty config");
			let defaultValues = {
				ssid: "DefaultName",
				password: "DefaultPassword",
			};
			const aux1 = await setSettings(defaultValues);
			return defaultValues;
		} else {
			console.log("not empty config");
			return JSON.parse(data);
		}
	} catch (err) {
		console.log(err);
	}
}
module.exports = { setSettings, getSettings };
