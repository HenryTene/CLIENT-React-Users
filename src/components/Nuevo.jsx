import React, { useState } from "react";
import { Apiurl } from "../services/apirest";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Navbar,
  Figure,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/NoticiasPeru.png";
import Alert from "react-bootstrap/Alert";

const Nuevo = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();

  /* const navigate = useNavigate(); */

  const store = async (e) => {
    e.preventDefault();
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !rpassword.trim()
    ) {
      setAlert({
        variant: "danger",
        message: "Todos los campos son obligatorios",
      });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setAlert({
        variant: "danger",
        message: "El correo electrónico es inválido",
      });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
      return;
    }

    if (password !== rpassword) {
      setAlert({
        variant: "danger",
        message: "Las contraseñas no coinciden",
      });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
      return;
    }

    try {
      await axios.post(`${Apiurl}register`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: rpassword,
      });

      setAlert({
        variant: "success",
        message: "El usuario ha sido agregado con éxito",
      });
      //handleShow();
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const preview = () => {
    navigate("/dashboard");
  };

  return (
    <>
      {" "}
      <Navbar bg="light" variant="light">
        <Container>
          {/*  <Navbar.Brand href="/">Noticias Peru</Navbar.Brand>
          <Nav className="me-auto"></Nav> */}
          <Figure className="me-auto">
            <Figure.Image width={180} height={5} src={logo} />
          </Figure>
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
                {alert && (
                  <Alert
                    variant={alert.variant}
                    onClose={() => setAlert(null)}
                    dismissible
                  >
                    {alert.message}
                  </Alert>
                )}
                <Card.Title className="text-center">
                  Registro de Usuarios
                </Card.Title>
                <Form onSubmit={store}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Label>Correo</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="nombre@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Label>Repetir Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Contraseña"
                      value={rpassword}
                      onChange={(e) => setRpassword(e.target.value)}
                    />
                  </Form.Group>
                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                      Agregar
                    </Button>
                    <Button variant="secondary" type="submit" onClick={preview}>
                      cancelar
                    </Button>{" "}
                  </div>{" "}
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

export default Nuevo;
