import React, { useState, useEffect } from "react";
import { Apiurl } from "../services/apirest";
import axios from "axios";
import Table from "react-bootstrap/Table";

const TablaPautas = () => {
  const [pautas, setPautas] = useState([]);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(1);
  const [deleted, setDeleted] = useState(null);
  const [id, setId] = useState(null);


  useEffect(() => {
    getAllUsers();
  }, []);


  const getAllUsers = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
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
      {pautas.map((pauta, index) => (
          <tr key={pauta.id}>
            <td>{index + 1}</td>
            <td>{pauta.fec_pauta}</td>
            <td>{pauta.des_titular}</td>
            <td>{pauta.des_resumen}</td>
            <td>{pauta.des_ruta_web}</td>
            <td>{pauta.des_ruta_imagen}</td>
            <td>{pauta.des_ruta_video}</td>
          </tr>
        ))}

      </tbody>
    </Table>
  )
};

export default TablaPautas;
