import React from "react";
import { IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "@mui/material";
import "./CartList.css";

export default function CartItem(prop) {
  const { cart, cartList, setCartList } = prop;

  function increaseProductQuantity(id) {
    const newCartList = cartList.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartList(newCartList);
  }

  function decreaseProductQuantity(id) {
    const newCartList = cartList.map((item) => {
      if (item.quantity === 1) {
        return item;
      }
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartList(newCartList);
  }

  function removeProduct(cart) {
    setCartList(cartList.filter((cartItem) => cartItem.id !== cart.id));
  }

  return (
    <div className="cart-item">
      <img src={cart.imageUrl} alt={cart.name} />
      <p>{cart.name}</p>
      <p>{cart.price}</p>

      <div className="cart-item-quantity">
        <IconButton onClick={() => decreaseProductQuantity(cart.id)}>
          <RemoveIcon />
        </IconButton>
        <TextField
          variant="outlined"
          value={cart.quantity}
          inputProps={{
            style: { textAlign: "center" },
            readOnly: true,
          }}
          style={{ width: "50px", margin: "0 8px" }}
        />
        <IconButton onClick={() => increaseProductQuantity(cart.id)}>
          <AddIcon />
        </IconButton>
      </div>
      <Button
        color="primary"
        onClick={() => removeProduct(cart)}
        className="cartlist-item-buttons"
      >
        Remove
      </Button>
    </div>
  );
}
