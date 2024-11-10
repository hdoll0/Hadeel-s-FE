import { React, useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

export default function CartList(prop) {
  const { cartList, setCartList, userData } = prop;
  const navigate = useNavigate();

  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponId, setCouponId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(
    cartList.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  const [paymentMethod, setPaymentMethod] = useState("CreditCard");

  const subtotal = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
    // Update total price whenever cartList or discount changes
    setTotalPrice(
      cartList.reduce((acc, item) => acc + item.price * item.quantity, 0) *
        (1 - discount)
    );
  }, [cartList, discount]);

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

  function applyCoupon() {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:5125/api/v1/coupons/code/${couponCode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const discountPercentage = res.data.discountPercentage;
        setDiscount(discountPercentage / 100);
        setCouponId(res.data.couponId);
      })
      .catch((err) => console.error("Invalid coupon", err));
  }

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
          const orderId = res.data.id; // Retrieve orderId from response
          processPayment(orderId);
        }
      })
      .catch((error) => console.log(error));
  }

  // Process payment using orderId and couponId
  function processPayment(orderId) {
    const paymentData = {
      finalPrice: totalPrice,
      method: paymentMethod,
      couponId: couponId,
      orderId: orderId,
    };

    axios
      .post("http://localhost:5125/api/v1/payments", paymentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Payment successful!");
          setCartList([]); // Clear cart on successful payment
          navigate("/products"); // Navigate only after payment success
        }
      })
      .catch((error) => console.error("Payment failed", error));
  }

  function handlePaymentMethodChange(event) {
    setPaymentMethod(event.target.value);
  }

  return (
    <div>
      {cartList.map((cart) => (
        <CartItem
          key={cart.id}
          cart={cart}
          cartList={cartList}
          setCartList={setCartList}
        />
      ))}
      <div>
        <p>Subtotal: {subtotal.toFixed(2)}</p>
        <p>Discount: -{discountAmount.toFixed(2)}</p>
        <p>
          <strong>Order Total: {total.toFixed(2)}</strong>
        </p>
      </div>

      <TextField
        label="Coupon Code"
        variant="outlined"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
      />
      <Button onClick={applyCoupon}>Apply Coupon</Button>

      <h4>Select Payment Method:</h4>
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Payment Method</InputLabel>
        <Select
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
          label="Payment Method"
        >
          <MenuItem value="CreditCard">Credit Card</MenuItem>
          <MenuItem value="PayPal">PayPal</MenuItem>
          <MenuItem value="Cash">Cash</MenuItem>
          {/* Add other methods as needed */}
        </Select>
      </FormControl>

      <Button onClick={checkOut}>Checkout</Button>
    </div>
  );
}
