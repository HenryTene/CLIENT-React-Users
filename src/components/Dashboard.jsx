import React from "react";
import { Navbar, Container, Stack, NavDropdown, Figure } from "react-bootstrap";
import Tabla from "./Tabla";
import {  useNavigate } from "react-router-dom";
import logo from "../assets/img/NoticiasPeru.png";


const Dashboard = () => {
  let resp = null;
  const storedResp = localStorage.getItem("token");
  const userResp = localStorage.getItem("user");
  const navigate = useNavigate();
  

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

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
        

          <Figure className="me-auto">
            <Figure.Image width={180} height={5} src={logo} />
          </Figure>

          <NavDropdown title={userResp}>
            <NavDropdown.Item onClick={logOut}>Cerrar Sesion</NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
      <Container>
        <Stack gap={3}>
          <div className="bg-light border"></div>
          <div className="bg-light border">
            {" "}
            <Tabla />
          </div>
          <div className="bg-light border"></div>
        </Stack>
      </Container>
     
    </>
  );
};

export default Dashboard;
