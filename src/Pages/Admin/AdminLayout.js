import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import {
    Card,
    Logo,
    Form,
    Input,
    Text,
    Header,
    Error,
    Success,
} from "../../Components/AuthForm/AuthForm";
import cryptJS from "crypto-js";
import { Button } from "react-bootstrap";
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
            admins: [],
            qrcodes: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            if (global.localStorage.getItem('tokens').charAt(global.localStorage.getItem('tokens').length - 2) == 1) {
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
                if (apiResponse.status == 200) {
                    localStorage.removeItem('tokens');
                    window.location.reload();
                } else {
                    alert(`Ошибка во время выполнения: ${apiResponse.data.type} ${apiResponse.data.message}`)
                }
            })
            .catch((e) => { alert(`Ошибка 404 во время выполнения запроса.`); console.log(e); })
    }

    async handleSubmit() {
        if (this.state.email == '') {
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
                            if (apiResponse.status == 200) {
                                localStorage.removeItem('tokens');
                                window.location.reload();
                            } else {
                                alert(`Ошибка во время выполнения: ${apiResponse.data.type} ${apiResponse.data.message}`)
                            }
                        })
                        .catch((e) => { alert(`Ошибка 404 во время выполнения запроса.`); console.log(e); })
                }
            } else {
                alert(`Все поля должны быть заполнены.`);
            }
        } else if (this.state.email != '') {
            const localArray = global.localStorage.getItem('tokens').split(" ");
            const stringLocalArray = localArray[1].toString();
            const username = stringLocalArray.substring(0, stringLocalArray.length - 2);

            const server = `${process.env.REACT_APP_API_SERVER}admins/username/${username}/${this.state.email}`;
            const config = { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } };
            await axios.get(server, config)
                .then((apiResponse) => {
                    if (apiResponse.status == 200) {
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
                    <div key="2" data-grid={{ w: 6, h: 12, x: 0, y: 0 }}>
                        <div className="grid-header">Смена пароля</div>
                        <div className="grid-text">Настоящий пароль: </div>
                        <Form>
                            <Input
                                type="password"
                                name="oldPassword"
                                onChange={this.handleChange}
                            />
                            <div className="grid-text">Новый пароль: </div>
                            <Input
                                type="password"
                                name="newPassword"
                                onChange={this.handleChange}
                            />
                            <Button variant='success' style={{ width: "30%", marginLeft: "10px", height: "20%" }} type="submit" onClick={this.handleSubmit}>
                                Изменить
                            </Button>
                            <div className="error-wrapper" style={{ marginLeft: "10px", width: "90%", marginTop: "20px" }}>
                                <Error>
                                    • Минимум 8 символов.
                                    <br />
                                    • Хотя бы одна цифра.
									<br />
									• Хотя бы один специальный символ.
                                    <br />
                                    • Хотя бы один символ в верхнем регистре.
									<br />
									• Хотя бы один символ в нижнем
									регистре.
                                </Error>
                            </div>
                        </Form>
                    </div>
                    <div key="3" data-grid={{ w: 6, h: 6, x: 0, y: 12 }}>
                        <span className="text"><div className="grid-header">Смена почты</div>
                            <div className="grid-text">Укажите новую почту: </div>
                            <Form>
                                <Input
                                    type="text"
                                    name="email"
                                    onChange={this.handleChange}
                                />
                                <Button variant='success' style={{ width: "30%", marginLeft: "10px", height: "20%", marginTop: "5px" }} type="submit" onClick={this.handleSubmit} >
                                    Изменить
                            </Button>
                            </Form></span>
                    </div>
                    <div key="4" data-grid={{ w: 6, h: 11, x: 7, y: 0 }}>
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
                            /></span>
                    </div>
                    <div key="5" data-grid={{ w: 6, h: 11, x: 7, y: 12 }}>
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
