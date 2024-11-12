import React, { useState, useEffect } from "react";
import axios from "axios";
import UserItem from "./UserItem";
import "./UserDashBoard.css";

export default function UserDashBoard() {
  const [userList, setUserList] = useState([]);

  function fetchUserList() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5125/api/v1/user?limit=1000&offset=0", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUserList(res.data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchUserList();
  }, []);
  return (
    <div className="user-dashboard">
      <h1>Users Dashboard</h1>
      <div className="user-list">
        {userList.map((user) => (
          <div key={user.userID} className="user-item">
            <UserItem user={user} fetchUserList={fetchUserList} />
          </div>
        ))}
      </div>
    </div>
  );
}
