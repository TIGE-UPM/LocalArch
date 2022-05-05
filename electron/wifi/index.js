const { resolve } = require("path");
var sudo = require("sudo-prompt"); // Delete if general admin

// Start hotspot
function startHotspot({ ssid, password }) {
	const { exec } = require("child_process");
	var options = {
		// Delete if general admin
		name: "LocalArch",
	};

	return new Promise((resolve) => {
		sudo.exec(
			// Remove sudo. if general admin
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

/*startHotspot({
	ssid: "TestWifi3",
	password: "pepito2022",
});*/

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

//stopHotspot();

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

//statusHotspot();

/*if (statusHotspot()) {
	console.log("Está iniciado correctamente.");
} else {
	console.log("No está iniciado correctamente.");
}*/

module.exports = {
	statusHotspot,
	startHotspot,
	stopHotspot,
};
