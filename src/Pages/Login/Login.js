import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.css";
import logoImg from "../../img/logo.png";
import {
	Card,
	Logo,
	Form,
	Input,
	Button,
	Text,
	Header,
} from "../../Components/AuthForm/AuthForm.js";

function Login() {
	const eye = <FontAwesomeIcon icon={faEye} />;
	const [passwordShown, setPasswordShown] = useState(false);
	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};
	return (
		<div className="wrapper">
			<div className="outer">
				<div className="middle">
					<div className="inner">
						<Card>
							<Logo src={logoImg} />
							<Header>Вход</Header>
							<Text>Перейти в панель администратора</Text>
							<Form>
								<Input type="email" placeholder="email" />
								<div className="pass-wrapper">
									<Input
										type={
											passwordShown ? "text" : "password"
										}
										placeholder="password"
									/>
									<i onClick={togglePasswordVisiblity}>
										{eye}
									</i>{" "}
								</div>
								<Button>Войти</Button>
							</Form>
							<Link
								to="/signup"
								style={{ paddingBottom: "15px" }}
							>
								Первый раз на нашем сайте?
							</Link>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
