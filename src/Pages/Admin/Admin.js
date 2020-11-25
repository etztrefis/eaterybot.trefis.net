import React from "react";
import "./Admin.css";
import { Helmet } from "react-helmet";
import { useAuth } from "../../context/auth.js";
import { Button } from "../../Components/AuthForm/AuthForm.js";

function Admin(props) {
	const { setAuthTokens } = useAuth();

	function logOut() {
		setAuthTokens();
	}
	return (
		<div className="App">
			<Helmet>
				<title>EateryBot | Dashboard</title>
			</Helmet>
			<Button onClick={logOut}>Log out</Button>
		</div>
	);
}

export default Admin;
