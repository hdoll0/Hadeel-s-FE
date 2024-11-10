import React from "react";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import HomeIcon from "@mui/icons-material/Home";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import logo from "../../images/work-in-progress.png";
import user from "../../images/user.png";
import profile from "../../images/profile.png";
import "./NavBar.css";

export default function NavBar(prop) {
  const { wishList, cartList, isAuthenticated, userData } = prop;
  const arrayLength = wishList.length;
  const cartArrayLength = cartList.length;

  return (
    <nav className="navbar">
      <img src={logo} alt="logo" />
      <ul className="nav-list">
        <Link to="/">
          <HomeIcon className="nav-icon" />
        </Link>

        <Link to="/products">
          <CheckroomIcon className="nav-icon" />
        </Link>

        <Badge badgeContent={arrayLength} color="primary">
          <Link to="/wishList">
            <FavoriteIcon className="nav-icon" />
          </Link>
        </Badge>

        <Badge badgeContent={cartArrayLength} color="primary">
          <Link to="/cart">
            <ShoppingBagOutlinedIcon className="nav-icon" />
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
            <DashboardCustomizeOutlinedIcon className="nav-icon" />
          </Link>
        ) : (
          <p style={{ display: "none" }}>Dashboard</p>
        )}
      </ul>
    </nav>
  );
}
