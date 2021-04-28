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
            data: [],
            lessData: []
        };
    }

    async componentDidMount() {
        this._isMounted = true;
        const server = `${process.env.REACT_APP_API_SERVER}products/`;
        const secondServer = `${process.env.REACT_APP_API_SERVER}products/less`;
        await axios.get(server, { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } })
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        data: response.data.message
                    })
                }
            }).catch(error => {
                console.log(error);
            })
        await axios.get(secondServer, { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } })
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        lessData: response.data.message
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
                    <div key="2" data-grid={{ w: 6, h: 26, x: 0, y: 0, static: true }}>
                        <MaterialTable
                            title="Продукты, которые необходимо закупить"
                            tableRef={tableRef}
                            data={this.state.lessData}
                            columns={[
                                { title: 'ID', field: 'ProductID', },
                                { title: 'Название', field: 'Name' },
                                {
                                    title: 'Количество', field: 'Amount', type: 'numeric',
                                    cellStyle: {
                                        backgroundColor: '#ffe3e6',
                                        color: 'black'
                                    },
                                },
                                { title: 'Единица измерения', field: 'MeasurmentUnits', lookup: { "шт.": "шт.", "кг.": "кг.", "литр.": "литр." } },
                            ]}
                            options={{
                                draggable: false,
                                paging: true,
                                pageSize: 15,
                                emptyRowsWhenPaging: false,
                                pageSizeOptions: [15, 30, 60, 90],
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
                    <div key="3" data-grid={{ w: 6, h: 26, x: 6, y: 0, static: true }}>
                        <MaterialTable
                            title="Все продукты"
                            tableRef={tableRef}
                            data={this.state.data}
                            columns={[
                                { title: 'ID', field: 'ProductID' },
                                { title: 'Название', field: 'Name' },
                                { title: 'Количество', field: 'Amount', type: 'numeric' },
                                { title: 'Единица измерения', field: 'MeasurmentUnits', lookup: { "шт.": "шт.", "кг.": "кг.", "литр.": "литр." } },
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
                                onRowAdd: async (newData) => {
                                    if (newData.Name !== undefined && newData.Amount !== undefined && newData.MeasurmentUnits !== undefined) {
                                        const server = `${process.env.REACT_APP_API_SERVER}products/create/${newData.Name}/${newData.Amount}/${newData.MeasurmentUnits}/${username}`;
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
                                onRowUpdate: async (newData, oldData) => {
                                    const server = `${process.env.REACT_APP_API_SERVER}products/update/${newData.ProductID}/${newData.Name}/${newData.Amount}/${newData.MeasurmentUnits}/${username}`;
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
                                onRowDelete: async (oldData) => {
                                    const server = `${process.env.REACT_APP_API_SERVER}products/delete/${oldData.ProductID}/${username}`;
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
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}

function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem('rgl-8-products')) || {};
        } catch (e) {
            /* Ignore*/
        }
    }
    return ls[key];
}

function saveToLS(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem(
            'rgl-8-products',
            JSON.stringify({
                [key]: value,
            }),
        );
    }
}
