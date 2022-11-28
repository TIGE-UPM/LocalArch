import React, {useState, useEffect} from 'react';

import './App.css';

function App() {
	const [app, setApp] = useState(null);

	async function loadApp() {
		const tmpApp = await window.ipcRenderer.invoke('get-running-app');
		console.log(tmpApp);
		setApp(tmpApp);
	}

	useEffect(() => {
		loadApp();
	}, []);

	console.log(app);

	if (!app) {
		return <p>No app running</p>;
	}

	return (
		<iframe className='w-100 h-100' src={`http://127.0.0.1:${app?.port}${app?.config?.adminPath}`} frameBorder="0"></iframe>
	);
}

export default App;
