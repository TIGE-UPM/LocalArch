const { networkInterfaces } = require('os');
var sudo = require('sudo-prompt'); // Not needed if general admin

const defaultOptions = {
	name: 'LocalArch'
};
async function sudoexec(command, options) {
	return new Promise((resolve, reject) => {
		sudo.exec(command, {...defaultOptions, ...options}, (error, stdout, stderr) => {
			console.log(error, stdout, stderr);
			if (error) {
				reject(error);
			} else {
				resolve(stdout);
			}
		});
	});
}

console.log(networkInterfaces());

const isWin = process.platform === 'win32';

// Start hotspot
async function startHotspot({ ssid, password }) {
	if (isWin) {
		await sudoexec(`netsh wlan set hostednetwork mode=allow ssid=${ssid} key=${password}`);
		await sudoexec('netsh wlan start hostednetwork');
	} else {
		try {
			await sudoexec(`SSID=${ssid} PASSWORD=${password} ${__dirname}/linux-start.sh`);
		} catch (error) {
			console.log(error);
			throw error;
		}
		console.log(networkInterfaces());
	}
}

// Stop hotspot
async function stopHotspot() {
	if (isWin) {
		await sudoexec('netsh wlan stop hostednetwork');
	} else {
		try {
			await sudoexec(`${__dirname}/linux-stop.sh`);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}

// Status
async function statusHotspot() {
	if (isWin) {
		const response = await sudoexec('netsh wlan show hostednetwork');
		return response.includes('Iniciado');
	} else {
		try {
			const response = await sudoexec(`${__dirname}/linux-status.sh`);
			return response.includes('activada');
		} catch (error) {
			return false;
		}
		
	}
}

function getWifiIP() {
	const interfaces = networkInterfaces();
	console.log(interfaces);
	for (const interfaceName in interfaces) {
		if (interfaceName.includes('wlp')) {
			console.log(interfaceName);
			console.log(interfaces[interfaceName]);
			return interfaces[interfaceName].find(ifIP => ifIP.family === 'IPv4').address;
		}
	}
}

module.exports = {
	statusHotspot,
	startHotspot,
	stopHotspot,
	getWifiIP,
};
