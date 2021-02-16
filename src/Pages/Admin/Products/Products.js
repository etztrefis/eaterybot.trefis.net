import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import ProductsLayout from './ProductsLayout';
import '../Admin.css';

export default class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {layout: []};
        this.onLayoutChange = this.onLayoutChange.bind(this);
    }

    onLayoutChange(layout) {
        this.setState({layout: layout});
    }

    render() {
        return (
            <div className="products-main">
                <Sidebar />
                <ProductsLayout onLayoutChange={this.onLayoutChange} />
            </div>
        );
    }
}

const productsDiv = document.getElementById('root');
const gridProps = window.gridProps || {};
ReactDOM.render(React.createElement(ProductsLayout, gridProps), productsDiv);
