import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useAuth } from "../../context/auth.js";
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
	Error,
} from "../../Components/AuthForm/AuthForm.js";
import cryptJS from "crypto-js";

function Login(props) {
	const eye = <FontAwesomeIcon icon={faEye} />;
	const [passwordShown, setPasswordShown] = useState(false);
	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const [isLoggedIn, setLoggedIn] = useState(false);
	const [isError, setIsError] = useState(false);
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const { setAuthTokens } = useAuth();

	async function postLogin() {
		setIsError(false);

		let crypt = "/";

		do {
			crypt = cryptJS.AES.encrypt(
				password,
				process.env.REACT_APP_CRYPT
			).toString();
		} while (crypt.indexOf("/") !== -1);

		let apiResponse = null;
		try {
			const server = `${process.env.REACT_APP_API_SERVER}`;
			const config = {
				headers: {
					Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
				},
			};
			apiResponse = await axios.get(
				`${server}admins/${userName}/${crypt}`, config
			);
		} catch (error) {
			// console.clear();
			console.error(error);
			setIsError(true);
		} finally {
			if (apiResponse !== null) {
				setAuthTokens(apiResponse.data);
				setLoggedIn(true);
			} else {
				setIsError(true);
			}
		}
	}

	if (isLoggedIn) {
		return <Redirect to={"/admin"} />;
	}

	let mainHeight = "100vh";
	let circlesHeight = "100vh";

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
								<Header>Вход</Header>
								<Text>Перейти в панель администратора</Text>
								<Form>
									<Input
										type="username"
										value={userName}
										onChange={(e) => {
											setUserName(e.target.value);
										}}
										onKeyPress={(e) => {e.key === 'Enter' ? postLogin() : null}}
										placeholder="email"
										autoFocus={true}
									/>
									<div className="pass-wrapper">
										<Input
											type={
												passwordShown
													? "text"
													: "password"
											}
											value={password}
											onChange={(e) => {
												setPassword(e.target.value);
											}}
											onKeyPress={(e) => {e.key === 'Enter' ? postLogin() : null}}
											placeholder="password"
										/>
										<i onClick={togglePasswordVisiblity}>
											{eye}
										</i>{" "}
									</div>
									<Button type="button" onClick={postLogin}>
										Войти
									</Button>
								</Form>
								<Link
									to="/signup"
									style={{ paddingBottom: "10px" }}
								>
									Первый раз на нашем сайте?
								</Link>
								{isError && (
									<div className="error-wrapper">
										<Error>
											Почта или пароль указаны неверно.
											Или учетная запись уже не
											существует.
										</Error>
									</div>
								)}
								<Link
									to="/"
									style={{
										paddingBottom: "25px",
										paddingTop: "10px",
									}}
								>
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

export default Login;
