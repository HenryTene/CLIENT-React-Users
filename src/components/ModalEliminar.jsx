import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { Apiurl } from "../services/apirest";

const ModalEliminar = ({ id, setUsers }) => {
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      // hacer la solicitud HTTP para eliminar el usuario con el ID especificado
      const response = await axios.delete(`${Apiurl}user/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      
      setAlert({
        variant: "success",
        message: response.data.message,
      });
      setTimeout(() => {
        setAlert(null);
        console.log(response.data.message);
        handleClose();
      }, 5000);
    } catch (error) {
      setAlert({
        variant: "danger",
        message: error.response.data.message,
      });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Eliminar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar usuario</Modal.Title>
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
          ¿Estás seguro de que quieres eliminar este usuario?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger"  type="submit" onClick={handleDelete}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEliminar;