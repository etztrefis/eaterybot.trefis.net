import React from "react";
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';

function PreHeader() {
    return (
        <div className="preheader-main" style={{ borderBottom: "1px solid black" }}>
            <Navbar bg="dark" variant="dark" style={{ fontFamily: "Raleway, sans-serif" }}>
                <Navbar.Brand href="/" style={{ fontFamily: "Nunito, sans-serif" }}>
                    <img
                        alt=""
                        src="favicon.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Eatery Bot
                </Navbar.Brand>
                <Nav className="mr-auto" style={{ fontFamily: "Raleway, sans-serif", fontSize: "18px" }}>
                    <Nav.Link target="_blank" href="https://github.com/etztrefis/eaterybot.trefis.net">GitHub</Nav.Link>
                    <Nav.Link target="_blank" href="https://vk.com/eaterybot">VK</Nav.Link>
                    <Nav.Link target="_blank" href="https://trefis.net/">Trefis</Nav.Link>
                </Nav>
                <Form inline>
                    <Button variant="outline-light">Login</Button>
                </Form>
            </Navbar>

        </div>

    );
}

export default PreHeader;
