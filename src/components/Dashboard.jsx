import React, { useState } from "react";
import {
  Navbar,
  Container,
  Stack,
  NavDropdown,
  Figure,
  Nav,
  Button,
} from "react-bootstrap";
import Tabla from "./Tabla";
import TablaPautas from "./TablaPautas";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/img/NoticiasPeru.png";

const Dashboard = () => {
  let resp = null;
  const storedResp = localStorage.getItem("token");
  const userResp = localStorage.getItem("user");
  const navigate = useNavigate();

  const [mostrandoTabla, setMostrandoTabla] = useState(false);
  const [tablaActual, setTablaActual] = useState("");

  if (storedResp) {
    //console.log(storedResp);
    //console.log(userResp);
    try {
      resp = JSON.parse(storedResp);
    } catch (e) {}
  }

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
    window.location = "/";
  }
  /* const handleClick = (route) => {
    if (route === "pautas") {
      navigate("/pautas");
    } else {
      navigate("/usuarios");
    }
  }; */

  const mostrarTablaUsuarios = () => {
    setMostrandoTabla(true);
    setTablaActual("usuarios");
  };

  const mostrarTablaPautas = () => {
    setMostrandoTabla(true);
    setTablaActual("pautas");
  };

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Container>
            <Figure className="me-auto">
              <Figure.Image width={180} height={5} src={logo} />
            </Figure>
          </Container>


          
          <Container>
            <Nav>
              <Nav.Link onClick={mostrarTablaUsuarios}>Usuarios</Nav.Link>
              <Nav.Link onClick={mostrarTablaPautas}>Pautas</Nav.Link>
            </Nav>
          </Container>

          <NavDropdown title={userResp}>
            <NavDropdown.Item onClick={logOut}>Cerrar Sesion</NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>   

      {mostrandoTabla && (
      <Container>
        <Stack gap={3}>
          <div className="bg-light border"></div>
          <div className="bg-light border">
            {" "}
        {tablaActual === "usuarios" && <Tabla />}
        {tablaActual === "pautas" && <TablaPautas />}
        </div>
          <div className="bg-light border"></div>
        </Stack> 
      </Container>
    )}
    </>
  );
};

export default Dashboard;
