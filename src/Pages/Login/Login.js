import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../context/auth.js";
import axios from "axios";
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

	function postLogin() {
		axios
			.post("https://www.eaterybot.trefis.net/login", {
				userName,
				password,
			})
			.then((result) => {
				if (result.status === 200) {
					setAuthTokens(result.data);
					setLoggedIn(true);
				} else {
					setIsError(true);
				}
			})
			.catch((e) => {
				setIsError(true);
			});
	}

	const referer = props.location.state.referer || "/";

	if (isLoggedIn) {
		return <Redirect to={referer} />;
	}

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
								<Input
									type="username"
									value={userName}
									onChange={(e) => {
										setUserName(e.target.value);
									}}
									placeholder="email"
								/>
								<div className="pass-wrapper">
									<Input
										type={
											passwordShown ? "text" : "password"
										}
										value={
											passwordShown ? "text" : "password"
										}
										onChange={(e) => {
											setPassword(e.target.value);
										}}
										placeholder="password"
									/>
									<i onClick={togglePasswordVisiblity}>
										{eye}
									</i>{" "}
								</div>
								<Button onClick={postLogin}>Войти</Button>
							</Form>
							<Link
								to="/signup"
								style={{ paddingBottom: "15px" }}
							>
								Первый раз на нашем сайте?
							</Link>
							{isError && (
								<Error>Почта или пароль указаны неверно.</Error>
							)}
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
