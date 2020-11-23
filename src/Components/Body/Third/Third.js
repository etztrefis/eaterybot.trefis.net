import React from "react";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import RightSide from "./Sides/RightSide.js"
import "./Third.css";

function Third() {
    return (
        <Container>
            <Row>
                <Col xs={6} md={4}>
                    <div className="inside-box-content">
                        123
                </div>
                    <div className="inside-box-content">
                        321
                </div>
                    <div className="inside-box-content">
                        456
                </div>
                </Col>
                <Col xs={6} md={4}>
                    <div className="inside-box-content">
                        123
                </div>
                    <div className="inside-box-content">
                        321
                </div>
                    <div className="inside-box-content">
                        456
                </div>
                </Col>
                <Col xs={6} md={4}>
                    <RightSide />
                </Col>
            </Row>
        </Container>

    );
}

export default Third;
