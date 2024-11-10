import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderItemDashBoard from "./OrderItemDashBoard";

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
    <div>
      <h2>Order Dashboard</h2>
      <div>
        {orderList.length > 0 ? (
          orderList.map((order) => (
            <OrderItemDashBoard key={order.id} order={order} />
          ))
        ) : (
          <p>No orders available.</p>
        )}
      </div>
    </div>
  );
}
