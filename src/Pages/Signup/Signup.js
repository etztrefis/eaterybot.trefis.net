import React from "react";
import { Link } from "react-router-dom";
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

function Signup() {
	return (
		<div className="wrapper">
			<div className="outer">
				<div className="middle">
					<div className="inner">
						<Card>
							{/* <Logo src={logoImg} /> */}
							<Header>Регистрация</Header>
							<Text>
								Создайте аккаунт администратора в системе
								Eaterybot
							</Text>
							<Form>
								<Input type="email" placeholder="email" />
								<Input type="password" placeholder="password" />
								<Input
									type="password"
									placeholder="password again"
								/>
								<Button>Зарегестрироваться</Button>
							</Form>
							<Link to="/login">Уже есть аккаунт?</Link>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signup;
