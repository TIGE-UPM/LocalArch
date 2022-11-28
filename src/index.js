import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';


import Main from './Main';
import store from './redux/store';

import Home from './Home';
import Settings from './Settings';
import AppsManager from './AppsManager';
import App from './App';
import QrcodeView from './Qrcode';

import '@Styles/global.scss';
import '@Styles/reset.scss';
import '@Styles/utils/index.scss';

(async () => {
	const root = ReactDOM.createRoot(document.getElementById('root'));
	root.render(
		<React.StrictMode>
			<Provider store={store}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Main />}>
							<Route path="" element={<Home />} />
							<Route path="settings" element={<Settings />} />
							<Route path="settings/apps" element={<AppsManager />} />
							<Route path="qrcode" element={<QrcodeView />} />
							<Route path="app" element={<App />} />
						</Route>
						<Route
							path="*"
							element={
								<main>
									<h1>
									Aquí no hay nada, creo que te has perdido.
									</h1>
									<p>
										<Link to={'/'}>
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
})();

