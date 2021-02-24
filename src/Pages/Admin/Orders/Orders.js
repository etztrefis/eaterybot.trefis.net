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
            <div className="dishes-main">
                <Modal show={this.state.show} onHide={this.handleClose} size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">Правила заполнения таблиц</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Будьте внимательны к правильному заполнению данных во время совершения действий при работе с записями в таблице!
                        <br/>
                        <ul style={{paddingLeft:"15px"}}>
                            <li>Для создания или обновления записи необходимо заполнить <b>все поля</b>.</li>
                            <li>Действительные числа всегда записываются с помощью точки. Например, 3.14</li>
                            <li>При создании нового состава внимательно заполняйте поле "Название" в соответсвии с таблицей <a href="/admin/products">продуктов</a>.</li>
                        </ul> 
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                            Прочитал
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Sidebar />
                {/* <DishesLayout onLayoutChange={this.onLayoutChange} /> */}
            </div>
        );
    }
}

const disehsDiv = document.getElementById('root');
const gridProps = window.gridProps || {};
// ReactDOM.render(React.createElement(DishesLayout, gridProps), disehsDiv);
