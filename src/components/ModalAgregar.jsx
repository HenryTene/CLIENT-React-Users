import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { Apiurl } from "../services/apirest";

function ModalAgregar({ setUsers }) {
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");

  const limpiarFormulario = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRpassword("");
  };

  const handleClose = () => {
    limpiarFormulario();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const store = async (e) => {
    e.preventDefault();
    let userId = null;
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
      const response = await axios.post(`${Apiurl}register`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: rpassword,
      });

      userId = response.data.id;
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

      setAlert({
        variant: "success",
        message: "El registro ha sido agregado con éxito",
      });
      setTimeout(() => {
        setAlert(null);
        limpiarFormulario();
        handleClose();
      }, 1500);
    } catch (error) {
      console.log("Este error es el siguiente:" + error);
    }
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
          {alert && (
            <Alert
              variant={alert.variant}
              onClose={() => setAlert(null)}
              dismissible
            >
              {alert.message}
            </Alert>
          )}
          <Form id="form">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={rpassword}
                onChange={(e) => setRpassword(e.target.value)}
                required
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
