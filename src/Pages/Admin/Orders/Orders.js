import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import OrdersLayout from './OrdersLayout';
import '../Admin.css';

export default class Dishes extends React.Component {
    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = { layout: [], show: false };
        this.onLayoutChange = this.onLayoutChange.bind(this);
    }

    componentDidMount() {
        this.handleShow();
    }

    onLayoutChange(layout) {
        this.setState({ layout: layout });
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <div className="orders-main">
                <Modal show={this.state.show} onHide={this.handleClose} size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">Правила заполнения таблиц</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul style={{paddingLeft:"15px"}}>
                            <li>Необходимо помнить, что таблица заказов <b>сама</b> обновляется в 7:00 каждого дня.</li>
                            <li>Составлять новое меню необходимо каждую неделю в пятнцу после 13:00 или в остальные дни до понедельника.</li>
                            <li>Если Вы случайно очистите меню - данные <b>нельзя</b> будет вернуть.</li>
                        </ul> 
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                            Прочитал
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Sidebar />
                <OrdersLayout onLayoutChange={this.onLayoutChange} />
            </div>
        );
    }
}

const ordersDiv = document.getElementById('root');
const gridProps = window.gridProps || {};
ReactDOM.render(React.createElement(OrdersLayout, gridProps), ordersDiv);
