import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Zoom from "react-reveal/Zoom";
import "./Second.css";

function Second() {
	return (
		<Container fluid style={{ backgroundColor: "white" }}>
			<Row>
				<Col>
					<div className="second-main">
						<div
							className="text-main-div"
							style={{ paddingTop: "50px" }}
						>
							<Zoom left cascade>
								<div>
									<p className="text-header">
										Чат-бот EateryBot
									</p>
									<p className="text-text">Практичность ⚙ </p>
									<p className="text-text">Надежность 🔒</p>
									<p className="text-text">Безопасность</p>
									<p className="text-text">
										Открытый исходный код 🔧
									</p>
									<p className="text-text">Безопасность 🔑</p>
									<p className="text-text">
										fsdfasdfasdfasdfasdf Okayeg
									</p>
								</div>
							</Zoom>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default Second;
