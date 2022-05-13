import "./Qrcode.css";
import QRCode from "react-qr-code";
import { useSelector, useDispatch } from "react-redux";
import { setHotspotValues } from "../redux/hotspotSlice";

export default function QrcodeView() {
	let ssidQrcode = useSelector((state) => state.hotspot.ssid);
	let passwordQrcode = useSelector((state) => state.hotspot.password);
	const dispatch = useDispatch();

	/*let ssidQrcode;
	let passwordQrcode;*/
	settingQrcode();
	async function settingQrcode() {
		console.log("qrcode");
		const datas = await window.electronAPI.getSettings();
		ssidQrcode = datas.ssid;
		passwordQrcode = datas.password;
		console.log(ssidQrcode);
		console.log(passwordQrcode);
		//isLoadingFunc = false;
		let valuesObject = { ssid: ssidQrcode, password: passwordQrcode };
		dispatch(setHotspotValues(valuesObject));
	}

	return (
		<div className="qrcode-gen-div">
			<div className="qrcode-hotspot">
				<h1>Hotspot</h1>
				<div>
					<QRCode
						value={`WIFI:T:WPA;S:${ssidQrcode};P:${passwordQrcode};H:flase;`}
					/>
				</div>
				<p>SSID: {ssidQrcode}</p>
				<p>Contraseña: {passwordQrcode}</p>
			</div>
			<div className="qrcode-webpage">
				<h1>Webpage</h1>
				<div>
					<QRCode value="http://192.168.137.1:3000" />
				</div>
				<p>Web: http://192.168.137.1:3000 </p>
			</div>
		</div>
	);
}
