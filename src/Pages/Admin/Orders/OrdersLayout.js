import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { Button } from 'react-bootstrap';
import MaterialTable from 'material-table';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS('layouts') || {};
const tableRef = React.createRef();
import axios from 'axios';

export default class ResponsiveLocalStorageLayout extends React.PureComponent {
	_isMounted = false;

	constructor(props) {
		super(props);

		this.state = {
			layouts: JSON.parse(JSON.stringify(originalLayouts)),
			menu: [],
			orders: [],
			products: []
		};
	}

	async componentDidMount() {
		this._isMounted = true;
		const server = `${process.env.REACT_APP_API_SERVER}menu/`;
		const secondServer = `${process.env.REACT_APP_API_SERVER}orders/`;
		const thirdServer = `${process.env.REACT_APP_API_SERVER}menu/dishes/`
		await axios.get(server, { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } })
			.then(response => {
				if (this._isMounted) {
					this.setState({
						menu: response.data.message
					})
				}
			}).catch(error => {
				console.log(error);
			})
		await axios.get(secondServer, { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } })
			.then(response => {
				if (this._isMounted) {
					this.setState({
						orders: response.data.message
					})
				}
			}).catch(error => {
				console.log(error);
			})
		await axios.get(thirdServer, { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } })
			.then(response => {
				if (this._isMounted) {
					this.setState({
						products: response.data.message
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

	async handeTableClear() {
		const server = `${process.env.REACT_APP_API_SERVER}menu/destroy`;
		await axios.get(server, { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } })
			.catch(error => {
				console.log(error);
			})
	}

	render() {
		let username;
        if(global.localStorage.getItem('tokens') != null){
            const localArray =global.localStorage.getItem('tokens').split(" ");
            const stringLocalArray = localArray[1].toString();
            username = stringLocalArray.substring(0, stringLocalArray.length - 2);
        }
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
					<div key="1" data-grid={{ w: 6, h: 5, x: 0, y: 0, static: true }} >
						<div className="grid-header">Очистить таблицу</div>
						<div className="grid-text">Данное действие удалит все записи из таблицы меню, его можно использовать только в случе, если вам необходимо создать меню на новую неделю.</div>
						<div className="grid-text" style={{ paddingTop: "5px" }}>Данные <b style={{ color: "red" }}>НЕ БУДУТ СОХРАНЕНЫ</b>, их уже никак не вернуть.</div>
						<div style={{ paddingLeft: "24px", paddingTop: "10px" }}>
							<Button variant="danger" onClick={this.handeTableClear}>
								Очистить
							</Button>
						</div>
					</div>
					<div key="2" data-grid={{ w: 6, h: 23, x: 0, y: 0, static: true }}>
						<MaterialTable
							title="Меню"
							tableRef={tableRef}
							data={this.state.menu}
							columns={[
								{ title: 'День недели', field: 'DayOfWeek', lookup: { "Понедельник": "Понедельник", "Вторник": "Вторник", "Среда": "Среда", "Четверг": "Четверг", "Пятница": "Пятница", } },
								{ title: 'Название блюда', field: 'Name', lookup: Object.assign({}, this.state.products) },
							]}
							options={{
								addRowPosition: 'first',
								draggable: false,
								paging: true,
								pageSize: 12,
								emptyRowsWhenPaging: false,
								pageSizeOptions: [12],
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
							editable={{
								onRowAdd: async (newData) => {
									console.log(newData.Name);
									if (newData.DayOfWeek !== undefined && newData.Name !== undefined) {
										const server = `${process.env.REACT_APP_API_SERVER}menu/create/${newData.DayOfWeek}/${newData.Name}/${username}`;
										await axios.get(server, { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } })
											.then(response => {
												if (response.status == 200) {
													this.componentDidMount();
												} else {
													console.error('404 error ' + response);
													alert(`Ошибка при получении ответа от сервера: ${response.data.message}`)
												}
											})
											.catch(error => {
												console.error(error);
												alert(`Ошибка во время исполнения: ${error}`);
											})
									} else {
										alert("Для создания новой записи необходимо заполнить все поля.");
									}
									new Promise((resolve, reject) => {
										setTimeout(() => {
											resolve()
										}, 1000)
									})
								},
								onRowDelete: async (oldData) => {
									const server = `${process.env.REACT_APP_API_SERVER}menu/delete/${oldData.DayOfWeek}/${oldData.Name}/${username}`;
									await axios.get(server, { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } })
										.then(response => {
											if (response.status == 200) {
												this.componentDidMount();
											} else {
												console.error('404 error ' + response);
												alert(`Ошибка при получении ответа от сервера: ${response.data.message}`)
											}
										})
										.catch(error => {
											console.error(error);
											alert(`Ошибка во время исполнения: ${error}`);
										})
									new Promise((resolve, reject) => {
										setTimeout(() => {
											resolve()
										}, 1000)
									})
								}
							}
							}
						/>
					</div>
					<div key="3" data-grid={{ w: 6, h: 28, x: 6, y: 0, static: true }}>
						<MaterialTable
							title="Заказы"
							tableRef={tableRef}
							data={this.state.orders}
							columns={[
								{ title: 'ID', field: 'ID' },
								{ title: 'Имя', field: 'FirstName' },
								{ title: 'Фамилия', field: 'LastName' },
								{ title: 'Название блюда', field: 'Name' },
								{ title: 'Последнее изменение', field: 'Date', type: 'datetime' },
								{ title: 'Состояние заказа', field: 'State', lookup: { "Заказан": "Заказан", "Подготовка продуктов": "Подготовка продуктов", "Изготавливается": "Изготавливается", "Готов": "Готов" } },
							]}
							options={{
								draggable: false,
								paging: true,
								pageSize: 15,
								emptyRowsWhenPaging: false,
								pageSizeOptions: [15, 30, 60, 90],
								addRowPosition: 'first'
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
							editable={{
								onRowUpdate: async (newData, oldData) => {
									const server = `${process.env.REACT_APP_API_SERVER}orders/update/${newData.ID}/${newData.State}/${username}`;
									await axios.get(server, { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } })
										.then(response => {
											if (response.status == 200) {
												this.componentDidMount();
											} else {
												console.error('404 error ' + response);
												alert(`Ошибка при получении ответа от сервера: ${response.data.message}`)
											}
										})
										.catch(error => {
											console.error(error);
											alert(`Ошибка во время исполнения: ${error}`);
										})
									new Promise((resolve, reject) => {
										setTimeout(() => {
											resolve()
										}, 1000)
									})
								},
							}
							}
						/>
					</div>
				</ResponsiveReactGridLayout>
			</div>
		);
	}
}

function getFromLS(key) {
	let ls = {};
	if (global.localStorage) {
		try {
			ls = JSON.parse(global.localStorage.getItem('rgl-8-orders')) || {};
		} catch (e) {
			/* Ignore*/
		}
	}
	return ls[key];
}

function saveToLS(key, value) {
	if (global.localStorage) {
		global.localStorage.setItem(
			'rgl-8-orders',
			JSON.stringify({
				[key]: value,
			}),
		);
	}
}
