import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Apiurl } from "../services/apirest";

function ModalAgregar({ setUsers }) {
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const store = async (e) => {
    e.preventDefault();
    let userId = null;
    try {
      const response = await axios.post(`${Apiurl}register`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: rpassword,
      });

      userId = response.data.id;
     
    } catch (error) {
      console.log("Este error es el siguiente:" + error);
    }

    const limpiarFormulario = () => {
      setName("");
      setEmail("");
      setPassword("");
      setRpassword("");
    };

    setUsers((prev) => {
      return [
        ...prev,
        {
          id: userId,
          name: name,
          email: email,
        },
      ];
    });

    limpiarFormulario();
    handleClose();
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Agregar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="form">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={rpassword}
                onChange={(e) => setRpassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" onClick={store}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAgregar;
