import React from "react";
import RightSide from "./Sides/RightSide.js";
import LeftSide from "./Sides/LeftSide.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./First.css";

function First() {
	return (
		<div className="flex-container">
			<div className="wave wave1"></div>
			<div className="wave wave2"></div>
			<div className="wave wave3"></div>
			<div className="wave wave4"></div>
			<Container>
				<Row>
					<Col>
						<RightSide />
					</Col>
					<Col>
						<LeftSide />
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default First;
