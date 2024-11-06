import React, { useState } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { TextField } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UserProfile(prop) {
  const { userData, setUserData } = prop;
  console.log(userData, "userData from profile");
  console.log("User ID:", userData.userID);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [newName, setNewName] = useState("");
  // get new information - firstName
  function onChangeHandlerName(event) {
    setNewName(event.target.value);
  }

  function updateUserProfile() {
    const token = localStorage.getItem("token");

    // send data to backend
    axios
      .put(
        `http://localhost:5125/api/v1/user/${userData.userID}`,
        {
          Name: newName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setUserData(res.data);
        setAnchorEl(null);
      })
      .catch((error) => console.log(error));
  }

  function logOutHandler() {
    localStorage.removeItem("token");
    setUserData(null);
  }

  return (
    <div>
      <p>Profile Here</p>
      <p>Email: {userData.emailAddress}</p>
      <p>Name: {userData.name}</p>
      <p>Role: {userData.userRole}</p>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Edit
      </Button>
      <br />
      <Button variant="contained" onClick={logOutHandler}>
        Sign Out
      </Button>
      <br />
      <Button variant="contained">
        <Link to="/orders"> Order History</Link>
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <TextField
          id="Name"
          label="Name"
          variant="standard"
          helperText="Please Enter Your New Name"
          onChange={onChangeHandlerName}
        />
        <Button onClick={updateUserProfile}> Edit </Button>
      </Popover>
    </div>
  );
}
