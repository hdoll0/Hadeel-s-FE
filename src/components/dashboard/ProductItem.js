import React from "react";
import { Button } from "@mui/material";
import axios from "axios";

export default function ProductItem(prop) {
  const { product, fetchData } = prop;

  function deleteProductById() {
    const token = localStorage.getItem("token");

    const url = `http://localhost:5125/api/v1/products/${product.id}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 204) {
          alert("a product is deleted successfully!");
          fetchData();
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <img src={product.imageUrl} alt={product.name} />
      <p> {product.name}</p>
      <br />
      <p> {product.description}</p>
      <br />
      <p> ${product.price}</p>
      <Button onClick={deleteProductById}> Delete</Button>
    </div>
  );
}
