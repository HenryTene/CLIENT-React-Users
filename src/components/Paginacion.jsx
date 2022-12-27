import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

function Paginacion({ active, totalpages, handlePageChange }) {
  return (
    <Pagination
      totalpages={totalpages}
      active={active}
      onSelect={handlePageChange}
    >
      {/* Botón "Anterior" */}
      {active > 1 && (
        <Pagination.Prev onClick={() => handlePageChange(active - 1)} />
      )}

      {/* Botones de página */}
      {[...Array(totalpages)].map((_, i) => (
        <Pagination.Item
          key={i + 1}
          active={i + 1 === active}
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </Pagination.Item>
      ))}

      {/* Botón "Siguiente" */}
      {active < totalpages && (
        <Pagination.Next onClick={() => handlePageChange(active + 1)} />
      )}
    </Pagination>
  );
}

export default Paginacion;
