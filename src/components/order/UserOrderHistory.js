import { React, useEffect, useState } from "react";
import axios from "axios";
import OrderItem from "./OrderItem";
import "./UserOrderHistory.css";

export default function UserOrderHistory(prop) {
  const { userData } = prop;

  const [orderList, setOrderList] = useState([]);

  function getOrderByUserId() {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:5125/api/v1/order/user/${userData.userID}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => setOrderList(res.data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getOrderByUserId();
  }, []);

  if (orderList.length === 0) {
    return <div>You Haven't Ordered Anything Recently</div>;
  }

  return (
    <div className="orderListContainer">
      <div className="orderList">
        {orderList.map((order) => {
          return <OrderItem key={order.id} order={order} />;
        })}
      </div>
    </div>
  );
}
