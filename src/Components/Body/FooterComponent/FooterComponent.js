import React from "react";

export default function FooterComponent() {
	return (
		<footer className="text-gray-600 body-font border-t border-gray-900 border-opacity-10 mt-18">
			<div className="container px-5 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col mt-5">
				<div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
					<a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900" href="/">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
						<span className="ml-3 text-xl">Eatery Bot</span>
					</a>
					<p className="mt-2 text-sm text-gray-500">Продвижение информационных технологий в предприятия</p>
				</div>
				<div className="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
					<div className="lg:w-1/3 md:w-1/2 w-full px-4">
						<h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">СВЯЗЬ</h2>
						<nav className="list-none mb-10">
							<li>
								<a
									className="text-gray-600 hover:text-gray-800"
									href="https://github.com/etztrefis"
									rel="noopener noreferrer"
									target="_blank"
								>
									GitHub
								</a>
							</li>
							<li>
								<a
									className="text-gray-600 hover:text-gray-800"
									href="https://t.me/trefis"
									rel="noopener noreferrer"
									target="_blank"
								>
									Telegram
								</a>
							</li>
							<li>
								<a
									className="text-gray-600 hover:text-gray-800"
									href="mailto:trefis@pm.me"
									rel="noopener noreferrer"
									target="_blank"
								>
									E-mail
								</a>
							</li>
						</nav>
					</div>
					<div className="lg:w-1/3 md:w-1/2 w-full px-4">
						<h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">ССЫЛКИ</h2>
						<nav className="list-none mb-10">
							<li>
								<a
									className="text-gray-600 hover:text-gray-800"
									href="https://eaterybot.trefis.net/"
									rel="noopener noreferrer"
									target="_blank"
								>
									Eatery Bot
								</a>
							</li>
							<li>
								<a
									className="text-gray-600 hover:text-gray-800"
									href="https://vk.com/eaterybot"
									rel="noopener noreferrer"
									target="_blank"
								>
									ВКонтакте
								</a>
							</li>
							<li>
								<a
									className="text-gray-600 hover:text-gray-800"
									href="https://eaterybot.trefis.net/admin"
									rel="noopener noreferrer"
									target="_blank"
								>
									Администрирование
								</a>
							</li>
							<li>
								<a
									className="text-gray-600 hover:text-gray-800"
									href="https://eaterybot.trefis.net/login"
									rel="noopener noreferrer"
									target="_blank"
								>
									Вход
								</a>
							</li>
							<li>
								<a
									className="text-gray-600 hover:text-gray-800"
									href="https://eaterybot.trefis.net/signup"
									rel="noopener noreferrer"
									target="_blank"
								>
									Регистрация
								</a>
							</li>
						</nav>
					</div>
					<div className="lg:w-1/3 md:w-1/2 w-full px-4">
						<h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">ИСХОДНЫЙ КОД</h2>
						<nav className="list-none mb-10">
							<li>
								<a
									className="text-gray-600 hover:text-gray-800"
									href="https://github.com/etztrefis/eaterybot.trefis.net"
									rel="noopener noreferrer"
									target="_blank"
								>
									Front-end
								</a>
							</li>
							<li>
								<a
									className="text-gray-600 hover:text-gray-800"
									href="https://github.com/etztrefis/eaterybot-back-end"
									rel="noopener noreferrer"
									target="_blank"
								>
									Back-end
								</a>
							</li>
							<li>
								<a
									className="text-gray-600 hover:text-gray-800"
									href="https://github.com/etztrefis/vk-bot"
									rel="noopener noreferrer"
									target="_blank"
								>
									VK Bot
								</a>
							</li>
						</nav>
					</div>
				</div>
			</div>
			<div className="bg-white mt-6">
				<div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
					<p className="text-gray-500 text-sm text-center sm:text-left">Copyright &copy; 2021 Все права защищены —
						<a href="https://trefis.net" rel="noopener noreferrer" className="text-gray-600 ml-1 hover:text-purple-600" target="_blank">trefis</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
