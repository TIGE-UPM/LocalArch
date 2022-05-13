import "./Topnav.css";
/*import { useSelector } from "react-redux";*/

export default function Topnav() {
	/*const ssid = useSelector((state) => {
		console.log(state);
		return state.hotspot.ssid;
	});
	console.log(ssid);

	const password = useSelector((state) => state.hotspot.password);
	console.log(password);

	const statusCurrent = useSelector((state) => state.hotspot.status);
	console.log(statusCurrent);

	let checkbox_flag = true; // True: able start hotspot (its off), False: able to stop hotspot (is on)*/

	async function turnOnWifi() {
		console.log("onwifi");
		const datas = await window.electronAPI.getSettings();
		console.log(datas);
		const ssidNew = datas.ssid;
		const passNew = datas.password;
		await window.electronAPI.hotspotOn(ssidNew, passNew);
	}

	async function turnOffWifi() {
		console.log("offwifi");
		/*const ssidInput = document.getElementById("ssid");
		const passwordInput = document.getElementById("password");
		ssidInput.value = "";
		passwordInput.value = "";*/
		await window.electronAPI.hotspotOff();
	}

	async function turnHotspot() {
		const hotspotTurn = await statusWifi();
		if (!hotspotTurn) {
			console.log("on");
			turnOnWifi();
			wifiStatus = true;
		} else {
			console.log("off");
			turnOffWifi();
			wifiStatus = false;
		}
	}

	async function statusWifi() {
		console.log("status");
		const wifiStatus = await window.electronAPI.hotspotStatus();
		console.log(wifiStatus);
		return wifiStatus;
		/*if (wifiStatus) {
			document.getElementById("wifiStatus").innerText =
				"Está iniciado correctamente.";
		} else {
			document.getElementById("wifiStatus").innerText =
				"No está iniciado correctamente.";
		}*/
	}

	let wifiStatus = false;
	async function statusChecked() {
		const statusObtained = await statusWifi();
		if (statusObtained) {
			wifiStatus = true;
		} else {
			wifiStatus = false;
		}
	}
	statusChecked();

	return (
		<div className="topnav">
			<div className="switch-around">
				<label className="switch">
					<input
						type="checkbox"
						checked={wifiStatus}
						onChange={turnHotspot}
					></input>
					<span className="slider round"></span>
				</label>
			</div>
			<a className="qrcode" href="/qrcode">
				QR Code
			</a>
			<a className="settings" href="/settings">
				Ajustes
			</a>
			<a className="home" href="/">
				Inicio
			</a>
		</div>
	);
}
