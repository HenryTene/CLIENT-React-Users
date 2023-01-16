import React, { useState, useEffect } from "react";
import { Apiurl } from "../services/apirest";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Button, Form, Stack, Col,Row,Container } from "react-bootstrap";
import ModalEliminarPauta from "./ModalEliminarPauta";
import ModalEditarPauta from "./ModalEditarPauta";
import ModalAgregarPauta from "./ModalAgregarPauta";

const TablaPautas = () => {
  const [pautas, setPautas] = useState([]);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(1);
  const [deleted, setDeleted] = useState(null);
  const [id, setId] = useState(null);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (deleted !== id) {
      setPautas((prev) => prev.filter((pautas) => pautas.id !== deleted));
      setDeleted(id);
    }
  }, [deleted]);

  const getAllUsers = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(`${Apiurl}pautas_internet`, config);
      setPautas(response.data.pautas);
      console.log(response.data.pautas);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
     <Container>
        <Row></Row>
        <Row>
          <Col></Col>
          <Col></Col>
      <Col>
        {" "}
        <Stack direction="horizontal" gap={3}>
          <div className="justify-content-end ">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Buscar"
                className="me-2"
                aria-label="Search"
                onChange={handleChange}
                // onChange={}
                //value={}
              />
            </Form>
          </div>
          <div>
            <ModalAgregarPauta setPautas={setPautas} />
          </div>
        </Stack>
      </Col>

      </Row>
      </Container>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Titular</th>
            <th>Resumen</th>
            <th>Ruta Web</th>
            <th>ruta Imagen</th>
            <th>Ruta Video</th>
          </tr>
        </thead>
        <tbody>
          {pautas
            .filter(
              (pauta) =>
                pauta.des_titular
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                pauta.des_resumen
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                pauta.des_ruta_web
                  .toLowerCase()
                  .includes(search.toLowerCase()) 
                  //||
                //  pauta.fec_pauta.toISOString().includes(search)
            )
            .map((pauta, index) => (
              <tr key={pauta.id}>
                <td>{index + 1}</td>
                <td>{pauta.fec_pauta}</td>
                <td>{pauta.des_titular}</td>
                <td>{pauta.des_resumen}</td>
                <td>{pauta.des_ruta_web}</td>
                <td>{pauta.des_ruta_imagen}</td>
                <td>{pauta.des_ruta_video}</td>
                <td>
                  <div>
                    <ModalEditarPauta id={pauta.id} setPautas={setPautas} />
                    <ModalEliminarPauta id={pauta.id} setDelete={setDeleted} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default TablaPautas;
