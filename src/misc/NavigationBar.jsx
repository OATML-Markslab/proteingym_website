import React from 'react';
import {useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./NavigationBar.css";
function Navigationbar() {
    const location = useLocation();
    return (
        <Navbar className="nav-pills" collapseOnSelect bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                <img src="./assets/proteingymlogo.png" width="30" height="30"/>
                &nbsp; ProteinGym
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" defaultActiveKey="/" activeKey={location.pathname}>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/benchmarks">Benchmarks</Nav.Link>
                        <Nav.Link href="/download">Download</Nav.Link>
                        {/* <Nav.Link href="/about">About</Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Navigationbar;