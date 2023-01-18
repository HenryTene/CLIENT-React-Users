import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import { Apiurl } from "../services/apirest";
import axios from "axios";

const PaginacionPautas = ({ per_page,onPerPageChange }) => {
  const [active, setActive] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [pautas, setPautas] = useState([]);

  useEffect(() => {
    const getPageData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${Apiurl}pautas_internet/pagination/${active}/${per_page}`,
          config
        );
        setTotalPages(response.data.totalPages);
        setPautas(response.data.pautas);
      } catch (error) {
        console.log(error);
      }
    };
    getPageData();
  }, [active, per_page]);

  function handlePageClick(page) {
    if (page < 1 || page > totalPages) {
      setError("Invalid page number");
      return;
    }
    setError(null);
    setActive(page);
  }
  return (
    <>
      <div>
        {error && <div>{error}</div>}
        <Pagination>
          {active > 1 && (
            <Pagination.Prev onClick={() => handlePageClick(active - 1)} />
          )}

          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === active}
              onClick={() => handlePageClick(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}

          {active < totalPages && (
            <Pagination.Next onClick={() => handlePageClick(active + 1)} />
          )}
        </Pagination>
      </div>
    </>
  );
};
export default PaginacionPautas;
