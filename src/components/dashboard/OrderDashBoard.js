import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import OrderItemDashBoard from "./OrderItemDashBoard";
import "./OrderDashBoard.css";

export default function OrderDashBoard(prop) {
  const { userData } = prop;
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    if (userData?.userID) {
      fetchOrdersForUser(userData.userID); // Fetch orders when userData is available
    }
  }, [userData]);

  // Fetch orders for the specific user using their userID
  function fetchOrdersForUser(userID) {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:5125/api/v1/order/user/${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOrderList(res.data)) // Directly set the orders for this user
      .catch((error) => console.log(error));
  }

  return (
    <div className="order-dashboard">
      <h2>Orders Dashboard</h2>
      <TableContainer component={Paper} className="order-table">
        <Table aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Original Price</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList.length > 0 ? (
              orderList.map((order) => (
                <OrderItemDashBoard key={order.id} order={order} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No orders available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
