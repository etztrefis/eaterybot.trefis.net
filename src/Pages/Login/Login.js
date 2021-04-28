import React, { useState } from "react";
import axios from "axios";
import cryptJS from "crypto-js";
import { Redirect } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import { useAuth } from "../../context/auth.js";

export default function LoginComponent() {
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
			console.error(error);
			setIsError(true);
		} finally {
			console.log(apiResponse);
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
		<div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-180">
			<div className="max-w-md w-full space-y-8 bg-white p-12 rounded-xl shadow-xl border-1 border border-gray-200 border-opacity-90">
				<div>
					<img
						className="mx-auto h-24 w-auto"
						src={logoImg}
						alt="logo"
						draggable="false"
					/>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Войдите в ваш аккаунт</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Перейти в панель администратора
					</p>
				</div>
				<form className="mt-8 space-y-6">
					<div className="rounded-md shadow-sm space-y-6">
						<div>
							<label htmlFor="username" className="leading-7 text-base text-gray-600">
								Почта или пользователь
							</label>
							<input
								id="username"
								name="email"
								type="username"
								autoFocus={true}
								required
								className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
								onBlur={(e) => {
									setUserName(e.target.value);
								}}
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
								onKeyPress={(e) => { if (e.key === 'Enter') postLogin() }}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</div>
					</div>
					{isError && (
						<div className="max-w-sm rounded overflow-hidden shadow-lg bg-red-200 p-4 bg-opacity-50 mx-auto text-center border border-red-300">
							<div className="text-xl mb-2">Ошибка</div>
							<p className="text-gray-700 text-base">
								Почта или пароль указаны неверно. Или учетная запись уже не существует.
							</p>
						</div>
					)}
					<div className="pt-4 md:pt-1">
						<button
							type="button"
							className="flex mx-auto text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg shadow-lg transition duration-500"
							onClick={postLogin}
						>
							ВОЙТИ
							<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6 ml-2" viewBox="0 0 24 24">
								<path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
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
							href="/signup"
						>
							Регистрация
						</a>
					</div>
				</form>
			</div>
		</div >
	);
}
