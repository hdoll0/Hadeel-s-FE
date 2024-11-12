import React from "react";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";

import home from "../../images/home.png";
import heart from "../../images/heart.png";
import dashboard from "../../images/dashboard.png";
import bag from "../../images/shopping-bag.png";
import shop from "../../images/manicure.png";
import logo from "../../images/logo.png";
import user from "../../images/user.png";
import profile from "../../images/profile.png";
import "./NavBar.css";

export default function NavBar(prop) {
  const { wishList, cartList, isAuthenticated, userData } = prop;
  const arrayLength = wishList.length;
  const cartArrayLength = cartList.length;

  return (
    <nav className="navbar">
      <img src={logo} alt="logo" className="navbar-logo" />

      <ul className="nav-list">
        <Link to="/">
          <img src={home} alt="home" />
        </Link>

        <Link to="/products">
          <img src={shop} alt="shop" />
        </Link>

        <Badge badgeContent={arrayLength} color="primary">
          <Link to="/wishList">
            <img src={heart} alt="wishlist" />
          </Link>
        </Badge>

        <Badge badgeContent={cartArrayLength} color="primary">
          <Link to="/cart">
            <img src={bag} alt="shopping bag" />
          </Link>
        </Badge>

        {isAuthenticated ? (
          <Link to="/profile">
            <Avatar alt="user in" src={profile} />
          </Link>
        ) : (
          <Link to="/signin">
            <Avatar alt="user icon" src={user} />
          </Link>
        )}

        {isAuthenticated && userData.userRole === "Admin" ? (
          <Link to="/dashboard">
            <img src={dashboard} alt="dashboard" />
          </Link>
        ) : (
          <p style={{ display: "none" }}>Dashboard</p>
        )}
      </ul>
    </nav>
  );
}
