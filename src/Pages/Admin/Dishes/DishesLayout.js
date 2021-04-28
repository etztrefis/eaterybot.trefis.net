import React from 'react';
import axios from 'axios';
import { WidthProvider, Responsive } from 'react-grid-layout';
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
            dishesData: [],
            compData: [],
            products: []
        };
    }

    async componentDidMount() {
        this._isMounted = true;
        const headers  = {
            "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`,
          }
        const server = `${process.env.REACT_APP_API_SERVER}dishes/`;
        const secondServer = `${process.env.REACT_APP_API_SERVER}compositions/`;
        const thirdServer = `${process.env.REACT_APP_API_SERVER}products/lookup/`
        await axios.get(server, { headers })
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        dishesData: response.data.message
                    })
                }
            }).catch(error => {
                console.log(error);
            })
        await axios.get(secondServer, { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } })
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        compData: response.data.message[0]
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
                    <div key="2" data-grid={{ w: 6, h: 21, x: 0, y: 0, static: true }} className="shadow-xl border border-purple-400">
                        <MaterialTable
                            title="Блюда"
                            tableRef={tableRef}
                            data={this.state.dishesData}
                            columns={[
                                { title: 'ID', field: 'DishID' },
                                { title: 'Название', field: 'Name' },
                                { title: 'Энергетическая ценность', field: 'EnergyValue', type: 'numeric' },
                                { title: 'Цена', field: 'Price', type: 'currency', currencySetting: { currencyCode: 'RUB' } },
                            ]}
                            options={{
                                draggable: false,
                                paging: true,
                                pageSize: 10,
                                emptyRowsWhenPaging: false,
                                pageSizeOptions: [10, 20, 40, 80],
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
                                onRowAdd: async (newData) => {
                                    if (newData.DishID !== undefined && newData.Name !== undefined && newData.EnergyValue !== undefined && newData.Price !== undefined) {
                                        const server = `${process.env.REACT_APP_API_SERVER}dishes/create/${newData.DishID}/${newData.Name}/${newData.EnergyValue}/${newData.Price}/${username}`;
                                        await axios.get(server, { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } })
                                            .then(response => {
                                                if (response.status === 200) {
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
                                onRowUpdate: async (newData, oldData) => {
                                    if (newData.DishID !== undefined && newData.Name !== undefined && newData.EnergyValue !== undefined && newData.Price !== undefined) {
                                        const server = `${process.env.REACT_APP_API_SERVER}dishes/update/${newData.DishID}/${newData.Name}/${newData.EnergyValue}/${newData.Price}/${username}`;
                                        await axios.get(server, { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } })
                                            .then(response => {
                                                if (response.status === 200) {
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
                                    } else {
                                        alert("Для обновления записи необходимо заполнить все поля.");
                                    }
                                },
                                onRowDelete: async (oldData) => {
                                    const server = `${process.env.REACT_APP_API_SERVER}dishes/delete/${oldData.DishID}/${username}`;
                                    await axios.get(server, { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } })
                                        .then(response => {
                                            if (response.status === 200) {
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
                    <div key="3" data-grid={{ w: 6, h: 21, x: 6, y: 0, static: true }} className="shadow-xl border border-purple-400">
                        <MaterialTable
                            title="Составы"
                            tableRef={tableRef}
                            data={this.state.compData}
                            columns={[
                                { title: 'ID блюда', field: 'DishID', editable:"onAdd"},
                                { title: 'Название', field: 'Name' , editable:"onAdd", lookup: Object.assign({}, this.state.products) },
                                { title: 'Количество продукта', field: 'AmountProduct', type: 'numeric' },
                            ]}
                            options={{
                                addRowPosition: 'first',
                                draggable: false,
                                paging: true,
                                pageSize: 10,
                                emptyRowsWhenPaging: false,
                                pageSizeOptions: [10, 20, 40, 80],
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
                                    if (newData.DishID !== undefined && newData.Name !== undefined && newData.AmountProduct !== undefined) {
                                        const server = `${process.env.REACT_APP_API_SERVER}compositions/create/${newData.DishID}/${newData.Name}/${newData.AmountProduct}/${username}`;
                                        await axios.get(server, { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } })
                                            .then(response => {
                                                if (response.status === 200) {
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
                                onRowUpdate: async (newData, oldData) => {
                                    if (newData.DishID !== undefined && newData.Name !== undefined && newData.AmountProduct !== undefined) {
                                        const server = `${process.env.REACT_APP_API_SERVER}compositions/update/${newData.DishID}/${newData.Name}/${newData.AmountProduct}/${username}`;
                                        await axios.get(server, { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } })
                                            .then(response => {
                                                if (response.status === 200) {
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
                                    } else {
                                        alert("Для обновления записи необходимо заполнить все поля.");
                                    }
                                },
                                onRowDelete: async (oldData) => {
                                    const server = `${process.env.REACT_APP_API_SERVER}compositions/delete/${oldData.DishID}/${oldData.Name}/${username}`;
                                    await axios.get(server, { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } })
                                        .then(response => {
                                            if (response.status === 200) {
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
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}

function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem('rgl-8-dishes')) || {};
        } catch (e) {
            /* Ignore*/
        }
    }
    return ls[key];
}

function saveToLS(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem(
            'rgl-8-dishes',
            JSON.stringify({
                [key]: value,
            }),
        );
    }
}
