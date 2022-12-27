import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Apiurl } from "../services/apirest";
import Alert from "react-bootstrap/Alert";

function ModalEditar({ setUsers, id }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(null);

  const handleClose = () => setShow(false);
  
  const update = async (e) => {
    e.preventDefault();
    const dir = `${Apiurl}user/${id}`;
    if (!name.trim() || !email.trim()) {
      setAlert({
        variant: "danger",
        message: "Los campos no pueden estar vacios",
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

    try {
      await axios.put(dir, {
        name: name,
        email: email,
      });

      setUsers((prev) => {
        return prev.map((user) => {
          if (user.id === id) {
            return {
              ...user,
              name: name,
              email: email,
            };
          }
          return user;
        });
      });
      setAlert({
        variant: "success",
        message: "El registro ha sido modificado con éxito",
      });
      setTimeout(() => {
        setAlert(null);
        handleClose();
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };



  const getUserById = async () => {
    const response = await axios.get(`${Apiurl}user/${id}`);
    setName(response.data.name);
    setEmail(response.data.email);
  };


  const handleShow = () => {
    getUserById();
    setShow(true);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar usuario</Modal.Title>
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
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" onClick={update}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditar;
