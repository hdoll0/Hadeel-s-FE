import React from "react";
import "./Home.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate("/products");
  };

  return (
    <div className="home">
      <h1>Welcome to Dolly's E-Commerce</h1>
      <p>Your one-stop shop for quality products.</p>

      <Button variant="outlined" color="brown" onClick={handleShopNowClick}>
        Shop Now
      </Button>
    </div>
  );
}
