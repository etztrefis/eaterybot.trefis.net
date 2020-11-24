import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
// import logoImg from "../img/logo.jpg";
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
	return (
		<div className="wrapper">
			<div className="outer">
				<div className="middle">
					<div className="inner">
						<Card>
							{/* <Logo src={logoImg} /> */}
							<Header>Вход</Header>
							<Text>Перейти в панель администратора</Text>
							<Form>
								<Input type="email" placeholder="email" />
								<Input type="password" placeholder="password" />
								<Button>Войти</Button>
							</Form>
							<Link to="/signup">Первый раз на нашем сайте?</Link>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
