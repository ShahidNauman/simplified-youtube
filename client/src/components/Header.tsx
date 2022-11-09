import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

function Header() {
  return (
    <Navbar bg='dark' variant='dark' sticky='top'>
      <Container fluid>
        <Navbar.Brand href='/'>Simplified Youtube</Navbar.Brand>
        <Nav>
          <Nav.Link href='/upload'>Upload video</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
