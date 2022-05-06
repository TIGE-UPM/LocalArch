const { resolve } = require("path");
var sudo = require("sudo-prompt"); // Not needed if general admin

// Start hotspot
function startHotspot({ ssid, password }) {
	const { exec } = require("child_process");
	var options = {
		// Not needed if general admin
		name: "LocalArch",
	};

	return new Promise((resolve) => {
		sudo.exec(
			// sudo not needed if general admin
			`netsh wlan set hostednetwork mode=allow ssid="${ssid}" key="${password}" keyUsage=persistent & netsh wlan start hostednetwork`,
			options,
			(error, stdout, stderr) => {
				//console.log(stdout);
				//console.error(stderr);
				//console.error(error);
				/*sudo.exec(
					"netsh wlan start hostednetwork",
					options,
					(error, stdout, stderr) => {
						console.log(stdout);
						console.error(stderr);
						console.error(error);
					}
				);*/
				resolve();
			}
		);
	});
}

// Stop hotspot
function stopHotspot() {
	const { exec } = require("child_process");

	return new Promise((resolve) => {
		exec("netsh wlan stop hostednetwork", (error, stdout, stderr) => {
			//console.log(stdout);
			//console.error(stderr);
			//console.error(error);
			resolve();
		});
	});
}

// Status
async function statusHotspot() {
	const { exec } = require("child_process");

	return new Promise((resolve) => {
		exec("netsh wlan show hostednetwork", (error, stdout, stderr) => {
			//console.log(stdout);
			//console.error(stderr);
			//console.error(error);
			if (stdout.includes("Iniciado")) {
				console.log("Está iniciado correctamente.");
				resolve(true);
			} else {
				console.log("No está iniciado correctamente.");
				resolve(false);
			}
		});
	});
}

module.exports = {
	statusHotspot,
	startHotspot,
	stopHotspot,
};
