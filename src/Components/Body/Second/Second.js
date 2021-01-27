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
						<div className="text-main-div">
							<Zoom left cascade>
								<div>
									<p className="text-header">
										ЧАТ-БОТ EATERYBOT
									</p>
									<p className="text-text">
										Разработан в социальной сети «ВКонтатке»
										для оптимизации работы столовой и
										оптимизации расходов на питание <br />
										сотрудников организации.
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
