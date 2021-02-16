import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import MaterialTable from 'material-table';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS('layouts') || {};
const tableRef = React.createRef();
import axios from 'axios';

export default class ResponsiveLocalStorageLayout extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            layouts: JSON.parse(JSON.stringify(originalLayouts)),
            data: [],
            isLoaded: false
        };
    }

    componentDidMount() {
        let resp = this.getProducts({headers: {Authorization : `Bearer ${process.env.REACT_APP_API_KEY}`}});
        this.setState({
            isLoaded: true,
            data: resp
        })
        console.log(this.state.data);
    }

    getProducts = this.getProductsAsync;

    async getProductsAsync(conf) {
        await axios.get('http://92.168.0.87:8082/api/products/', conf)
            .then(response => {
                return response;
            })
            .catch(error => {
                console.error(error);
            });
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
                    <div key="1" data-grid={{ w: 6, h: 8, x: 0, y: 0 }}>
                        <span className="text">
                            Добавить новый продукт
                        </span>
                    </div>
                    <div key="2" data-grid={{ w: 6, h: 8, x: 0, y: 1 }}>
                        <span className="text">Логи</span>
                    </div>
                    <div key="3" data-grid={{ w: 6, h: 20, x: 6, y: 0, static: true }}>
                        <span className="text">
                            <MaterialTable
                                title="Продукты"
                                tableRef={tableRef}
                                columns={[
                                    { title: 'ID', field: 'ProductID' },
                                    { title: 'Имя', field: 'Name' },
                                    { title: 'Количество', field: 'Amount', type: 'numeric' },
                                    { title: 'Единица измерения', field: 'MeasurmentUnits' },
                                ]}
                                // data={this.state.data}
                                options={{
                                    selection: true,
                                }}
                                actions={[
                                    {
                                        icon: 'refresh',
                                        tooltip: 'Обновить записи',
                                        isFreeAction: true,
                                        onClick: () => tableRef.current && tableRef.current.onQueryChange(),
                                    },
                                    {
                                        tooltip: 'Удалить выбранные записи',
                                        icon: 'delete',
                                        onClick: (event, data) => alert('You want to delete ' + data.length + ' rows'),
                                    },
                                ]}
                            />
                        </span>
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
