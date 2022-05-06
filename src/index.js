import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./Main";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Settings from "./Settings";
import Qrcode from "./Qrcode";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Main />}>
						<Route path="" element={<Home />} />
						<Route path="settings" element={<Settings />} />
						<Route path="qrcode" element={<Qrcode />} />
					</Route>
					<Route
						path="*"
						element={
							<main>
								<h1>
									Aquí no hay nada, creo que te has perdido.
								</h1>
								<p>
									<Link to={"/"}>
										Vuelve a casa, como el Almendro
									</Link>
								</p>
							</main>
						}
					/>
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
