import React, { useState, useEffect } from "react";
import axios from "axios";
import UserItem from "./UserItem";

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
    <div>
      <h1> User DashBoard</h1>
      <div>
        {userList.map((user) => {
          return (
            <UserItem
              key={user.userID}
              user={user}
              fetchUserList={fetchUserList}
            />
          );
        })}
      </div>
    </div>
  );
}
