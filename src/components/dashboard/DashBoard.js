import React from "react";
import { Link } from "react-router-dom";

export default function DashBoard() {
  return (
    <div>
      <h1> DashBoard</h1>

      <Link to="/product-dashboard"> Products</Link>
      <br />
      <Link to="/user-dashboard"> Users</Link>
      <br />
      <Link to="/category-dashboard"> Categories</Link>
      <br />
      <Link to="/Coupon-dashboard">Coupons</Link>
      <br />
      <Link to="/order-dashboard"> Orders</Link>
    </div>
  );
}
