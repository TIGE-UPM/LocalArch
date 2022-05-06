import "./Topnav.css";
import { useSelector } from "react-redux";

export default function Topnav() {
	const ssid = useSelector((state) => {
		console.log(state);
		return state.hotspot.ssid;
	});
	console.log(ssid);

	const password = useSelector((state) => state.hotspot.password);
	console.log(password);

	const statusCurrent = useSelector((state) => state.hotspot.status);
	console.log(statusCurrent);

	let checkbox_flag = true; // True: able start hotspot (its off), False: able to stop hotspot (is on)

	async function turnOnWifi() {
		console.log("onwifi");
		await window.electronAPI.hotspotOn(ssid, password);
	}

	async function turnOffWifi() {
		console.log("offwifi");
		/*const ssidInput = document.getElementById("ssid");
		const passwordInput = document.getElementById("password");
		ssidInput.value = "";
		passwordInput.value = "";*/
		await window.electronAPI.hotspotOff();
	}

	function turnHotspot() {
		if (checkbox_flag) {
			console.log("on");
			checkbox_flag = false;
			turnOnWifi();
		} else {
			console.log("off");
			checkbox_flag = true;
			turnOffWifi();
		}
	}

	async function statusWifi() {
		console.log("status");
		const wifiStatus = await window.electronAPI.hotspotStatus();
		console.log(wifiStatus);
		/*if (wifiStatus) {
			document.getElementById("wifiStatus").innerText =
				"Está iniciado correctamente.";
		} else {
			document.getElementById("wifiStatus").innerText =
				"No está iniciado correctamente.";
		}*/
	}

	return (
		<div className="topnav">
			<div className="switch-around">
				<label className="switch">
					<input type="checkbox" onChange={turnHotspot}></input>
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
