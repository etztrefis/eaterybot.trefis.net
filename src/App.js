import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./Pages/Home/Home.js";
import AdminPage from "./Pages/Admin/Admin.js";
import Login from "./Pages/Login/Login.js";
import Signup from "./Pages/Signup/Signup.js";
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
					<PrivateRoute path="/admin/" component={AdminPage} />
				</div>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
