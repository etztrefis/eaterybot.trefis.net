import React from "react";
import "./Admin.css";
import { HelmetProvider } from "react-helmet-async";
import SideBar from "../../Components/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Admin(props) {
	function logOut() {
		localStorage.removeItem("tokens");
		props.history.push("/");
	}

	return (
		<HelmetProvider>
			<Router>
				<SideBar />
				<Switch>
					<Route path="/admin/home" />
				</Switch>
			</Router>
		</HelmetProvider>
	);
}

export default Admin;
