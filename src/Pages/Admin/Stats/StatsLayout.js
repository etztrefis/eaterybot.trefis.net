import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import axios from 'axios';
import { XAxis, YAxis, Area, Tooltip, CartesianGrid, AreaChart, ResponsiveContainer, BarChart, Bar } from 'recharts';
import MaterialTable from 'material-table';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS('layouts') || {};
const tableRef = React.createRef();


export default class ResponsiveLocalStorageLayout extends React.PureComponent {
	_isMounted = false;

	constructor(props) {
		super(props);

		this.state = {
			layouts: JSON.parse(JSON.stringify(originalLayouts)),
			logs: [],
			dishes: [],
			messages: [],
			menu: [],
			admin: []
		};
	}

	async componentDidMount() {
		this._isMounted = true;
		const server = `${process.env.REACT_APP_API_SERVER}logs/`;
		await axios.get(server, { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } })
			.then(response => {
				if (this._isMounted) {
					this.setState({
						logs: response.data
					})
				}
			}).catch(error => {
				console.log(error);
			})

		const dishesServer = `${process.env.REACT_APP_API_SERVER}stats/dishes/`;
		await axios.get(dishesServer, { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } })
			.then(response => {
				if (this._isMounted) {
					this.setState({
						dishes: response.data.message
					})
				}
			}).catch(error => {
				console.log(error);
			})

		const messagesServer = `${process.env.REACT_APP_API_SERVER}stats/messages/`;
		await axios.get(messagesServer, { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } })
			.then(response => {
				if (this._isMounted) {
					this.setState({
						messages: response.data.message
					})
				}
			}).catch(error => {
				console.log(error);
			})

		const menuServer = `${process.env.REACT_APP_API_SERVER}stats/menu/`;
		await axios.get(menuServer, { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } })
			.then(response => {
				if (this._isMounted) {
					this.setState({
						menu: response.data.message
					})
				}
			}).catch(error => {
				console.log(error);
			})

		const adminServer = `${process.env.REACT_APP_API_SERVER}stats/admins/`;
		await axios.get(adminServer, { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } })
			.then(response => {
				if (this._isMounted) {
					this.setState({
						admin: response.data.message
					})
				}
			}).catch(error => {
				console.log(error);
			})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	static get defaultProps() {
		return {
			className: 'layout',
			cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
			rowHeight: 30,
		};
	}

	resetLayout() {
		this.setState({ layouts: {} });
	}

	onLayoutChange(layout, layouts) {
		saveToLS('layouts', layouts);
		this.setState({ layouts });
	}

	render() {
		return (
			<div>
				<ResponsiveReactGridLayout
					className="layout"
					cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
					rowHeight={30}
					layouts={this.state.layouts}
					onLayoutChange={(layout, layouts) =>
						this.onLayoutChange(layout, layouts)
					}
				>
					<div key="1" data-grid={{ w: 6, h: 9, x: 0, y: 0 }} className="shadow-xl border border-purple-400">
						<div className="grid-header-stats">Количество заказов по блюдам</div>
						<ResponsiveContainer>
							<AreaChart width={930} height={300} data={this.state.dishes}
								margin={{ top: 40, right: 30, left: 0, bottom: 0 }}>
								<defs>
									<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#7100DD" stopOpacity={0.8} />
										<stop offset="95%" stopColor="#7100DD" stopOpacity={0} />
									</linearGradient>
								</defs>
								<XAxis dataKey="Name" />
								<YAxis />
								<CartesianGrid strokeDasharray="3 3" />
								<Tooltip />
								<Area type="monotone" dataKey="Amount" stroke="#4B0082" fillOpacity={1} fill="url(#colorPv)" />
							</AreaChart>
						</ResponsiveContainer>
					</div>
					<div key="2" data-grid={{ w: 6, h: 9, x: 0, y: 9 }} className="shadow-xl border border-purple-400">
						<div className="grid-header-stats">Количество заказов в день</div>
						<ResponsiveContainer>
							<AreaChart width={930} height={250} data={this.state.menu}
								margin={{ top: 40, right: 30, left: 0, bottom: 0 }}>
								<defs>
									<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#7100DD" stopOpacity={0.8} />
										<stop offset="95%" stopColor="#7100DD" stopOpacity={0} />
									</linearGradient>
								</defs>
								<XAxis dataKey="day" />
								<YAxis />
								<CartesianGrid strokeDasharray="3 3" />
								<Tooltip />
								<Area type="monotone" dataKey="amount" stroke="#4B0082" fillOpacity={1} fill="url(#colorPv)" />
							</AreaChart>
						</ResponsiveContainer>
					</div>
					<div key="3" data-grid={{ w: 6, h: 9, x: 0, y: 18 }} className="shadow-xl border border-purple-400">
						<div className="grid-header-stats">Количество сообщений в день</div>
						<ResponsiveContainer>
							<AreaChart width={930} height={300} data={this.state.messages}
								margin={{ top: 40, right: 30, left: 0, bottom: 0 }}>
								<defs>
									<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#7100DD" stopOpacity={0.8} />
										<stop offset="95%" stopColor="#7100DD" stopOpacity={0} />
									</linearGradient>
								</defs>
								<XAxis dataKey="day" />
								<YAxis />
								<CartesianGrid strokeDasharray="3 3" />
								<Tooltip />
								<Area type="monotone" dataKey="amount" stroke="#4B0082" fillOpacity={1} fill="url(#colorPv)" />
							</AreaChart>
						</ResponsiveContainer>
					</div>
					<div key="4" data-grid={{ w: 6, h: 18, x: 6, y: 1 }} className="shadow-xl border border-purple-400">
						<MaterialTable
							title="Действия администраторов"
							tableRef={tableRef}
							data={this.state.logs}
							columns={[
								{ title: "Имя", field: 'Login', type: 'string' },
								{
									title: "Действие", field: 'Action', type: 'string',
									cellStyle: {
										backgroundColor: '#ffe3e6',
										color: 'black'
									},
								},
								{ title: "Таблица", field: 'Table', type: 'string' },
								{ title: "Дата", field: 'Date', type: 'datetime' },
							]}
							options={{
								search: false,
								addRowPosition: 'first',
								draggable: false,
								paging: true,
								pageSize: 6,
								emptyRowsWhenPaging: false,
								pageSizeOptions: [6],
							}}
							localization={{
								header: {
									actions: "Действия"
								},
								toolbar: {
									searchPlaceholder: "Поиск",
									searchTooltip: "Поиск",
									nRowsSelected: "{0} строк(и) выбрано",
								},
								pagination: {
									labelDisplayedRows: "{from}-{to} из {count}",
									labelRowsSelect: "строк",
									firstTooltip: "Первая страница",
									previousTooltip: "Предыдущая страница",
									nextTooltip: "Следующая страница",
									lastTooltip: "Последняя страница"
								},
								body: {
									addTooltip: "Новая запись",
									deleteTooltip: "Удалить",
									editTooltip: "Изменить",
									editRow: {
										deleteText: "Вы уверены, что хотите удалить эту запись?",
										saveTooltip: "Сохранить",
										cancelTooltip: "Отмена"
									}
								}
							}}
						/>
					</div>
					<div key="5" data-grid={{ w: 6, h: 9, x: 18, y: 1 }} className="shadow-xl border border-purple-400">
						<div className="grid-header-stats">Действия администраторов</div>
						<ResponsiveContainer>
							<BarChart
								width={500}
								height={300}
								data={this.state.admin}
								margin={{ top: 45, right: 30, left: 0, bottom: 0 }}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="login" />
								<YAxis />
								<Tooltip />
								<Bar dataKey="actions" fill="#7100DD" />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</ResponsiveReactGridLayout>
			</div >
		);
	}
}

function getFromLS(key) {
	let ls = {};
	if (global.localStorage) {
		try {
			ls = JSON.parse(global.localStorage.getItem('rgl-8-stats')) || {};
		} catch (e) {
			/* Ignore*/
		}
	}
	return ls[key];
}

function saveToLS(key, value) {
	if (global.localStorage) {
		global.localStorage.setItem(
			'rgl-8-stats',
			JSON.stringify({
				[key]: value,
			}),
		);
	}
}