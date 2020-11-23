import React from "react";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import "./Second.css";

function Second() {
    return (
        <Container fluid style={{ backgroundColor: "white" }}>
            <Row>
                <Col>
                    <div className="second-main">
                        <div className="text-main-div" style={{ paddingTop: "50px" }}>
                            <p className="text-header">давопдлавопджлыоважпдотол</p>
                            <p className="text-text">fsdfasdfasdfasdfasdf Okayeg</p>
                        </div>
                    </div >
                </Col>
            </Row>
        </Container >
    );
}

export default Second;
