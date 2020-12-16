import React from "react";
import ProgressBar from "./ProgressBar/ProgressBar.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import AnchorLink from "react-anchor-link-smooth-scroll";
import "./Nav.css";

function NavBar() {
	return (
		<div className="Nav">
			<ProgressBar />
			<Navbar
				className="main-nav"
				variant="dark"
				style={{
					fontFamily: "Raleway, sans-serif",
					paddingLeft: "50px",
					fontSize: "19px",
					backdropFilter: "blur(5px)",
				}}
			>
				<Navbar.Brand href="/">
					<img
						alt=""
						src="favicon.png"
						width="30"
						height="30"
						className="d-inline-block align-top"
					/>{" "}
					Eatery Bot
				</Navbar.Brand>
				<Nav className="mr-auto">
					<AnchorLink
						href="#home"
						style={{
							textDecoration: "none",
							color: "rgba(255, 255, 255, 0.5)",
							display: "block",
							padding: " .5rem 1rem",
						}}
					>
						Home
					</AnchorLink>
					<Nav.Link href="#features">Features</Nav.Link>
					<Nav.Link href="#pricing">Pricing</Nav.Link>
				</Nav>
				<Form inline>
					<Nav className="mr-auto" style={{ paddingRight: "10px" }}>
						<Nav.Link
							target="_blank"
							href="https://github.com/etztrefis/eaterybot.trefis.net"
						>
							GitHub
						</Nav.Link>
						<Nav.Link
							target="_blank"
							href="https://vk.com/eaterybot"
						>
							VK
						</Nav.Link>
					</Nav>
					<Button variant="outline-light" href="/login">
						Login
					</Button>
				</Form>
			</Navbar>
		</div>
	);
}

export default NavBar;
