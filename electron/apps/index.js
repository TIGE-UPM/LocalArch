const fsPromises = require('fs').promises;
const util = require('node:util');
const path = require('node:path');
const childProcess = require('node:child_process');

const { dialog } = require('electron');
const StreamZip = require('node-stream-zip');
const tcpPortUsed = require('tcp-port-used');

const {getWifiIP} = require('../wifi');
const {getSettings} = require('../settings');

const exec = util.promisify(childProcess.exec);

let appRunning = null;

let apps = null;


const installationPath = path.join(__dirname, '/installed');

async function loadInstalledApps() {
	const files = await fsPromises.readdir(installationPath, {withFileTypes: true});
	const tmpApps = [];
	for (const file of files) {
		if (!file.isDirectory()) {
			continue;
		}
		console.log(file.name);
		const config = JSON.parse(await fsPromises.readFile(path.join(installationPath, file.name, '/config.json')));
		tmpApps.push(config);
	}

	apps = tmpApps;
}

loadInstalledApps();

async function getInstalledApps() {
	return apps;
}

async function installApp() {
	console.log('installApp');
	const {canceled, filePaths, ...rest} = await dialog.showOpenDialog({ properties: ['openFile'] });
	console.log(canceled, filePaths, rest);
	if (canceled) {
		return;
	}

	const zip = new StreamZip.async({ file: filePaths[0] });
	try {
		const entriesCount = await zip.entriesCount;
		console.log(`Entries read: ${entriesCount}`);

		const entries = await zip.entries();

		if (!entries['config.json']) {
			throw new Error('There is no config.json file in the zip');
		}

		const config = JSON.parse(await zip.entryData('config.json'));
		
		if (!config.name) {
			throw new Error('No name in config.json');
		}

		const installedApp = apps.find(app => app.name === config.name);

		if (installedApp) {
			throw new Error('App already installed');
		}

		if (!config.startCommand) {
			throw new Error('No start command in config.json');
		}

		const appPath = path.join(installationPath, config.name);

		await fsPromises.mkdir(appPath, { recursive: true });

		await zip.extract(null, appPath);

		if (config.installCommand) {
			console.log('installing');
			await exec(config.installCommand, { cwd: appPath });
			console.log('installed');
		}
		await loadInstalledApps();
		console.log(config);
	} finally {
		await zip.close();
	}
}

async function launchNodeProgram(file, path) {
	let port = 3000;
	console.log('launchNodeProgram', file, path);
	console.log(await tcpPortUsed.check(port, '127.0.0.1'));
	while (await tcpPortUsed.check(port, '127.0.0.1')) {
		port++;
	}
	console.log('port', port);
	const hostIP = getWifiIP();
	const {ssid, password} = await getSettings();
	let newProcess;
	try {
		newProcess = childProcess.fork(file, [], { cwd: path, env: { ...process.env, PORT: port, HOST_IP: hostIP, SSID: ssid, PASSWORD: password } });
		
		newProcess.stdout.on('data', (data) => {
			console.log(`stdout: ${data}`);
		});

		newProcess.stderr.on('data', (data) => {
			console.error(`stderr: ${data}`);
		});

		newProcess.on('close', (code) => {
			console.log(`child process exited with code ${code}`);
		});
	} catch (error) {
		console.log(error);
	}
	
	
	return {
		process: newProcess,
		port
	};
}

async function startApp(appName) {
	console.log(appName);
	const app = apps.find(app => app.name === appName);

	if (!app) {
		throw new Error('App not found');
	}

	if (appRunning?.name === appName) {
		throw new Error('App already running');
	}

	const {port, process} = await launchNodeProgram(app.main, path.join(installationPath, appName));

	appRunning = {
		name: appName,
		process,
		port
	};
}

async function stopApp(appName) {
	const app = apps.find(app => app.name === appName);

	if (!app) {
		throw new Error('App not found');
	}

	if (appRunning?.name !== appName) {
		throw new Error('App not running');
	}

	appRunning.process.kill();
	appRunning = null;
}

async function restartApp(appName) {
	const app = apps.find(app => app.name === appName);

	if (!app) {	
		throw new Error('App not found');
	}

	if (appRunning?.name !== appName) {
		throw new Error('App not running');
	}

	appRunning.process.kill();

	const {port, process} = await launchNodeProgram(app.main, path.join(installationPath, appName));

	appRunning.process = process;
	appRunning.port = port;
}

async function getAppsStatus() {
	const appsStatus = {};
	for (const app of apps) {
		appsStatus[app.name] = {
			running: appRunning?.name === app.name,
		};
	}
	return appsStatus;
}

async function getRunningApp() {
	if (!appRunning) {
		throw new Error('App not running');
	}

	const appConfig = apps.find(app => app.name === appRunning.name);

	return {
		config: appConfig,
		port: appRunning.port
	};
}

module.exports = { getInstalledApps, installApp, startApp, stopApp, restartApp, getAppsStatus, getRunningApp };
