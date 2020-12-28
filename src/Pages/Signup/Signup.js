import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
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
	Success,
} from "../../Components/AuthForm/AuthForm.js";

import "./Signup.css";

function Signup(props) {
	const eye = <FontAwesomeIcon icon={faEye} />;
	const [passwordShown, setPasswordShown] = useState(false);
	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const [isError, setIsError] = useState(false);
	const [isExists, setIsExists] = useState(false);
	const [isPasswordTheSameError, setIsPasswordTheSameError] = useState(false);
	const [isEmailValidateError, setIsEmailValidateError] = useState(false);
	const [isPasswordValidateError, setIsPasswordValidateError] = useState(
		false
	);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isValidateError, setIsValidateError] = useState(false);
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [passwordAgain, setPasswordAgain] = useState("");
	const [validateCode, setValidateCode] = useState("");

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
			if (password === passwordAgain && passwordAgain !== "") {
				setIsPasswordTheSameError(false);
				return false;
			} else {
				setIsPasswordTheSameError(true);
				return true;
			}
		}
	};

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

	const isValidateCode = async () => {
		let apiResponse = null;
		try {
			apiResponse = await axios.get(
				`http://localhost:8081/api/codes/${validateCode}`
			);
		} catch (error) {
			console.clear();
		} finally {
			if (apiResponse !== null) {
				setIsValidateError(false);
				return false;
			} else {
				setIsValidateError(true);
				return true;
			}
		}
	};

	let mainHeight = "100vh";
	let circlesHeight = "100vh";

	if (
		isError ||
		isExists ||
		isEmailValidateError ||
		isPasswordTheSameError ||
		isValidateError ||
		isPasswordValidateError
	) {
		mainHeight = "140vh";
		circlesHeight = "140vh";
	}

	function postSignup() {
		setIsExists(false);
		setIsError(false);

		setTimeout(async () => {
			if (
				!isPasswordTheSameError &&
				!isEmailValidateError &&
				!isPasswordValidateError &&
				!isValidateError
			) {
				let apiResponse = null;
				const config = {
					headers: {
						Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
					},
				};
				try {
					apiResponse = await axios.get(
						`http://localhost:8081/api/admins/create/${userName}/${password}/${validateCode}`, //CHANGE BEFORE BUILD
						config
					);
				} catch (error) {
					console.clear();
				} finally {
					if (apiResponse !== null) {
						if (apiResponse.data.message === "Already exists.") {
							setIsExists(true);
						} else {
							setIsExists(false);
							setIsError(false);
							setIsSuccess(true);
							setTimeout(() => {
								props.history.push("/login");
							}, 1500);
						}
					} else {
						setIsError(true);
					}
				}
			}
		}, 500);
	}

	return (
		<HelmetProvider>
			<div className="area">
				<ul className="circles" style={{ height: circlesHeight }}>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
			<div className="wrapper" style={{ height: mainHeight }}>
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
												passwordShown
													? "text"
													: "password"
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
										type={
											passwordShown ? "text" : "password"
										}
										value={passwordAgain}
										placeholder="password again"
										onChange={(e) => {
											setPasswordAgain(e.target.value);
										}}
										onBlur={isPasswordTheSame}
									/>
									<Input
										type="text"
										placeholder="code"
										value={validateCode}
										onChange={(e) => {
											setValidateCode(e.target.value);
										}}
										onBlur={isValidateCode}
									/>
									<Button type="button" onClick={postSignup}>
										Зарегестрироваться
									</Button>
								</Form>
								<Link
									to="/login"
									style={{ paddingBottom: "10px" }}
								>
									Уже есть аккаунт?
								</Link>
								{isExists && (
									<div className="error-wrapper">
										<Error>
											Указаная почта уже используется.
										</Error>
									</div>
								)}
								{isSuccess && (
									<div className="success-wrapper">
										<Success>
											Готово. Перенаправляем...
										</Success>
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
											Хотя бы один символ в верхнем
											регистре.
											<br />
											Хотя бы один символ в нижнем
											регистре.
											<br />
										</Error>
									</div>
								)}
								{isValidateError && (
									<Error>
										<div className="error-wrapper">
											<Error>
												Введенного кода регистрации не
												существует.
											</Error>
										</div>
									</Error>
								)}
								{isPasswordTheSameError && (
									<div className="error-wrapper">
										<Error>Пароли не совпадают.</Error>
									</div>
								)}
								{isEmailValidateError && (
									<div className="error-wrapper">
										<Error>
											Такой email не существует.
										</Error>
									</div>
								)}
								{isError && (
									<div className="error-wrapper">
										<Error>Ошибка добавления.</Error>
									</div>
								)}
								<Link to="/" style={{ paddingBottom: "25px" }}>
									Назад
								</Link>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</HelmetProvider>
	);
}

export default Signup;
