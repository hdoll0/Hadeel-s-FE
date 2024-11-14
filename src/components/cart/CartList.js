import { React, useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import "./CartList.css";

export default function CartList(prop) {
  const { cartList, setCartList, userData } = prop;
  const navigate = useNavigate();

  const subtotal = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);

  if (cartList.length === 0) {
    return (
      <div>
        <h3>Bag Is Empty! Show Some Love To Your Bag</h3>
        <Button>
          <Link to="/products">
            Fill Your Bag With Things That Makes You Happy!
          </Link>
        </Button>
      </div>
    );
  }

  const orderDetails = cartList.map((item) => {
    return { quantity: item.quantity, productId: item.id };
  });

  const token = localStorage.getItem("token");

  // check out
  function checkOut() {
    // check if user is log in
    if (!userData) {
      alert("Please Sign In For Checkout");
      navigate("/signin");
      return;
    }

    const orderUrl = "http://localhost:5125/api/v1/order";
    axios
      .post(
        orderUrl,
        { orderDetails: orderDetails },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          alert("Order is created Successfully!");
          setCartList([]);
          navigate("/products");
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="cart-page-container">
      <div className="cart-items">
        {cartList.map((cart) => (
          <CartItem
            key={cart.id}
            cart={cart}
            cartList={cartList}
            setCartList={setCartList}
          />
        ))}
      </div>
      <div className="cart-summary">
        <p>Subtotal: {subtotal.toFixed(2)}</p>
      </div>

      <Button className="checkout-button" onClick={checkOut}>
        Checkout
      </Button>
    </div>
  );
}
