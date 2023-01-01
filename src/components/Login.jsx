import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import {
  Form,
  Container,
  Row,
  Col,
  Alert,
  Navbar,
  Figure,
  Card,
  Nav,
} from "react-bootstrap";
import { Apiurl } from "../services/apirest";
import axios from "axios";
import logo from "../assets/img/NoticiasPeru.png";
import { Link } from "react-router-dom";
import lock from "../assets/img/lock.png";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const manejadorChange = (e) => {
    setForm({
      ...form,
      [e.target.type]: e.target.value,
    });
  };

  const preview = () => {
    window.location = "/dashboard";
  };

  const manejadorBoton = () => {
    let url = Apiurl + "login";

    axios
      .post(url, form)
      .then((response) => {
        if (response.statusText === "OK") {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", response.data.user.name);

          window.location = "/dashboard";
        }
      })
      .catch((error) => {
        setError(true);
        setErrorMsg(error.response.data.message);
      });
  };

  const manejadorSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Figure className="me-auto">
            <Figure.Image width={180} height={5} src={logo} />
          </Figure>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link href="/">Principal</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row>
        <br />
        <br />
        <br />
        <br />
      </Row>
      <Container>
        <Row>
          <Col lg={4}></Col>
          <Col lg={4}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">
                  <Navbar bg="light">
                    <Container>
                      <Navbar.Collapse className="justify-content-center">
                        <Navbar.Text>
                          {" "}
                          <Figure className="me-auto">
                            <Figure.Image width={25} height={25} src={lock} />
                          </Figure>{" "}
                          Inicio de sesión
                        </Navbar.Text>
                      </Navbar.Collapse>
                    </Container>
                  </Navbar>
                </Card.Title>
                <Form onSubmit={manejadorSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="correo"
                      onChange={manejadorChange}
                    />
                    {/* <Form.Text className="text-muted">
                    Nunca compartiremos su correo electrónico con nadie
                    </Form.Text> */}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="contraseña"
                      onChange={manejadorChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Recuérdame" />
                  </Form.Group>
                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={manejadorBoton}
                    >
                      Iniciar
                    </Button>
                  </div>{" "}
                  <br />
                  ¿No tienes una cuenta?
                  <Link to="/register" style={{ textDecoration: "none" }}>
                    {" "}
                    Registrate aquí
                  </Link>
                </Form>
                {error ? <Alert variant="danger">{errorMsg}</Alert> : <></>}
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}></Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
