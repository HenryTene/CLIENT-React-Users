import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { Apiurl } from "../services/apirest";


function ModalAgregarPauta({ setPautas }) {
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(null);

  const [fecha, setFecha] = useState("");
  const [titular, setTitular] = useState("");
  const [resumen, setResumen] = useState("");
  const [rutaweb, setRutaweb] = useState("");
  const [rutaimagen, setRutaimagen] = useState("");
  const [rutavideo, setRutavideo] = useState("");

  const limpiarFormulario = () => {
    setFecha("");
    setTitular("");
    setResumen("");
    setRutaweb("");
    setRutaimagen("");
    setRutavideo("");
  };

  const handleClose = () => {
    limpiarFormulario();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const store = async (e) => {
    e.preventDefault();
    let pautaId = null;
    if (
      !fecha.trim() ||
      !titular.trim() ||
      !resumen.trim() ||
      !rutaweb.trim() ||
      !rutaimagen.trim() ||
      !rutavideo.trim()
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

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        `${Apiurl}pautas_internet`,
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

      pautaId = response.data.id;
      setPautas((prev) => {
        return [
          ...prev,
          {
            id: pautaId,
            fec_pauta: fecha,
            des_titular: titular,
            des_resumen: resumen,
            des_ruta_web: rutaweb,
            des_ruta_imagen: rutaimagen,
            des_ruta_video: rutavideo,
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
          <Button variant="primary" type="submit" onClick={store}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAgregarPauta;
