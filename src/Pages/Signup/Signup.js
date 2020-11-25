import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

import "./Signup.css";

function Signup() {
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
							<Header>Регистрация</Header>
							<Text>
								Создайте аккаунт администратора в системе
								Eaterybot
							</Text>
							<Form>
								<Input type="email" placeholder="email" />
								<div className="pass-wrapper">
									{" "}
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
								<Input
									type={passwordShown ? "text" : "password"}
									placeholder="password again"
								/>
								<Button>Зарегестрироваться</Button>
							</Form>
							<Link to="/login" style={{ paddingBottom: "15px" }}>
								Уже есть аккаунт?
							</Link>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signup;
