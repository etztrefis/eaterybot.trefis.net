import React, { useState } from "react";
import axios from "axios";
import logoImg from "../../assets/logo.png";
import cryptJS from "crypto-js";

function Signup(props) {
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
				`${process.env.REACT_APP_API_SERVER}codes/${validateCode}`
			);
		} catch (error) {
			console.log(error);
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

	function postSignup() {
		setIsExists(false);
		setIsError(false);
		let crypt = "/";
		do {
			crypt = cryptJS.AES.encrypt(
				password,
				process.env.REACT_APP_CRYPT
			).toString();
		} while (crypt.indexOf("/") !== -1);

		setTimeout(async () => {
			if (
				!isPasswordTheSameError &&
				!isEmailValidateError &&
				!isPasswordValidateError &&
				!isValidateError
			) {
				let apiResponse = null;
				try {
					const server = `${process.env.REACT_APP_API_SERVER}`;
					const config = {
						headers: {
							Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
						},
					};
					apiResponse = await axios.get(
						`${server}admins/create/${userName}/${crypt}/${validateCode}`,
						config
					);
				} catch (error) {
					console.error(error);
				} finally {
					console.log('finally')
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
		<div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-180">
			<div className="max-w-md w-full space-y-8 bg-white p-12 rounded-xl shadow-xl border-1 border border-gray-200 border-opacity-90">
				<div>
					<img
						className="mx-auto h-24 w-auto"
						src={logoImg}
						alt="logo"
						draggable="false"
					/>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Зарегестрируйтесь в нашей системе</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Создайте аккаунт администратора в системе Eaterybot
					</p>
				</div>
				<form className="mt-8 space-y-6">
					<div className="rounded-md shadow-sm space-y-6">
						<div>
							<label htmlFor="email" className="leading-7 text-base text-gray-600">
								Почта
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoFocus={true}
								autoComplete="username"
								required
								className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
								onChange={(e) => {
									setUserName(e.target.value);
								}}
								onBlur={validateEmail}
							/>
						</div>
						<div>
							<label htmlFor="password" className="leading-7 text-base text-gray-600">
								Пароль
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="new-password"
								required
								className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								onBlur={validatePassword}
							/>
						</div>
						<div>
							<label htmlFor="passwordAgain" className="leading-7 text-base text-gray-600">
								Повторите пароль
							</label>
							<input
								id="passwordAgain"
								name="passwordAgain"
								type="password"
								autoComplete="new-password-again"
								required
								className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
								onChange={(e) => {
									setPasswordAgain(e.target.value);
								}}
								onBlur={isPasswordTheSame}
							/>
						</div>
						<div>
							<label htmlFor="code" className="leading-7 text-base text-gray-600">
								Код верификации
							</label>
							<input
								id="code"
								name="code"
								type="text"
								autoComplete="new-password"
								required
								className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
								onKeyPress={(e) => { if (e.key === 'Enter') postSignup() }}
								onChange={(e) => {
									setValidateCode(e.target.value);
								}}
								onBlur={isValidateCode}
							/>
						</div>
					</div>
					{isExists && (
						<div className="max-w-sm rounded overflow-hidden shadow-lg bg-red-200 p-4 bg-opacity-50 mx-auto text-center border border-red-300">
							<div className="text-xl mb-2">Ошибка</div>
							<p className="text-gray-700 text-base">
								Указанная почта уже используется.
							</p>
						</div>
					)}
					{isSuccess && (
						<div className="max-w-sm rounded overflow-hidden shadow-lg bg-green-200 p-4 bg-opacity-50 mx-auto text-center border border-green-300 cursor-wait">
							<div className="text-xl mb-2 inline-flex">
								<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6 animate-spin mr-2" viewBox="0 0 24 24">
									<path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
								</svg>
								Отлично!
							</div>
							<p className="text-gray-700 text-base">
								Все готово. Перенаправляем....
							</p>
						</div>
					)}
					{isPasswordValidateError && (
						<div className="max-w-sm rounded overflow-hidden shadow-lg bg-red-200 p-4 bg-opacity-50 mx-auto text-center border border-red-300">
							<div className="text-xl mb-2">Ошибка</div>
							<p className="text-gray-700 text-base">
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
							</p>
						</div>
					)}
					{isValidateError && (
						<div className="max-w-sm rounded overflow-hidden shadow-lg bg-red-200 p-4 bg-opacity-50 mx-auto text-center border border-red-300">
							<div className="text-xl mb-2">Ошибка</div>
							<p className="text-gray-700 text-base">
								Введенного кода регистрации не существует.
							</p>
						</div>
					)}
					{isPasswordTheSameError && (
						<div className="max-w-sm rounded overflow-hidden shadow-lg bg-red-200 p-4 bg-opacity-50 mx-auto text-center border border-red-300">
							<div className="text-xl mb-2">Ошибка</div>
							<p className="text-gray-700 text-base">
								Пароли не совпадают.
							</p>
						</div>
					)}
					{isEmailValidateError && (
						<div className="max-w-sm rounded overflow-hidden shadow-lg bg-red-200 p-4 bg-opacity-50 mx-auto text-center border border-red-300">
							<div className="text-xl mb-2">Ошибка</div>
							<p className="text-gray-700 text-base">
								Указанной почты не существует.
							</p>
						</div>
					)}
					{isError && (
						<div className="max-w-sm rounded overflow-hidden shadow-lg bg-red-200 p-4 bg-opacity-50 mx-auto text-center border border-red-300">
							<div className="text-xl mb-2">Ошибка</div>
							<p className="text-gray-700 text-base">
								Возникла проблема с добавление аккаунта. Обратитесь к системному администратору.
							</p>
						</div>
					)}
					<div className="pt-4 md:pt-1">
						<button
							type="button"
							className="flex mx-auto text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg shadow-lg transition duration-500"
							onClick={postSignup}
						>
							ЗАРЕГЕСТРИРОВАТЬСЯ
							<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6 ml-2" viewBox="0 0 24 24">
								<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
							</svg>
						</button>
						<p className="mt-5 text-center text-sm text-gray-600">
							Так же Вы можете
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2">
						<a
							className="flex mx-auto text-gray-900 bg-purple-200 py-2 px-8 focus:outline-none hover:bg-purple-300 shadow-lg rounded text-base transition duration-500"
							href="/"
						>
							Вернуться
						</a>
						<a
							className="flex mx-auto text-gray-900 bg-purple-200 py-2 px-8 focus:outline-none hover:bg-purple-300 shadow-lg rounded text-base transition duration-500 mt-4 md:mt-0"
							href="/login"
						>
							Войти
						</a>
					</div>
				</form>
			</div>
		</div >

		// 						<Form>
		// 							<Input
		// 								type="email"
		// 								placeholder="email"
		// 								value={userName}
		// 								autoFocus={true}
		// 								onChange={(e) => {
		// 									setUserName(e.target.value);
		// 								}}
		// 								onBlur={validateEmail}
		// 							/>
		// 							<div className="pass-wrapper">
		// 								{" "}
		// 								<Input
		// 									type={
		// 										passwordShown
		// 											? "text"
		// 											: "password"
		// 									}
		// 									value={password}
		// 									placeholder="password"
		// 									onChange={(e) => {
		// 										setPassword(e.target.value);
		// 									}}
		// 									onBlur={validatePassword}
		// 								/>
		// 								<i onClick={togglePasswordVisiblity}>
		// 									{eye}
		// 								</i>{" "}
		// 							</div>
		// 							<Input
		// 								type={
		// 									passwordShown ? "text" : "password"
		// 								}
		// 								value={passwordAgain}
		// 								placeholder="password again"
		// 								onChange={(e) => {
		// 									setPasswordAgain(e.target.value);
		// 								}}
		// 								onBlur={isPasswordTheSame}
		// 							/>
		// 							<Input
		// 								type="text"
		// 								placeholder="code"
		// 								value={validateCode}
		// 								onChange={(e) => {
		// 									setValidateCode(e.target.value);
		// 								}}
		// 								onBlur={isValidateCode}
		// 							/>
		// 							<Button type="button" onClick={postSignup}>
		// 								Зарегестрироваться
		// 							</Button>
		// 						</Form>
		// 						<Link
		// 							to="/login"
		// 							style={{ paddingBottom: "10px" }}
		// 						>
		// 							Уже есть аккаунт?
		// 						</Link>
		// 						{isExists && (
		// 							<div className="error-wrapper">
		// 								<Error>
		// 									Указаная почта уже используется.
		// 								</Error>
		// 							</div>
		// 						)}
		// 						{isSuccess && (
		// 							<div className="success-wrapper">
		// 								<Success>
		// 									Готово. Перенаправляем...
		// 								</Success>
		// 							</div>
		// 						)}
		// 						{isPasswordValidateError && (
		// 							<div className="error-wrapper">
		// 								<Error>
		// 									Минимум 8 символов.
		// 									<br />
		// 									Хотя бы одна цифра.
		// 									<br />
		// 									Хотя бы один специальный символ.
		// 									<br />
		// 									Хотя бы один символ в верхнем
		// 									регистре.
		// 									<br />
		// 									Хотя бы один символ в нижнем
		// 									регистре.
		// 									<br />
		// 								</Error>
		// 							</div>
		// 						)}
		// 						{isValidateError && (
		// 							<Error>
		// 								<div className="error-wrapper">
		// 									<Error>
		// 										Введенного кода регистрации не
		// 										существует.
		// 									</Error>
		// 								</div>
		// 							</Error>
		// 						)}
		// 						{isPasswordTheSameError && (
		// 							<div className="error-wrapper">
		// 								<Error>Пароли не совпадают.</Error>
		// 							</div>
		// 						)}
		// 						{isEmailValidateError && (
		// 							<div className="error-wrapper">
		// 								<Error>
		// 									Такой email не существует.
		// 								</Error>
		// 							</div>
		// 						)}
		// 						{isError && (
		// 							<div className="error-wrapper">
		// 								<Error>Ошибка добавления.</Error>
		// 							</div>
		// 						)}
		// 						<Link to="/" style={{ paddingBottom: "25px" }}>
		// 							Назад
		// 						</Link>
		// 					</Card>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// </HelmetProvider>
	);
}

export default Signup;
