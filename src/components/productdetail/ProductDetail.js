import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import NotFoundPage from "../../pages/NotFoundPage";
import Button from "@mui/material/Button";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { productId } = useParams();

  const [productDetail, setProductDatail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function fetchProductById() {
    const UrlproductById = `http://localhost:5125/api/v1/products/${productId}`;
    axios
      .get(UrlproductById)
      .then((respons) => {
        setProductDatail(respons.data);
        setLoading(false);
      })

      .catch((error) => {
        console.error("Error fetching product:", error);
        setError("Error loading product details");
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchProductById();
  }, [productId]);

  if (loading) {
    return <LinearProgress />;
  }

  if (error) {
    return <NotFoundPage message={error} />;
  }

  return productDetail ? (
    <div className="product-detail">
      <img src={productDetail.imageUrl} alt={productDetail.name} />
      <p className="name"> {productDetail.name}</p>
      <p className="description"> {productDetail.description}</p>
      <p className="price"> {productDetail.price} $</p>
      <Link to="/products">
        <Button color="primary" onClick={() => navigate("/products")}>
          {" "}
          Go back
        </Button>
      </Link>
    </div>
  ) : null;
}
