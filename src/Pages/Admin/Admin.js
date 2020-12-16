import React from "react";
import "./Admin.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Button } from "../../Components/AuthForm/AuthForm.js";

function Admin(props) {
	function logOut() {
		localStorage.removeItem("tokens");
		props.history.push("/");
	}

	return (
		<HelmetProvider>
			<div className="App">
				<Helmet>
					<title>EateryBot | Dashboard</title>
				</Helmet>
				<Button onClick={logOut}>Log out</Button>
			</div>
		</HelmetProvider>
	);
}

export default Admin;
