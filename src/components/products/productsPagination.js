import React from "react";
import Pagination from "@mui/material/Pagination";
import "./Product.css";

export default function ProductsPagination(prop) {
  const { totalCount, page, handleChange } = prop;
  return (
    <div className="pagination-container">
      <Pagination count={totalCount} page={page} onChange={handleChange} />
    </div>
  );
}
