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
	Error,
} from "../../Components/AuthForm/AuthForm.js";

import "./Signup.css";

function Signup() {
	const eye = <FontAwesomeIcon icon={faEye} />;
	const [passwordShown, setPasswordShown] = useState(false);
	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const [isError, setIsError] = useState(false);
	const [isPasswordTheSameError, setIsPasswordTheSameError] = useState(false);
	const [isEmailValidateError, setIsEmailValidateError] = useState(false);
	const [isPasswordValidateError, setIsPasswordValidateError] = useState(
		false
	);
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [passwordAgain, setPasswordAgain] = useState("");

	const isPasswordTheSame = () => {
		if (password === passwordAgain && passwordAgain !== "") {
			setIsPasswordTheSameError(false);
			return false;
		} else {
			setIsPasswordTheSameError(true);
			return true;
		}
	};

	const validateEmail = () => {
		const reg = new RegExp(
			//eslint-disable-next-line
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
		const result = userName.match(reg);
		if (result === null && userName !== "") {
			setIsEmailValidateError(true);
			return false;
		} else {
			setIsEmailValidateError(false);
			return true;
		}
	};

	const validatePassword = () => {
		const reg = new RegExp(
			/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
		);
		const result = password.match(reg);
		if (result === null && password !== "") {
			setIsPasswordValidateError(true);
			return false;
		} else {
			setIsPasswordValidateError(false);
			return true;
		}
	};

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
									autoFocus={true}
									onChange={(e) => {
										setUserName(e.target.value);
									}}
									onBlur={validateEmail}
								/>
								<div className="pass-wrapper">
									{" "}
									<Input
										type={
											passwordShown ? "text" : "password"
										}
										value={password}
										placeholder="password"
										onChange={(e) => {
											setPassword(e.target.value);
										}}
										onBlur={validatePassword}
									/>
									<i onClick={togglePasswordVisiblity}>
										{eye}
									</i>{" "}
								</div>
								<Input
									type={passwordShown ? "text" : "password"}
									value={passwordAgain}
									placeholder="password again"
									onChange={(e) => {
										setPasswordAgain(e.target.value);
									}}
									onBlur={isPasswordTheSame}
								/>
								<Button>Зарегестрироваться</Button>
							</Form>
							<Link to="/login" style={{ paddingBottom: "10px" }}>
								Уже есть аккаунт?
							</Link>
							{isPasswordTheSameError && (
								<div className="error-wrapper">
									<Error>Пароли не совпадают.</Error>
								</div>
							)}
							{isEmailValidateError && (
								<div className="error-wrapper">
									<Error>Такой email не существует.</Error>
								</div>
							)}
							{isPasswordValidateError && (
								<div className="error-wrapper">
									<Error>
										Минимум 8 символов.
										<br />
										Хотя бы одна цифра.
										<br />
										Хотя бы один специальный символ.
										<br />
										Хотя бы один символ в верхнем регистре.
										<br />
										Хотя бы один символ в нижнем регистре.
										<br />
									</Error>
								</div>
							)}
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
