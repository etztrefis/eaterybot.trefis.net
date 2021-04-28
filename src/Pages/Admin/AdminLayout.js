import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import cryptJS from "crypto-js";
import axios from 'axios';
import MaterialTable from 'material-table';
const tableRef = React.createRef();

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS('layouts') || {};


export default class ResponsiveLocalStorageLayout extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            layouts: JSON.parse(JSON.stringify(originalLayouts)),
            oldPassword: '',
            newPassword: '',
            email: '',
            name: '',
            surname: '',
            post: '',
            admins: [],
            qrcodes: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDataSubmit = this.handleDataSubmit.bind(this);
    }

    static get defaultProps() {
        return {
            className: 'layout',
            isResizable: false,
            cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
            rowHeight: 30,
        };
    }

    async componentDidMount() {
        this._isMounted = true;
        const server = `${process.env.REACT_APP_API_SERVER}admins/`;
        const secondServer = `${process.env.REACT_APP_API_SERVER}codes/`;
        if (global.localStorage.getItem('tokens') !== null) {
            if (global.localStorage.getItem('tokens').charAt(global.localStorage.getItem('tokens').length - 2) === 1) {
                await axios.get(server, { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } })
                    .then(response => {
                        if (this._isMounted) {
                            this.setState({
                                admins: response.data
                            })
                        }
                    }).catch(error => {
                        console.log(error);
                    })
            } else {
                if (this._isMounted) {
                    this.setState({
                        admins: []
                    })
                }
            }
        }
        await axios.get(secondServer, { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } })
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        qrcodes: response.data
                    })
                }
            }).catch(error => {
                console.log(error);
            })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    resetLayout() {
        this.setState({ layouts: {} });
    }

    onLayoutChange(layout, layouts) {
        saveToLS('layouts', layouts);
        this.setState({ layouts });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async handleEmailSubmit() {
        const localArray = global.localStorage.getItem('tokens').split(" ");
        const stringLocalArray = localArray[1].toString();
        const username = stringLocalArray.substring(0, stringLocalArray.length - 2);

        const server = `${process.env.REACT_APP_API_SERVER}admins/username/${username}/${this.state.email}`;
        const config = { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } };
        await axios.get(server, config)
            .then((apiResponse) => {
                if (apiResponse.status === 200) {
                    localStorage.removeItem('tokens');
                    window.location.reload();
                } else {
                    alert(`Ошибка во время выполнения: ${apiResponse.data.type} ${apiResponse.data.message}`)
                }
            })
            .catch((e) => { alert(`Ошибка 404 во время выполнения запроса.`); console.log(e); })
    }

    async handleDataSubmit() {
        if (this.state.name !== '' || this.state.surname !== '' || this.state.post !== '') {
            if (global.localStorage) {
                global.localStorage.setItem(
                    'personalData',
                    JSON.stringify({
                        name: this.state.name,
                        surname: this.state.surname,
                        post: this.state.post,
                    }),
                );
            }
        } else {
            alert(`Все поля должны быть заполнены.`);
        }
    }

    async handleSubmit() {
        if (this.state.email === '') {
            if (this.state.newPassword !== '' || this.state.oldPassword !== '') {
                const reg = new RegExp(
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
                );
                const result = this.state.newPassword.match(reg);
                if (result === null) {
                    alert("Пароль слишком легкий. ")
                } else {

                    let oldPasswordCrypt, newPasswordCrypt = "/";
                    do {
                        oldPasswordCrypt = cryptJS.AES.encrypt(
                            this.state.oldPassword,
                            process.env.REACT_APP_CRYPT
                        ).toString();
                    } while (oldPasswordCrypt.indexOf("/") !== -1);

                    do {
                        newPasswordCrypt = cryptJS.AES.encrypt(
                            this.state.newPassword,
                            process.env.REACT_APP_CRYPT
                        ).toString();
                    } while (newPasswordCrypt.indexOf("/") !== -1);

                    const localArray = global.localStorage.getItem('tokens').split(" ");
                    const stringLocalArray = localArray[1].toString();
                    const username = stringLocalArray.substring(0, stringLocalArray.length - 2);

                    const server = `${process.env.REACT_APP_API_SERVER}admins/password/${username}/${oldPasswordCrypt}/${newPasswordCrypt}`;
                    const config = { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } };
                    await axios.get(server, config)
                        .then((apiResponse) => {
                            if (apiResponse.status === 200) {
                                localStorage.removeItem('tokens');
                                window.location.reload();
                            } else {
                                alert(`Ошибка во время выполнения: ${apiResponse.data.type} ${apiResponse.data.message}`)
                            }
                        })
                        .catch((e) => { alert(`Неверный пароль, либо сервер не отвечает.`); console.log(e); })
                }
            } else {
                alert(`Все поля должны быть заполнены.`);
            }
        } else if (this.state.email !== '') {
            const localArray = global.localStorage.getItem('tokens').split(" ");
            const stringLocalArray = localArray[1].toString();
            const username = stringLocalArray.substring(0, stringLocalArray.length - 2);

            const server = `${process.env.REACT_APP_API_SERVER}admins/username/${username}/${this.state.email}`;
            const config = { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } };
            await axios.get(server, config)
                .then((apiResponse) => {
                    if (apiResponse.status === 200) {
                        localStorage.removeItem('tokens');
                        window.location.reload();
                    } else {
                        alert(`Ошибка во время выполнения: ${apiResponse.data.type} ${apiResponse.data.message}`)
                    }
                })
                .catch((e) => { alert(`Ошибка 404 во время выполнения запроса.`); console.log(e); })
        }
    }

    render() {
        let username;
        if (global.localStorage.getItem('tokens') != null) {
            const localArray = global.localStorage.getItem('tokens').split(" ");
            const stringLocalArray = localArray[1].toString();
            username = stringLocalArray.substring(0, stringLocalArray.length - 2);
        }
        let name, surname, post = "";
        if (global.localStorage.getItem('personalData') != null) {
            const localData = JSON.parse(global.localStorage.getItem('personalData'));
            name = localData.name;
            surname = localData.surname;
            post = localData.post;
        }
        return (
            <div>
                <ResponsiveReactGridLayout
                    isResizable={false}
                    className="layout"
                    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                    rowHeight={30}
                    layouts={this.state.layouts}
                    onLayoutChange={(layout, layouts) =>
                        this.onLayoutChange(layout, layouts)
                    }
                >
                    <div key="1" data-grid={{ w: 6, h: 11, x: 0, y: 0 }} className="shadow-xl border border-purple-400">
                        <div className="p-4 rounded-lg bg-white">
                            <h2 className="text-xl text-gray-900 font-medium title-font mb-2">Персональные данные</h2>
                            <p className="leading-relaxed text-base">Эти данные используются только при распечатывании меню и прочих документов.</p>
                        </div>
                        <form className="px-5">
                            <label htmlFor="name" className="leading-7 text-base text-gray-900">Имя</label>
                            <input
                                placeholder={name}
                                name="name"
                                type="text"
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm mb-4"
                                onBlur={this.handleChange}
                            />
                            <label htmlFor="surname" className="leading-7 text-base text-gray-900">Отчество (Фамилия)</label>
                            <input
                                placeholder={surname}
                                name="surname"
                                type="text"
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm mb-4"
                                onBlur={this.handleChange}
                            />
                            <label htmlFor="post" className="leading-7 text-base text-gray-900">Должность</label>
                            <input
                                placeholder={post}
                                name="post"
                                type="text"
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm mb-4"
                                onBlur={this.handleChange}
                            />
                            <button
                                type="button"
                                className="flex text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg shadow-lg transition duration-500"
                                onClick={this.handleDataSubmit}
                            >
                                Изменить
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6 ml-2" viewBox="0 0 24 24">
                                    <path d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"></path>
                                </svg>
                            </button>
                        </form>
                    </div>
                    <div key="2" data-grid={{ w: 6, h: 8, x: 0, y: 11 }} className="shadow-xl border border-purple-400">
                        <div className="p-4 rounded-lg bg-white">
                            <h2 className="text-xl text-gray-900 font-medium title-font mb-2">Смена пароля</h2>
                        </div>
                        <form className="px-5">
                            <label htmlFor="oldPassword" className="leading-7 text-base text-gray-900">Старый пароль</label>
                            <input
                                name="oldPassword"
                                type="password"
                                autoComplete="old-password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm mb-4"
                                onBlur={this.handleChange}
                            />
                            <label htmlFor="newPassword" className="leading-7 text-base text-gray-900">Новый пароль</label>
                            <input
                                name="newPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm mb-4"
                                onBlur={this.handleChange}
                            />
                            <button
                                type="submit"
                                className="flex text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg shadow-lg transition duration-500"
                                onClick={this.handleSubmit}
                            >
                                Изменить
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6 ml-2" viewBox="0 0 24 24">
                                    <path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                                </svg>
                            </button>
                        </form>
                    </div>
                    <div key="3" data-grid={{ w: 6, h: 6, x: 0, y: 19 }} className="shadow-xl border border-purple-400">
                        <div className="p-4 rounded-lg bg-white">
                            <h2 className="text-xl text-gray-900 font-medium title-font mb-2">Смена почты</h2>
                        </div>
                        <form className="px-5">
                            <label htmlFor="newPassword" className="leading-7 text-base text-gray-900">Новая почта</label>
                            <input
                                name="email"
                                type="text"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm mb-4"
                                onBlur={this.handleChange}
                            />
                            <button
                                type="submit"
                                className="flex text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg shadow-lg transition duration-500"
                                onClick={this.handleSubmit}
                            >
                                Изменить
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6 ml-2" viewBox="0 0 24 24">
                                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                            </button>
                        </form>
                    </div>
                    <div key="4" data-grid={{ w: 6, h: 11, x: 6, y: 0 }} className="shadow-xl border border-purple-400">
                        <span className="text">
                            <MaterialTable
                                title="Администраторы"
                                tableRef={tableRef}
                                data={this.state.admins}
                                columns={[
                                    { title: 'ID', field: 'id' },
                                    { title: 'Почта', field: 'Login' },
                                    { title: 'Доступен', field: 'Availiable', type: 'boolean' },
                                    { title: 'Супер админ', field: 'isSuperAdmin', type: 'boolean' },
                                ]}
                                options={{
                                    draggable: false,
                                    paging: true,
                                    pageSize: 4,
                                    emptyRowsWhenPaging: false,
                                    pageSizeOptions: [4],
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
                                        emptyDataSourceMessage: "У Вас недостаточно прав для просмотра таблицы администраторов.",
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
                                    onRowDelete: async (oldData) => {
                                        const server = `${process.env.REACT_APP_API_SERVER}admins/delete/${oldData.Login}/${username}`;
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
                            /></span>
                    </div>
                    <div key="5" data-grid={{ w: 6, h: 11, x: 6, y: 12 }} className="shadow-xl border border-purple-400">
                        <span className="text">
                            <MaterialTable
                                title="Коды регистрации"
                                tableRef={tableRef}
                                data={this.state.qrcodes}
                                columns={[
                                    { title: 'ID', field: 'id' },
                                    { title: 'Автор', field: 'Author' },
                                    { title: 'Время', field: 'Date', type: 'datetime' },
                                    { title: 'Код', field: 'Code' },
                                    { title: 'Доступ', field: 'Availiable', type: "boolean" },
                                ]}
                                options={{
                                    draggable: false,
                                    paging: true,
                                    pageSize: 3,
                                    emptyRowsWhenPaging: false,
                                    pageSizeOptions: [3],
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
                                        emptyDataSourceMessage: "Отсутсвуют записи в таблице.",
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
                            /></span>
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
            ls = JSON.parse(global.localStorage.getItem('rgl-8-admin')) || {};
        } catch (e) {
            /* Ignore*/
        }
    }
    return ls[key];
}

function saveToLS(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem(
            'rgl-8-admin',
            JSON.stringify({
                [key]: value,
            }),
        );
    }
}
