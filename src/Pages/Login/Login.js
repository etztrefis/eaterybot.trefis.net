import React, { useState } from "react";
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

		let apiResponse = null;
		try {
			apiResponse = await axios.get(
				`http://localhost:8081/api/admins/${userName}/${password}` //CHANGE BEFORE BUILD
			);
		} catch (error) {
			console.clear();
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

	return (
		<HelmetProvider>
			<div className="wrapper">
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
