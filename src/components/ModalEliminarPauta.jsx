import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { Apiurl } from "../services/apirest";

function ModalDelete({ id, setDelete }) {
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClose = () => {
    if (!success) {
      setShow(false);
    } else {
      // Mostrar el mensaje de éxito durante 3 segundos
      setTimeout(() => {
        setShow(false);
        setSuccess(false);
      }, 3000);
    }
  };
  const handleShow = () => setShow(true);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const remove = async () => {
    try {
      const response = await axios.delete(
        `${Apiurl}pautas_internet/${id}`,
        config
      );

      setShowMessage(true);
      setTimeout(() => {
        setDelete(id);
        setShow(false);
      }, 2000);

      setAlert({
        variant: "success",
        message: response.data.message,
      });
    } catch (error) {
      setAlert({
        variant: "danger",
        message: error,
      });
      console.log(error);
    }
  };
  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Eliminar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Pauta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showMessage && ( // Muestra un mensaje de éxito y cierra el modal cuando el valor de "success" sea "true"
            <>
              <Alert variant={alert.variant}> {alert.message}</Alert>
            </>
          )}
          {"¿Estás seguro de que quieres eliminar esta Pauta? "}
          <br />
          {"Esta acción es irreversible"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={remove}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDelete;
