import "./Main.css";
import { useSelector, useDispatch } from "react-redux";

function App() {
	const ssid = useSelector((state) => {
		console.log(state);
		return state.hotspot.ssid;
	});
	console.log(ssid);

	const password = useSelector((state) => state.hotspot.password);
	console.log(password);

	const statusCurrent = useSelector((state) => state.hotspot.status);
	console.log(statusCurrent);

	let checkbox_flag = true;

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

	/*function inputSsid(event) {
		ssid = event.target.value;
		console.log(ssid);
	}

	function inputPassword(event) {
		password = event.target.value;
		console.log(password);
	}*/

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

	/*function testFunc() {
		console.log(ssid);
		console.log(password);
	}*/

	async function statusWifi() {
		console.log("status");
		const wifiStatus = await window.electronAPI.hotspotStatus();
		console.log(wifiStatus);
		if (wifiStatus) {
			document.getElementById("wifiStatus").innerText =
				"Está iniciado correctamente.";
		} else {
			document.getElementById("wifiStatus").innerText =
				"No está iniciado correctamente.";
		}
	}
	/*const old = (
		<div className="App">
			<header className="App-header">
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<p>
					SSID: <input id="ssid" onChange={inputSsid} />
					<br></br>
					Password: <input id="password" onChange={inputPassword} />
					<br></br>
					<button id="btnon" type="button" onClick={turnOnWifi}>
						Open
					</button>
					<button id="btnoff" type="button" onClick={turnOffWifi}>
						Close
					</button>
					<button id="btnsta" type="button" onClick={statusWifi}>
						Status
					</button>
				</p>
				Wifi Status: <strong id="wifiStatus"></strong>
			</header>
		</div>
	);*/

	return (
		<div>
			<div className="topnav">
				<div className="switch-around">
					<label className="switch">
						<input type="checkbox" onChange={turnHotspot}></input>
						<span className="slider round"></span>
					</label>
				</div>
				<a className="qrcode" href="#qrcode">
					QR Code
				</a>
				<a className="settings" href="#settings">
					Ajustes
				</a>
			</div>

			<h1>Aplicaciones</h1>

			<div className="applications">
				<a
					className="href-content"
					href="https://moodle.upm.es/titulaciones/oficiales/login/login.php"
				>
					<div className="href-content-div">
						<img
							className="img-href"
							alt="Moodle Access"
							src="https://cdn.pixabay.com/photo/2015/11/15/07/47/geometry-1044090_960_720.jpg"
							width="225"
							height="150"
						></img>
						<p className="text-href"> Moodle </p>
					</div>
				</a>

				<a
					className="href-content"
					href="https://moodle.upm.es/titulaciones/oficiales/login/login.php"
				>
					<div className="href-content-div">
						<img
							className="img-href"
							alt="Test Access"
							src="https://cdn.pixabay.com/photo/2017/07/02/09/03/books-2463779_960_720.jpg"
							width="225"
							height="150"
						></img>
						<p className="text-href"> Test </p>
					</div>
				</a>

				<a
					className="href-content"
					href="https://moodle.upm.es/titulaciones/oficiales/login/login.php"
				>
					<div className="href-content-div">
						<img
							className="img-href"
							alt="Examen Access"
							src="https://cdn.pixabay.com/photo/2016/11/29/01/16/abacus-1866497_960_720.jpg"
							width="225"
							height="150"
						></img>
						<p className="text-href"> Examen </p>
					</div>
				</a>

				<a
					className="href-content"
					href="https://moodle.upm.es/titulaciones/oficiales/login/login.php"
				>
					<div className="href-content-div">
						<img
							className="img-href"
							alt="Examen Access"
							src="https://cdn.pixabay.com/photo/2016/03/09/15/29/books-1246674_960_720.jpg"
							width="225"
							height="150"
						></img>
						<p className="text-href"> Clase </p>
					</div>
				</a>
			</div>

			<div className="applications">
				<a
					className="href-content"
					href="https://moodle.upm.es/titulaciones/oficiales/login/login.php"
				>
					<div className="href-content-div">
						<img
							className="img-href"
							alt="Moodle Access"
							src="https://cdn.pixabay.com/photo/2015/11/15/07/47/geometry-1044090_960_720.jpg"
							width="225"
							height="150"
						></img>
						<p className="text-href"> Moodle </p>
					</div>
				</a>

				<a
					className="href-content"
					href="https://moodle.upm.es/titulaciones/oficiales/login/login.php"
				>
					<div className="href-content-div">
						<img
							className="img-href"
							alt="Test Access"
							src="https://cdn.pixabay.com/photo/2017/07/02/09/03/books-2463779_960_720.jpg"
							width="225"
							height="150"
						></img>
						<p className="text-href"> Test </p>
					</div>
				</a>

				<a
					className="href-content"
					href="https://moodle.upm.es/titulaciones/oficiales/login/login.php"
				>
					<div className="href-content-div">
						<img
							className="img-href"
							alt="Examen Access"
							src="https://cdn.pixabay.com/photo/2016/11/29/01/16/abacus-1866497_960_720.jpg"
							width="225"
							height="150"
						></img>
						<p className="text-href"> Examen </p>
					</div>
				</a>

				<a
					className="href-content"
					href="https://moodle.upm.es/titulaciones/oficiales/login/login.php"
				>
					<div className="href-content-div">
						<img
							className="img-href"
							alt="Examen Access"
							src="https://cdn.pixabay.com/photo/2016/03/09/15/29/books-1246674_960_720.jpg"
							width="225"
							height="150"
						></img>
						<p className="text-href"> Clase </p>
					</div>
				</a>
			</div>
		</div>
	);
}

export default App;
