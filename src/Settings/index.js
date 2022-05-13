import "./Settings.css";
import { useDispatch, useSelector } from "react-redux";
import { setHotspotValues } from "../redux/hotspotSlice";

export default function Settings() {
	let ssidQrcode = useSelector((state) => state.hotspot.ssid);
	let passwordQrcode = useSelector((state) => state.hotspot.password);
	const dispatch = useDispatch();

	settingQrcode();
	async function settingQrcode() {
		console.log("qrcode");
		const datas = await window.electronAPI.getSettings();
		ssidQrcode = datas.ssid;
		passwordQrcode = datas.password;
		console.log(ssidQrcode);
		console.log(passwordQrcode);
		let valuesObject = { ssid: ssidQrcode, password: passwordQrcode };
		dispatch(setHotspotValues(valuesObject));
	}

	let ssidTemp;
	let passwordTemp;

	async function saveValues() {
		console.log("saveValues");
		const settings = { ssid: ssidTemp, password: passwordTemp };
		await window.electronAPI.setSettings(settings);
	}

	function inputSsid(event) {
		ssidTemp = event.target.value;
		console.log(ssidTemp);
	}

	function inputPassword(event) {
		passwordTemp = event.target.value;
		console.log(passwordTemp);
	}

	function testFunc() {
		console.log(ssidQrcode);
		console.log(passwordQrcode);
	}

	/*function saveValues() {
		let valuesObject = { ssid: ssidTemp, password: passwordTemp };
		dispatch(setHotspotValues(valuesObject));
	}*/

	return (
		<div>
			<h1>Ajustes del hotspot</h1>

			<div className="settings-body">
				<div className="hotspot-inputs">
					<p>SSID:</p>
					<input
						id="ssid"
						onChange={inputSsid}
						defaultValue={ssidQrcode}
					/>
					<p>Password:</p>
					<input
						id="password"
						onChange={inputPassword}
						defaultValue={passwordQrcode}
					/>
				</div>
				<button id="btnset" type="button" onClick={saveValues}>
					Guardar
				</button>
				<button id="test" type="button" onClick={testFunc}>
					Test
				</button>
			</div>
		</div>
	);
}
