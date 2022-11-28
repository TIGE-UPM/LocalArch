import React from 'react';

import Components from '@Components';
import Form from '@Components/Form';

const { ButtonLink } = Components;
const { TextInput } = Form;

import './Settings.css';
import { useAsync } from 'react-use';

function Settings() {
	const [ssid, setSsid] = React.useState('');
	const [password, setPassword] = React.useState('');

	async function loadWifiSettings() {
		const {ssid = '', password = ''} = await window.electronAPI.getSettings();
		setSsid(ssid);
		setPassword(password);
	}

	useAsync(async () => {
		await loadWifiSettings();
	});

	async function saveValues() {
		console.log('saveValues');
		const settings = { ssid, password };
		await window.electronAPI.setSettings(settings);
	}

	function inputSsid(event) {
		setSsid(event.target.value);
	}

	function inputPassword(event) {
		setPassword(event.target.value);
	}

	return (
		<div className='flex row justify-center p-2'>
			<div className='flex column gap-2 align-items-center mt-5'>
				<span className='font-8 font-bold font-primary-hard'>Hotspot settings</span>
				<TextInput type="text" value={ssid} onChange={(e) => inputSsid(e)} placeholder='Enter the SSID...' />
				<TextInput type="text" value={password} onChange={(e) => inputPassword(e)} placeholder='Enter the password...' />
				<div className="flex row gap-2">
					<ButtonLink style="button" onClick={saveValues}>Save</ButtonLink>
				</div>
			</div>
		</div>
	);
}

export default Settings;
