import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Apiurl } from "../services/apirest";

function ModalEditar({setUsers,id}) {
 
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  
  

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const update = async (e) => {
    e.preventDefault();
    const dir = `${Apiurl}user/${id}`;
    await axios.put(dir, {
      name: name,
      email: email,
    });

    setUsers((prev)=>{
      return prev.map((user)=>{
        if(user.id === id){
          return{
            ...user,
            name:name,
            email:email
          }
        }
        return user
      })

    })   
    handleClose();
  };

  useEffect(() => {
    const getUserById = async () => {
      const response = await axios.get(`${Apiurl}user/${id}`);
      setName(response.data.name);
      setEmail(response.data.email);
    };
    getUserById();
  }, []);

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
          <Form /* onSubmit={store} */>
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
