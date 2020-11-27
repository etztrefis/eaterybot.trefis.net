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

	const [isError, setIsError] = useState(false);
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [passwordAgain, setPasswordAgain] = useState("");

	// fucntion postSignup(){
	// }

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
								<Input
									type="email"
									placeholder="email"
									value={userName}
									autoFocus="true"
								/>
								<div className="pass-wrapper">
									{" "}
									<Input
										type={
											passwordShown ? "text" : "password"
										}
										value={password}
										placeholder="password"
									/>
									<i onClick={togglePasswordVisiblity}>
										{eye}
									</i>{" "}
								</div>
								<Input
									type={passwordShown ? "text" : "password"}
									value={passwordAgain}
									placeholder="password again"
								/>
								<Button>Зарегестрироваться</Button>
							</Form>
							<Link to="/login" style={{ paddingBottom: "10px" }}>
								Уже есть аккаунт?
							</Link>
							<Link to="/" style={{ paddingBottom: "15px" }}>
								Назад
							</Link>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signup;
