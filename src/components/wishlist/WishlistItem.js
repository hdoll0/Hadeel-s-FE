import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./WishListStyle.css";

function WishListItem(prop) {
  const { item, removeItemWishList } = prop;
  const navigate = useNavigate();
  return (
    <div className="wishlist-item">
      <img src={item.imageUrl} alt={item.name} className="wishlist-image" />
      <p>{item.name} </p>
      <p>${item.price} </p>
      <div className="wishlist-item-buttons">
        <Button color="primary" onClick={() => removeItemWishList(item.id)}>
          Remove
        </Button>
        <Button
          color="primary"
          onClick={() => navigate(`/products/${item.id}`)}
        >
          View Details
        </Button>
        <Button color="primary" onClick={() => navigate("/")}>
          Go Back to Home
        </Button>
      </div>
    </div>
  );
}

export default WishListItem;
