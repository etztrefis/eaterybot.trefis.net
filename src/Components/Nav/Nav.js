import React, { Fragment } from "react";
import { Popover, Transition } from '@headlessui/react'
import {
	ChartBarIcon,
	MenuIcon,
	ViewGridIcon,
	XIcon,
	CodeIcon
} from '@heroicons/react/outline';
import ProgressBar from "./ProgressBar/ProgressBar";

const solutions = [
	{
		name: 'Администрирование',
		href: '/admin',
		icon: ChartBarIcon,
	},
	{
		name: 'VK',
		href: 'https://vk.com/eaterybot',
		icon: ViewGridIcon,
	},
	{
		name: 'GitHub',
		href: 'https://github.com/etztrefis/eaterybot.trefis.net',
		icon: CodeIcon,
	},
]

export default function NavBar() {
	const scrollTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
	return (
		<Popover className="text-gray-600 body-font sticky top-0 z-100 backdrop-filter backdrop-blur-lg bg-white bg-opacity-50 border-b border-gray-900 border-opacity-10" style={{zIndex:"100000"}}>
			{({ open }) => (
				<>
					<ProgressBar />
					<div className="max-w-7xl mx-auto px-4 sm:px-6">
						<div className="flex justify-between items-center border-b-1 border-black py-3 md:justify-start md:space-x-10">
							<div className="flex justify-start lg:w-0 lg:flex-1">
								<a className="flex title-font font-medium items-center text-gray-900 mb-2 md:mb-0" href="/">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
									</svg>
									<span className="ml-3 text-xl mt-1 md:mt-0">Eatery Bot</span>
								</a>
							</div>
							<div className="-mr-2 -my-2 md:hidden">
								<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
									<span className="sr-only">Открыть меню</span>
									<MenuIcon className="h-6 w-6" aria-hidden="true" />
								</Popover.Button>
							</div>
							<Popover.Group as="nav" className="hidden md:flex space-x-10">
								{/* eslint-disable-next-line*/}
								<a onClick={scrollTop} className="text-base font-medium text-gray-500 hover:text-gray-900 cursor-pointer">
									Наверх
								</a>
								<a href="/admin" className="text-base font-medium text-gray-500 hover:text-gray-900">
									Администрирование
								</a>
								<a
									className="text-base font-medium text-gray-500 hover:text-gray-900"
									rel="noopener noreferrer"
									target="_blank"
									href="https://vk.com/eaterybot"
								>
									VK
								</a>
								<a
									className="text-base font-medium text-gray-500 hover:text-gray-900"
									rel="noopener noreferrer"
									target="_blank"
									href="https://github.com/etztrefis/eaterybot.trefis.net"
								>
									GitHub
								</a>
							</Popover.Group>
							<div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
								<a
									href={global.localStorage.getItem('tokens') != null ? "/admin" : "/login"}
									className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-500 hover:bg-purple-600"
								>
									Вход
									<svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 ml-2 -mt-0.5 inline-block" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
										<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
										<polyline points="10 17 15 12 10 7"></polyline>
										<line x1="15" y1="12" x2="3" y2="12"></line>
									</svg>
								</a>
								<a
									href='/signup'
									className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-500 hover:bg-purple-600"
								>
									Регистрация
									<svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 ml-2 -mt-0.5 inline-block" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
									</svg>
								</a>
							</div>
						</div>
					</div>

					<Transition
						show={open}
						as={Fragment}
						enter="duration-200 ease-out"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="duration-100 ease-in"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Popover.Panel
							focus
							static
							className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
						>
							<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
								<div className="pt-5 pb-6 px-5">
									<div className="flex items-center justify-between">
										<a className="flex title-font font-medium items-center text-purple-600 mb-4 md:mb-0" href="/">
											<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
											</svg>
											<span className="ml-3 text-xl">Eatery Bot</span>
										</a>
										<div className="-mr-2">
											<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
												<span className="sr-only">Закрыть меню</span>
												<XIcon className="h-6 w-6" aria-hidden="true" />
											</Popover.Button>
										</div>
									</div>
									<div className="mt-6">
										<nav className="grid gap-y-8">
											{solutions.map((item) => (
												<a
													key={item.name}
													href={item.href}
													rel="noopener noreferrer"
													target="_blank"
													className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
												>
													<item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
													<span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
												</a>
											))}
										</nav>
									</div>
								</div>
								<div className="py-6 px-5">
									<div>
										<a
											href='/signup'
											className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-500 hover:bg-purple-600"
										>
											Регистрация
											<svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 ml-2 -mt-0.5 inline-block" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
											</svg>
										</a>
										<p className="mt-6 text-center text-base font-medium text-gray-500">
											Уже зарегестрированы?{' '}
											<a
												href={global.localStorage.getItem('tokens') != null ? "/admin" : "/login"}
												className="text-purple-500 hover:text-purple-600"
											>
												Вход
											</a>
										</p>
									</div>
								</div>
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
}