import React from "react";
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

class Login extends React.Component {
  state = {
    form: {
      email: "",
      password: "",
    },
    error: false,
    errorMsg: "",
  };

  manejadorChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  preview = () => {
    window.location = "/dashboard";
  };

  manejadorBoton = () => {
    let url = Apiurl + "login";

    axios
      .post(url, this.state.form)
      .then((response) => {
        if (response.statusText === "OK") {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", response.data.user.name);

          window.location = "/dashboard";
        }
      })
      .catch((error) => {
        this.setState({
          error: true,
          errorMsg: error.response.data.message,
        });
      });
  };

  manejadorSubmit = (e) => {
    e.preventDefault();
  };

  render() {
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
                  <Card.Title>
                    <Navbar bg="light">
                      <Container>
                        <Navbar.Collapse className="justify-content-center">
                          <Navbar.Text>Inicio de sesión</Navbar.Text>
                        </Navbar.Collapse>
                      </Container>
                    </Navbar>
                  </Card.Title>
                  <Form onSubmit={this.manejadorSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Correo</Form.Label>
                      <Form.Control
                        name="email"
                        placeholder="correo"
                        onChange={this.manejadorChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        name="password"
                        type="password"
                        placeholder="contraseña"
                        onChange={this.manejadorChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Recuérdame" />
                    </Form.Group>
                    <div className="d-grid gap-2">
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={this.manejadorBoton}
                      >
                        Ingresar
                      </Button>
                    </div>{" "}
                    <br />
                    ¿No tienes una cuenta?
                    <Link to="/register" style={{ textDecoration: "none" }}>
                      {" "}
                      Registrate aquí
                    </Link>
                    {this.state.error ? (
                      <Alert variant="danger">{this.state.errorMsg}</Alert>
                    ) : (
                      ""
                    )}
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}></Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default Login;
