import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Container, Row, Col, Form } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import { Apiurl } from "../services/apirest";
import axios from "axios";
import ModalAgregar from "./ModalAgregar";
import ModalEditar from "./ModalEditar";
import ModalEliminar from "./ModalEliminar";
import Paginacion from "./Paginacion";

const Tabla = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const response = await axios.get(`${Apiurl}users`);
    setUsers(response.data);
  };

  //Funcion de Busqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  //Metodo de filtrado
  let results = [];
  if (!search) {
    results = users;
    //console.log(results);
  } else {
    results = users.filter((dato) =>
      dato.name.toLowerCase().includes(search.toLowerCase())||
      dato.email.toLowerCase().includes(search.toLowerCase())||
      dato.id.toString().includes(search.toString())
    );
  }

  // Calcular el número total de páginas
  const totalpages  = Math.ceil(users.length / itemsPerPage);

  const startIndex = (active - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  //const currentPageItems = users.slice(startIndex, endIndex);
  const currentPageItems = results.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setActive(pageNumber);
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
                    /* onChange={handleChange} */
                    onChange={searcher}
                    value={search}
                  />
                </Form>
              </div>
              <div>
                <ModalAgregar setUsers={setUsers} />
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>correo</th>

              <th className="ms-auto">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td> {user.email} </td>
                <td>
                  <div className="mb-2">
                    <ModalEditar id={user.id} setUsers={setUsers} />{" "}
                    <ModalEliminar id={user.id} setUsers={setUsers} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Container style={{ display: "flex", justifyContent: "flex-end" }}>
          <Paginacion
            active={active}
            totalpages ={totalpages}
            handlePageChange={handlePageChange}
          />
        </Container>
      </Container>
    </>
  );
};

export default Tabla;
