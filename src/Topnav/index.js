import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import Spinner from '../components/Spinner';

import './Topnav.css';

function Topnav() {
	const [wifiStatus, setWifiStatus] = useState(false);
	const [wifiLoading, setWifiLoading] = useState(false);

	
	async function turnOnWifi() {
		console.log('onwifi');
		const data = await window.ipcRenderer.invoke('get-settings');
		console.log(data);
		await window.ipcRenderer.invoke('hotspot-on', data.ssid, data.password);
	}

	async function turnOffWifi() {
		console.log('offwifi');
		await window.ipcRenderer.invoke('hotspot-off');
	}

	async function turnHotspot() {
		setWifiLoading(true);
		try {
			if (!wifiStatus) {
				console.log('on');
				await turnOnWifi();
				setWifiStatus(true);
			} else {
				console.log('off');
				await turnOffWifi();
				setWifiStatus(false);
			}
		} catch (error) {
			console.log(error);
			alert('No se ha podido iniciar el wifi');
		} finally {
			setWifiLoading(false);
		}
	}

	console.log(wifiStatus);
	console.log(wifiLoading);

	return (
		<div className="topnav flex row justify-space-between">
			<NavLink className="home" to="/">
				Home
			</NavLink>

			<div className='flex row'>
				<NavLink className="qrcode" to="/qrcode">
					QR Code
				</NavLink>
				<NavLink className="settings" to="/settings">
					Settings
				</NavLink>
				<div className="switch-around align-self-center px-1">
					{wifiLoading ? (
						<Spinner show={wifiLoading} />
					) : (
						<label className="switch">
							<input
								type="checkbox"
								checked={wifiStatus}
								onChange={turnHotspot}
							></input>
							<span className="slider round"></span>
						</label>
					)}
				</div>
			</div>
		</div>
	);
}

export default Topnav;