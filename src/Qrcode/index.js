import React, {useState} from 'react';
import QRCode from 'react-qr-code';
import { useAsync } from 'react-use';

import './Qrcode.css';

function QrcodeView() {
	const [wifiSsid, setWifiSsid] = useState('');
	const [wifiPassword, setWifiPassword] = useState('');
	const [runningApp, setRunningApp] = useState(false);

	/*let ssidQrcode;
	let passwordQrcode;*/

	async function loadWifiSettings() {
		const {ssid = '', password = ''} = await window.electronAPI.getSettings();
		setWifiSsid(ssid);
		setWifiPassword(password);
	}

	async function loadRunningApp() {
		const app = await window.ipcRenderer.invoke('get-running-app');
		console.log(app);
		setRunningApp(app);
	}

	useAsync(async () => {
		await loadWifiSettings();
		await loadRunningApp();
	}, []);

	return (
		<div className="qrcode-gen-div flex row">
			<div className="qrcode-hotspot flex column align-items-center justify-start gap-2">
				<span className='font-primary-hard font-bold font-10'>Hotspot</span>
				<div>
					<QRCode
						value={`WIFI:T:WPA;S:${wifiSsid};P:${wifiPassword};H:flase;`}
					/>
				</div>
				<span>SSID: {wifiSsid}</span>
				<span>Contraseña: {wifiPassword}</span>
			</div>
			{runningApp ? (
				<div className="qrcode-webpage flex column align-items-center justify-start gap-2">
					<span className='font-primary-hard font-bold font-10'>Webpage</span>
					<div>
						<QRCode value={`http://127.0.0.1:${runningApp?.port}`} />
					</div>
					<span>Web: {`http://127.0.0.1:${runningApp?.port}`} </span>
					<span>&nbsp;</span>
				</div>
			) : null}
			
		</div>
	);
}

export default QrcodeView;