import React from "react";
import "./Admin.css";
import { HelmetProvider } from "react-helmet-async";

function Admin(props) {
	function logOut() {
		localStorage.removeItem("tokens");
		props.history.push("/");
	}

	return <HelmetProvider></HelmetProvider>;
}

export default Admin;
