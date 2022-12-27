import React from "react";
import { Navbar, Container, Nav, Figure } from "react-bootstrap";

import logo from "../assets/img/NoticiasPeru.png";

const Home = () => {
  

  return (
    <Navbar bg="light" variant="light">
      <Container>{" "}
      <Figure className="me-auto">
        {" "}
            <Figure.Image
              width={180}
              height={5}
             
              src={logo}
            />
          </Figure>
        <Navbar.Brand href="#home">
          
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-start">
          <Nav>           
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link href="/login">Logueo</Nav.Link>
            <Nav.Link href="/register">Registro</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Home;
