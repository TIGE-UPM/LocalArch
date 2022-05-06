import "./Qrcode.css";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";

export default function Qrcode() {
	const ssidQrcode = useSelector((state) => state.hotspot.ssid);
	const passwordQrcode = useSelector((state) => state.hotspot.password);

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
