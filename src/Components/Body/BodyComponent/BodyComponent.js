import React from "react";
import poster from "../../../assets/poster.png";
import menuVideo from "../../../assets/video/menu.mp4";
import addVideo from "../../../assets/video/add.mp4";
import commsVideo from "../../../assets/video/comms.mp4";
import otherVideo from "../../../assets/video/other.mp4";

export default function BodyComponent() {
	return (
		<>
			<section className="text-gray-600 body-font pb-12">
				<div className="container px-5 mx-auto">
					<div className="flex flex-wrap -m-4">
						<div className="xl:w-1/3 md:w-1/2 p-4">
							<div className="p-6 rounded-lg bg-white">
								<div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-purple-200 text-purple-600 mb-4">
									<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
										<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
									</svg>
								</div>
								<h2 className="text-lg text-gray-900 font-medium title-font mb-2">Простота</h2>
								<p className="leading-relaxed text-base">Работаем в социальной сети "ВКонтакте", доступ к интерфейсу предоставляется прямо из диалогов.</p>
							</div>
						</div>
						<div className="xl:w-1/3 md:w-1/2 p-4">
							<div className="p-6 rounded-lg bg-white">
								<div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-purple-200 text-purple-600 mb-4">
									<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
										<path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>

									</svg>
								</div>
								<h2 className="text-lg text-gray-900 font-medium title-font mb-2">Надежность</h2>
								<p className="leading-relaxed text-base">Будте увернны в безотказной работе нашего приложения в любое удобное для Вас время.</p>
							</div>
						</div>
						<div className="xl:w-1/3 md:w-1/2 p-4">
							<div className="p-6 rounded-lg bg-white">
								<div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-purple-200 text-purple-600 mb-4">
									<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
										<path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
									</svg>
								</div>
								<h2 className="text-lg text-gray-900 font-medium title-font mb-2">Открытый исходный код</h2>
								<p className="leading-relaxed text-base">Честность сохранности ваших данных обуславливается открытым исходным кодом нашего приложения.</p>
							</div>
						</div>
						<div className="xl:w-1/3 md:w-1/2 p-4">
							<div className="p-6 rounded-lg bg-white">
								<div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-purple-200 text-purple-600 mb-4">
									<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
										<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
									</svg>
								</div>
								<h2 className="text-lg text-gray-900 font-medium title-font mb-2">Безопасность</h2>
								<p className="leading-relaxed text-base">Мы используем современные способы защиты ваших персональных данных и конфиденциальной информации.</p>
							</div>
						</div>
						<div className="xl:w-1/3 md:w-1/2 p-4">
							<div className="p-6 rounded-lg bg-white">
								<div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-purple-200 text-purple-600 mb-4">
									<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
										<path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
									</svg>
								</div>
								<h2 className="text-lg text-gray-900 font-medium title-font mb-2">Скорость</h2>
								<p className="leading-relaxed text-base">Гарантируем быстрый отклик нашей службы поддержки, мы предоставляем достоверную и доступную информацию.</p>
							</div>
						</div>
						<div className="xl:w-1/3 md:w-1/2 p-4">
							<div className="p-6 rounded-lg bg-white">
								<div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-purple-200 text-purple-600 mb-4">
									<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
										<path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
									</svg>
								</div>
								<h2 className="text-lg text-gray-900 font-medium title-font mb-2">Интерфейс</h2>
								<p className="leading-relaxed text-base">Интуитивно понятный, быстрый и отзывчивый интерфейс, подойдет для каждого пользователя системы.</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="text-gray-600 body-font py-24">
				{/* First mobile-component */}
				<div className="container flex flex-wrap px-5 py-5 mx-auto items-center bg-white rounded-xl">
					<div className="md:w-1/2 md:pr-12 md:py-8 md:border-r md:border-b-0 mb-10 md:mb-0 pb-10 border-b border-purple-400 border-opacity-90">
						<h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Команда получения меню</h1>
						<p className="leading-relaxed text-lg">С помощью команды<span className="font-mono text-purple-600">!меню</span> пользователь может получить меню на следующий день, а так же дополнительную информацию, такую как цена и калорийность блюда.</p>
					</div>
					<div className="flex flex-col md:w-1/2 md:pl-12">
						<video
							className="rounded-xl object-cover object-center shadow-xl self-center"
							width="350"
							poster={poster}
							src={menuVideo}
							loop autoPlay muted
							playsInline disablePictureInPicture={true}
						></video>
					</div>
				</div>
				{/* Second mobile-component */}
				<div className="container flex flex-wrap px-5 py-5 mx-auto items-center bg-white rounded-xl">
					<div className="flex flex-col md:w-1/2 md:pl-12">
						<video
							className="rounded-xl object-cover object-center shadow-xl self-center"
							width="350"
							poster={poster}
							src={addVideo}
							loop autoPlay muted
							playsInline disablePictureInPicture={true}
						></video>
					</div>
					<div className="md:w-1/2 md:pl-12 md:py-8 md:border-l md:border-b-0 mb-10 md:mb-0 pb-10 border-b border-purple-400 border-opacity-90 mt-6">
						<h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Команда заказа блюд</h1>
						<p className="leading-relaxed text-lg">С помощью команды<span className="font-mono text-purple-600">!добавить</span> пользователь может заказать выбранные им блюда, для оплаты на следующий день, обязательно требудется подтверждение. Если продуктов для изготовления блюд надостаточно, заказ отменяется и выводится сообщение об ошибке.</p>
					</div>
				</div>
				{/* Third mobile-component */}
				<div className="container flex flex-wrap px-5 py-5 mx-auto items-center bg-white rounded-xl">
					<div className="md:w-1/2 md:pr-12 md:py-8 md:border-r md:border-b-0 mb-10 md:mb-0 pb-10 border-b border-purple-400 border-opacity-90">
						<h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Команды для получения дополнительной информации о заказе</h1>
						<p className="leading-relaxed text-lg">С помощью команд<span className="font-mono text-purple-600">!заказ,!статус,!qr</span> пользователь может получить дополнительную или повторную информацию о его заказе, статусе изготовления блюд и qr-коде. При обновлении статуса изготовления блюда сообщение приходит автоматически.</p>
					</div>
					<div className="flex flex-col md:w-1/2 md:pl-12">
						<video
							className="rounded-xl object-cover object-center shadow-xl self-center"
							width="350"
							poster={poster}
							src={otherVideo}
							loop autoPlay muted
							playsInline disablePictureInPicture={true}
						></video>
					</div>
				</div>
				{/* Fourth mobile-component */}
				<div className="container flex flex-wrap px-5 py-5 mx-auto items-center bg-white rounded-xl">
					<div className="flex flex-col md:w-1/2 md:pl-12 mb-4">
						<video
							className="rounded-xl object-cover object-center shadow-xl self-center"
							width="350"
							poster={poster}
							src={commsVideo}
							loop autoPlay muted
							playsInline disablePictureInPicture={true}
						></video>
					</div>
					<div className="md:w-1/2 md:pl-12 md:py-8 md:border-l md:border-b-0 mb-10 md:mb-0 pb-10 border-b border-purple-400 border-opacity-90 mt-6">
						<h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Команда просмотра доступных команд</h1>
						<p className="leading-relaxed text-lg">С помощью команды<span className="font-mono text-purple-600">!комманды</span> пользователь может просмотреть доступные ему команды, на которые точно может ответить чат-бот.</p>
					</div>
				</div>
			</section>
			<section className="text-gray-600 body-font bg-body-textured bg-fixed">
				<div className="container px-5 py-20 mx-auto">
					<div className="flex flex-col text-center w-full mb-20">
						<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Что Вы получаете, если Вы с нами</h1>
						<p className="lg:w-2/3 mx-auto leading-relaxed text-base">Кроме услуг чат-бота и сервиса администрирования Вы так же получаете:&ensp;
							<span className="hover:text-purple-500">статистику</span>,&ensp;
							<span className="hover:text-purple-600">контроль</span>,&ensp;
							<span className="hover:text-purple-700">прибыль</span>&ensp;и&ensp;
							<span className="hover:text-purple-800">опыт</span>.
						</p>
					</div>
					<div className="flex flex-wrap">
						<div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-purple-400 border-opacity-60">
							<h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Статистика</h2>
							<p className="leading-relaxed text-base mb-4">Вы получаете полную статистику в виде графов и диаграмм, о количестве заказов, видах блюд, количестве сообщений и действиях администраторов.</p>
						</div>
						<div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-purple-400 border-opacity-60">
							<h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Контроль</h2>
							<p className="leading-relaxed text-base mb-4">В вашем распоряжении все доступные данные, вклюая данные о пользователях, администраторах, продуктах и расходах.</p>
						</div>
						<div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-purple-400 border-opacity-60">
							<h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Прибыль</h2>
							<p className="leading-relaxed text-base mb-4">Вместе с контролем расходов приходит понимание того, какое среднее количество продуктов Вам необходимо заказывать, чтобы обслужить Ваше количество пользователей.</p>
						</div>
						<div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-purple-400 border-opacity-60" >
							<h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Опыт</h2>
							<p className="leading-relaxed text-base mb-4">Применение таких технологий в Вашем бизнесе, дает отличное понимание того, насколько важно оптимизировать и автоматизировать процессы в производстве. А так же именно Вы можете помочь развитию приложения.</p>
						</div>
					</div>
				</div>
			</section>
			<section className="text-gray-600 body-font relative" id="joinus">
				<div className="container px-5 py-36 mx-auto">
					<div className="flex flex-col text-center w-full mb-5">
						<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Присоединяйтесь к нам</h1>
					</div>
					<div className="lg:w-1/2 md:w-2/3 mx-auto">
						<div className="flex flex-wrap -m-2">
							<div className="p-2 w-1/2">
								<div className="relative">
									<label htmlFor="name" className="leading-7 text-base text-gray-600">Имя</label>
									<input type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
								</div>
							</div>
							<div className="p-2 w-1/2">
								<div className="relative">
									<label htmlFor="email" className="leading-7 text-base text-gray-600">E-mail</label>
									<input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
								</div>
							</div>
							<div className="p-2 w-full">
								<div className="relative">
									<label htmlFor="message" className="leading-7 text-base text-gray-600">Сообщение</label>
									<textarea id="message" name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
								</div>
							</div>
							<div className="p-6 w-full">
								<button className="flex mx-auto text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg shadow-lg transition duration-500">ОТПРАВИТЬ СООБЩЕНИЕ</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
