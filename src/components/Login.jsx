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
} from "react-bootstrap";
import { Apiurl } from "../services/apirest";
import axios from "axios";
import logo from "../assets/img/NoticiasPeru.png";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    form: {
      email: "",
      password: "",
    },
    error: false,
    errorMsg: "",
  };

  manejadorChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.type]: e.target.value,
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

  /*  manejadorSubmit(e) {
    e.preventDefault();
  } */
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
                    Inicio de sesión
                  </Card.Title>
                  <Form onSubmit={this.manejadorSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Correo</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="correo"
                        onChange={this.manejadorChange}
                      />
                      {/* <Form.Text className="text-muted">
                      Nunca compartiremos su correo electrónico con nadie.
                      </Form.Text> */}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="contraseña"
                        onChange={this.manejadorChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <div className="d-grid gap-2">
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={this.manejadorBoton}
                      >
                        Iniciar
                      </Button>
                    </div>{" "}
                    <br />
                    <Link to="/">
                      <div className="d-grid gap-2">
                        <Button variant="secondary">cancelar</Button>
                      </div>
                    </Link>
                  </Form>
                </Card.Body>
              </Card>

              <br />

              {this.state.error === true && (
                <Alert variant="danger">{this.state.errorMsg}</Alert>
              )}
            </Col>
            <Col lg={4}></Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Login;
