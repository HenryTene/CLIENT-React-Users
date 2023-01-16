import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Apiurl } from "../services/apirest";
import Alert from "react-bootstrap/Alert";

function ModalEditarPauta({ setPautas, id }) {
  const [show, setShow] = useState(false);
  const [fecha, setFecha] = useState("");
  const [titular, setTitular] = useState("");
  const [resumen, setResumen] = useState("");
  const [rutaweb, setRutaweb] = useState("");
  const [rutaimagen, setRutaimagen] = useState("");
  const [rutavideo, setRutavideo] = useState("");
  const [alert, setAlert] = useState(null);

  const handleClose = () => setShow(false);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const update = async (e) => {
    e.preventDefault();
    const dir = `${Apiurl}pautas_internet/${id}`;
    if (
      !fecha.trim() ||
      !titular.trim() ||
      !resumen.trim() ||
      !rutaweb.trim() ||
      !rutaimagen.trim() ||
      !rutaweb.trim()
    ) {
      setAlert({
        variant: "danger",
        message: "Los campos no pueden estar vacios",
      });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
      return;
    }

    try {
      await axios.put(
        dir,
        {
          fec_pauta: fecha,
          des_titular: titular,
          des_resumen: resumen,
          des_ruta_web: rutaweb,
          des_ruta_imagen: rutaimagen,
          des_ruta_video: rutavideo,
        },
        config
      );

      setPautas((prev) => {
        return prev.map((pauta) => {
          if (pauta.id === id) {
            return {
              ...pauta,
              fec_pauta: fecha,
              des_titular: titular,
              des_resumen: resumen,
              des_ruta_web: rutaweb,
              des_ruta_imagen: rutaimagen,
              des_ruta_video: rutavideo,
            };
          }
          return pauta;
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
      let er = null;
      if (error.response.data.message === "The email has already been taken.") {
        er = "El email ya ha sido registrado";
      } else {
        er = error.response.data.message;
      }
      setAlert({
        variant: "danger",
        message: er,
      });
      setTimeout(() => {
        setAlert(null);
      }, 1500);
    }
  };

  const getPautasById = async () => {
    const response = await axios.get(`${Apiurl}pautas_internet/${id}`,config);
    setFecha(response.data.fec_pauta);
    setTitular(response.data.des_titular);
    setResumen(response.data.des_resumen);
    setRutaweb(response.data.des_ruta_web);
    setRutaimagen(response.data.des_ruta_imagen);
    setRutavideo(response.data.des_ruta_video);
  };

  const handleShow = () => {
    getPautasById();
    setShow(true);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Pauta</Modal.Title>
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
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="text"
                placeholder="Fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
              <Form.Label>Titular</Form.Label>
              <Form.Control
                type="text"
                placeholder="Titular"
                value={titular}
                onChange={(e) => setTitular(e.target.value)}
              />
              <Form.Label>Resumen</Form.Label>
              <Form.Control
                type="text"
                placeholder="Resumen"
                value={resumen}
                onChange={(e) => setResumen(e.target.value)}
              />
              <Form.Label>Ruta Web</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ruta Web"
                value={rutaweb}
                onChange={(e) => setRutaweb(e.target.value)}
              />
              <Form.Label>Ruta Imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ruta Imagen"
                value={rutaimagen}
                onChange={(e) => setRutaimagen(e.target.value)}
              />
              <Form.Label>Ruta Video</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ruta Video"
                value={rutavideo}
                onChange={(e) => setRutavideo(e.target.value)}
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

export default ModalEditarPauta;
