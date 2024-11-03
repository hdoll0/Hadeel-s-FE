import React from "react";
import NavBar from "../navbar/NavBar";
import { Outlet } from "react-router-dom";

export default function LayOut(prop) {
  const { wishList } = prop;
  return (
    <div>
      <NavBar wishList={wishList} />
      <Outlet />
    </div>
  );
}
