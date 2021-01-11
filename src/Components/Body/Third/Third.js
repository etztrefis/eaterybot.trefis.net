import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RightSide from "./Sides/RightSide.js";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ComputerIcon from "@material-ui/icons/Computer";
import SettingsIcon from "@material-ui/icons/Settings";
import LockIcon from "@material-ui/icons/Lock";
import BuildIcon from "@material-ui/icons/Build";
import Fade from "react-reveal/Fade";

import "./Third.css";

function Third() {
	return (
		<div className="third-main">
			<Container style={{ paddingTop: "50px" }}>
				<Row>
					<Col xs={6} md={4}>
						<Fade left cascade>
							<div>
								<div className="inside-box-content">
									<div className="inside-box-content-header">
										ПРОСТОТА{" "}
										<SettingsIcon
											style={{ marginTop: "-5px" }}
										/>
									</div>
									<center>
										<hr className="inside-box-content-hr"></hr>
									</center>
									<div className="inside-box-content-text">
										Работаем в социальной сети "ВКонтакте",
										доступ к интерфейсу предоставляется
										прямо из диалогов.
									</div>
								</div>
								<div className="inside-box-content">
									<div className="inside-box-content-header">
										НАДЕЖНОСТЬ{" "}
										<LockIcon
											style={{ marginTop: "-5px" }}
										/>
									</div>
									<center>
										<hr className="inside-box-content-hr"></hr>
									</center>
									<div className="inside-box-content-text">
										Будте увернны в безотказной работе в
										любое удобное для Вас время.
									</div>
								</div>
								<div className="inside-box-content">
									<div className="inside-box-content-header">
										ОТКРЫТЫЙ ИСХОДНЫЙ КОД{" "}
										<BuildIcon
											style={{ marginTop: "-5px" }}
										/>
									</div>
									<center>
										<hr className="inside-box-content-hr"></hr>
									</center>
									<div className="inside-box-content-text">
										Честность сохранности ваших данных
										обуславливается открытым исходным кодом
										нашего приложения.
									</div>
								</div>
							</div>
						</Fade>
					</Col>
					<Col xs={6} md={4}>
						<Fade left cascade>
							<div>
								<div className="inside-box-content">
									<div className="inside-box-content-header">
										БЕЗОПАСНОСТЬ{" "}
										<VpnKeyIcon
											style={{ marginTop: "-5px" }}
										/>
									</div>
									<center>
										<hr className="inside-box-content-hr"></hr>
									</center>
									<div className="inside-box-content-text">
										Мы используем современные способы защиты
										ваших персональных данных
										конфиденциальной информации.
									</div>
								</div>
								<div className="inside-box-content">
									<div className="inside-box-content-header">
										СКОРОСТЬ{" "}
										<AccessTimeIcon
											style={{ marginTop: "-5px" }}
										/>
									</div>
									<center>
										<hr className="inside-box-content-hr"></hr>
									</center>
									<div className="inside-box-content-text">
										Гарантируем быстрый отклик нашей службы
										поддержки.
									</div>
								</div>
								<div className="inside-box-content">
									<div className="inside-box-content-header">
										ИНТЕРФЕЙС{" "}
										<ComputerIcon
											style={{ marginTop: "-5px" }}
										/>
									</div>
									<center>
										<hr className="inside-box-content-hr"></hr>
									</center>
									<div className="inside-box-content-text">
										Интуитивно понятный для каждого и
										отзывчивый пользовательский интерфейс
									</div>
								</div>
							</div>
						</Fade>
					</Col>

					<Col xs={6} md={4}>
						<RightSide />
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Third;
