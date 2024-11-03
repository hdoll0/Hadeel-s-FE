import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function WishListItem(prop) {
  const { item, removeItemWishList } = prop;
  const navigate = useNavigate();
  return (
    <div className="Wishlist-item">
      <img src={item.imageUrl} alt={item.name} />
      <p className="wishlist-item-title">{item.name} </p>
      <p className="wishlist-item-price">${item.price} </p>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => removeItemWishList(item.id)}
      >
        Remove
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate(`/products/${item.id}`)}
      >
        View Details
      </Button>
      <Button variant="outlined" color="primary" onClick={() => navigate("/")}>
        Go Back to Home
      </Button>
    </div>
  );
}

export default WishListItem;
