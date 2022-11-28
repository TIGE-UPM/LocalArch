import React, {useState, useEffect} from 'react';

import './AppsManager.css';

function AppsManager() {
	const [apps, setApps] = useState([]);
	const [installing, setInstalling] = useState(false);

	async function loadApps() {
		const tmpApps = await window.electronAPI.getInstalledApps();
		console.log(tmpApps);
		setApps(tmpApps);
	}

	useEffect(() => {
		loadApps();
	}, []);

	async function installApp() {
		console.log('installing');
		setInstalling(true);
		try {
			await window.ipcRenderer.invoke('install-app');
			await loadApps();
		} catch (error) {
			console.log(error);
		}
		setInstalling(false);
		console.log('installed');
	}

	console.log(apps);

	return (
		<div>
			<button id="test" type="button" onClick={installApp}>
					Test
			</button>
			{installing ? <p>Installing...</p> : <p>Not installing</p>}
		</div>
	);
}

export default AppsManager;
