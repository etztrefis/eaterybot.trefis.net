import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./Pages/Home/Home.js";
import AdminPage from "./Pages/Admin/Admin.js";
import Login from "./Pages/Login/Login.js";
import Signup from "./Pages/Signup/Signup.js";
import Devices from "./Pages/Admin/Devices/Devices";
import Tests from "./Pages/Admin/Test/Test.js";
import Home from "./Pages/Admin/Home/Home.js";
import { AuthContext } from "./context/auth.js";
import PrivateRoute from "./Routes/PrivateRoute.js";

import "./App.css";

function App(props) {
	const existingTokens = JSON.parse(localStorage.getItem("tokens"));
	const [authTokens, setAuthTokens] = useState(existingTokens);

	const setTokens = (data) => {
		localStorage.setItem("tokens", JSON.stringify(data));
		setAuthTokens(data);
	};
	return (
		<AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
			<Router>
				<div>
					<Route exact path="/" component={HomePage} />
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<PrivateRoute path="/admin" exact component={AdminPage} />
					<PrivateRoute path="/admin/home" component={Home} />
					<PrivateRoute path="/admin/devices" component={Devices} />
					<PrivateRoute path="/admin/test" component={Tests} />
				</div>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
