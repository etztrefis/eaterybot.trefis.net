import React from "react";
import ProgressBar from "./ProgressBar/ProgressBar.js"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import "./Nav.css";

function NavBar() {
  return (
    <div className="Nav">
      <ProgressBar />
      <Navbar className="main-nav" variant="dark" style={{ fontFamily: "Raleway, sans-serif", paddingLeft: "163px", fontSize: "19px", backdropFilter: "blur(5px)" }}>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
