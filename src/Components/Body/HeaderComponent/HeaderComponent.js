import React from "react";
import "./HeaderComponent.css";

export default function HeaderComponent() {
	return (
		<section className="text-gray-600 body-font">
			<div className="container mx-auto flex px-5 py-14 md:flex-row flex-col items-center">
				<div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
					<img className="object-cover object-center rounded" draggable="false" alt="hero" src="https://dummyimage.com/720x600" />
				</div>
				<div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
					<h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Простое решение &ensp;
						<br className="hidden lg:inline-block" />Для простого бизнеса
					</h1>
					<p className="mb-8 leading-relaxed">Чат-бот как средство продвижения информационных технологий во все сферы деятельности предприятий.
						Разработан в социальной сети «ВКонтатке» для оптимизации работы столовой и оптимизации расходов на питание сотрудников организации.</p>
					<div className="flex justify-center">
						<a
							className="inline-flex text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg shadow-md"
							href="#joinus"
						>
							Присоединиться
						</a>
					</div>
				</div>
			</div>
			<div className="mouse_scroll">
				<span className="m_scroll_arrows unu"></span>
				<span className="m_scroll_arrows doi"></span>
				<span className="m_scroll_arrows trei"></span>
			</div>
		</section>

	);
}