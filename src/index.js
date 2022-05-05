import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./Main";
import store from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Main />
		</Provider>
	</React.StrictMode>
);
