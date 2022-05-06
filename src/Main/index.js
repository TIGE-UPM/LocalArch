import "./Main.css";
import { Outlet } from "react-router-dom";
import Topnav from "../Topnav";

function Main() {
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
			<Topnav />
			<Outlet />
		</div>
	);
}

export default Main;
