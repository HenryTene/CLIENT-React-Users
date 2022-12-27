import React, { useState, useEffect } from "react";
import { Apiurl } from "../services/apirest";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Navbar,
  Nav,
  Figure,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../assets/img/NoticiasPeru.png";

const Editar = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
 
  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();
    await axios.put(`${Apiurl}user/${id}`, {
      name: name,
      email: email,
    });
    navigate("/dashboard");
  };

  useEffect(() => {
    const getUserById = async () => {
      const response = await axios.get(`${Apiurl}user/${id}`);
      setName(response.data.name);
      setEmail(response.data.email);
    };
    getUserById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {" "}
      <Navbar bg="light" variant="light">
        <Container>
        <Figure className="me-auto">
            <Figure.Image
              width={180}
              height={5}
             
              src={logo}
            />
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
          <Col>
            {" "}
            <Form onSubmit={update}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="success" type="submit">
                  Aceptar
                </Button>{" "}
                <Button variant="secondary" type="submit">
                  cancelar
                </Button>{" "}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Editar;
