import React, {useState, useEffect}  from 'react';
import { NavLink } from 'react-router-dom';
import ButtonLink from '../components/ButtonLink';

import './Home.scss';

function Home() {
	const [apps, setApps] = useState([]);
	const [appsStatus, setAppsStatus] = useState({});

	async function loadApps() {
		const tmpApps = await window.electronAPI.getInstalledApps();
		console.log(tmpApps);
		setApps(tmpApps);
	}

	async function loadAppsStatus() {
		const tmpAppsStatus = await window.ipcRenderer.invoke('get-apps-status');
		console.log(tmpAppsStatus);
		setAppsStatus(tmpAppsStatus);
	}

	async function startApp(appName) {
		console.log(appName);
		const wifiStatus = await window.ipcRenderer.invoke('status-wifi');
		if (!wifiStatus) {
			alert('Primero tienes que iniciar el wifi');
			return;
		}
		await window.ipcRenderer.invoke('start-app', appName);
		await loadAppsStatus();
	}

	async function stopApp(appName) {
		console.log(appName);
		await window.ipcRenderer.invoke('stop-app', appName);
		await loadAppsStatus();
	}

	useEffect(() => {
		loadApps();
		loadAppsStatus();
	}, []);

	async function openApp() {
		const runningApp = await window.ipcRenderer.invoke('get-running-app');
		console.log(runningApp);
		window.open(`http://127.0.0.1:${runningApp?.port}${runningApp?.config?.adminPath}`);
	}

	async function installApp() {
		console.log('installing');
		try {
			await window.ipcRenderer.invoke('install-app');
			await loadApps();
		} catch (error) {
			console.log(error);
		}
		console.log('installed');
	}

	console.log(apps);
	console.log(appsStatus);

	return (
		<div className="home-container p-2">
			<div className='flex row gap-2'>
				<h1>Apps</h1>
				<ButtonLink type="button" style='button' className='flex center align-self-center bg-marengo' onClick={installApp}>
					Install new app
				</ButtonLink>
			</div>

			<div className="applications flex row justify-start">
				{apps.map((app) => (
					<div className={`application flex column gap-2 shadow-2 shadow-primary br-2 p-2 ${appsStatus[app.name]?.running ? 'running' : ''}`} key={app.name}>
						<span className='font-marengo font-bold'>{ app.icon ? <img src={app.icon} alt="app-icon" /> : null}</span>
						
						{ appsStatus[app.name]?.running ? (
							<>
								<NavLink className='font-marengo font-5 font-bold' to="/app">{app.name}</NavLink>
								<div className='flex row gap-1 align-items-center'>
									<div className='button flex center grow-1 bg-grey-back font-black br-1' onClick={() => stopApp(app.name)}>
										Stop
									</div>
									<div className='button bg-green-correct font-white br-1' onClick={() => openApp()}>Go</div>
								</div>
								
							</>
						) : (
							<>
								<span className='font-marengo font-5 font-bold'>{app.name}</span>
								<div className='button flex center bg-primary font-white br-1' onClick={() => startApp(app.name)}>
									Start
								</div>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default Home;
