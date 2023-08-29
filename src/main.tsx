import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css"; // styling the toast notification
import App from "./App.tsx";
import "./index.css";

import store from "./store/store.ts";

const root = document.getElementById("root");

// this should never happen, just to make typescript happy
if (!root) {
	throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<Provider store={store}>
			<ToastContainer
				position="bottom-left"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
			<App />
		</Provider>
	</React.StrictMode>,
);
