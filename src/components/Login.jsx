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
  Spinner,
} from "react-bootstrap";
import { Apiurl } from "../services/apirest";
import axios from "axios";
import logo from "../assets/img/NoticiasPeru.png";
import { Link } from "react-router-dom";
import lock from "../assets/img/lock.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const manejadorChange = (e) => {
    setForm({
      ...form,
      [e.target.type]: e.target.value,
    });
  };

  const manejadorBoton = async () => {
    setLoading(true);
    let url = Apiurl + "login";

    try {
      const response = await axios.post(url, form);
      if (response.statusText === "OK") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.user.name);

        window.location = "/dashboard";
        //navigate("/dashboard");
      }
    } catch (error) {
      setError(true);
      setErrorMsg(error.response.data.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setError(false);
      }, 2000);
    }
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
                {error ? <Alert variant="danger">{errorMsg}</Alert> : <></>}
                <Form onSubmit={manejadorSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="correo"
                      onChange={manejadorChange}
                    />
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
                    {loading ? (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Spinner
                          animation="border"
                          role="status"
                          variant="primary"
                        >
                          <span className="sr-only"></span>
                        </Spinner>
                      </div>
                    ) : (
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={manejadorBoton}
                      >
                        Iniciar
                      </Button>
                    )}
                  </div>{" "}
                  <br />
                  ¿No tienes una cuenta?
                  <Link to="/register" style={{ textDecoration: "none" }}>
                    {" "}
                    Regístrate aquí
                  </Link>
                </Form>
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
