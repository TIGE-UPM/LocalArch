import "./Settings.css";
import { useDispatch, useSelector } from "react-redux";
import { setHotspotValues } from "../redux/hotspotSlice";

export default function Settings() {
	const dispatch = useDispatch();
	let ssidTemp;
	let passwordTemp;

	function inputSsid(event) {
		ssidTemp = event.target.value;
		console.log(ssidTemp);
	}

	function inputPassword(event) {
		passwordTemp = event.target.value;
		console.log(passwordTemp);
	}

	function saveValues() {
		let valuesObject = { ssid: ssidTemp, password: passwordTemp };
		dispatch(setHotspotValues(valuesObject));
	}

	return (
		<div>
			<h1>Ajustes del hotspot</h1>

			<div className="settings-body">
				<div className="hotspot-inputs">
					<p>SSID:</p>
					<input
						id="ssid"
						onChange={inputSsid}
						defaultValue={useSelector(
							(state) => state.hotspot.ssid
						)}
					/>
					<p>Password:</p>{" "}
					<input
						id="password"
						onChange={inputPassword}
						defaultValue={useSelector(
							(state) => state.hotspot.password
						)}
					/>
				</div>
				<button id="btnset" type="button" onClick={saveValues}>
					Guardar
				</button>
			</div>
		</div>
	);
}
