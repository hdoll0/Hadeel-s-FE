import React from "react";
import axios from "axios";
import { Button } from "@mui/material";

export default function UserItem(prop) {
  const { user, fetchUserList } = prop;

  function deleteUser() {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:5125/api/v1/user/${user.userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 204) {
          alert("A User Is Deleted");
          fetchUserList();
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <p> Email: {user.emailAddress}</p>
      <p> Role: {user.userRole}</p>
      <Button onClick={deleteUser}> Delete </Button>
    </div>
  );
}
