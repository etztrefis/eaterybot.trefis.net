import React from "react";
import RightSide from "./Sides/RightSide.js";
import LeftSide from "./Sides/LeftSide.js";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import "./First.css";

function First() {
  return (
    <div className="flex-container">
      <Container>
        <Row>
          <Col><RightSide /></Col>
          <Col><LeftSide /></Col>
        </Row>
      </Container>
      {/* //   <div className="second"><RightSide /></div>
    //   <div className="first"><LeftSide /></div> */}
    </div >

  );
}

export default First;
