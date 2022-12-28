import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { Apiurl } from "../services/apirest";

function ModalEliminar({ setUsers, id }) {
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(null);

  
  const handleClose = () => {
    setTimeout(() => {
      setShow(false);
    }, 5000);
  };
  const handleShow = () => {
    setShow(true);
  };

  const deleteUser = async (e) => {
    e.preventDefault();
    
    try {
     const  response = await axios.delete(`${Apiurl}user/${id}`);
      setUsers((prev) => {
        return prev.filter((user) => user.id !== id);
      });
      
      setAlert({
        variant: "success",
        message: response.data.message,
      });

      setTimeout(() => {        
        handleClose();
      }, 5000);

    } catch (error) {
      setAlert({
        variant: "danger",
        message: error.response,
      });
      setTimeout(() => {
        
        handleClose();
      }, 5000);
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
          Atención , ¿Está seguro de querer borrar el registro?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" type="submit" onClick={deleteUser}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEliminar;