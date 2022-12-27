import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Apiurl } from "../services/apirest";


function ModalEliminar({ setUsers, id }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  
 

  const deleteUser = async (e) => {
    e.preventDefault();
    const response = await axios.delete(`${Apiurl}user/${id}`);  
    
    setUsers((prev) => {
      return prev.filter((user) => user.id !== id);
    })
    //fetchUsers();
    handleClose();
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
