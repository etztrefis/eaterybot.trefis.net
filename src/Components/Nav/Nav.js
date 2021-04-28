import React from "react";
import ProgressBar from "./ProgressBar/ProgressBar";

export default function NavBar() {
	const scrollTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
	return (
		<header className="text-gray-600 body-font sticky top-0 z-50 backdrop-filter backdrop-blur-lg bg-white bg-opacity-50 border-b border-gray-900 border-opacity-10">
			<ProgressBar />
			<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
				<a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="/">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
					</svg>
					<span className="ml-3 text-xl">Eatery Bot</span>
				</a>
				<nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
					<a className="mr-5 hover:text-gray-900 cursor-pointer" onClick={scrollTop}>Наверх</a>
					<a className="mr-5 hover:text-gray-900" href="/admin">Администрирование</a>
					<a
						className="mr-5 hover:text-gray-900"
						rel="noopener noreferrer"
						target="_blank"
						href="https://vk.com/eaterybot"
					>
						VK
					</a>
					<a
						className="mr-5 hover:text-gray-900"
						rel="noopener noreferrer"
						target="_blank"
						href="https://github.com/etztrefis/eaterybot.trefis.net"
					>
						GitHub
					</a>
				</nav>
				<div className="space-x-4">
					<a
						className="inline-flex items-center bg-purple-500 border-0 py-1 px-3 focus:outline-none hover:bg-purple-600 rounded text-base mt-4 md:mt-0 text-white shadow-md"
						href={global.localStorage.getItem('tokens') != null ? "/admin" : "/login"}
					>
						Войти
						<svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 ml-2 -mt-0.5 inline-block" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
							<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
							<polyline points="10 17 15 12 10 7"></polyline>
							<line x1="15" y1="12" x2="3" y2="12"></line>
						</svg>
					</a>
					<a
						className="inline-flex items-center bg-purple-500 border-0 py-1 px-3 focus:outline-none hover:bg-purple-600 rounded text-base mt-4 md:mt-0 text-white shadow-md"
						href='/signup'
					>
						Регистрация
						<svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 ml-2 -mt-0.5 inline-block" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
						</svg>
					</a>
				</div>
			</div >
		</header >
	);
}


