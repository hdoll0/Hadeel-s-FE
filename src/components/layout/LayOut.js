import React from "react";
import NavBar from "../navbar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import "./LayOut.css";

export default function LayOut(prop) {
  const { wishList, cartList, isAuthenticated, userData } = prop;
  return (
    <div className="layout-container">
      <NavBar
        wishList={wishList}
        isAuthenticated={isAuthenticated}
        userData={userData}
        cartList={cartList}
      />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
