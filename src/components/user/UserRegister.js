import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  const [userInformation, setUserInformation] = useState({
    emailAddress: "",
    password: "",
    name: "",
    phone: "",
  });

  function onchangeHandlerEmail(event) {
    setUserInformation({
      ...userInformation,
      emailAddress: event.target.value,
    });
  }

  function onchangeHandlerPassword(event) {
    setUserInformation({
      ...userInformation,
      password: event.target.value,
    });
  }

  function onchangeHandlerName(event) {
    setUserInformation({
      ...userInformation,
      name: event.target.value,
    });
  }

  function onchangeHandlerPhone(event) {
    setUserInformation({
      ...userInformation,
      phone: event.target.value,
    });
  }

  const navigate = useNavigate();

  function registerNewUser() {
    const signupUrl = "http://localhost:5125/api/v1/user/signup";

    axios
      .post(signupUrl, userInformation)
      .then((res) => {
        console.log(res, "response from post");
        if (res.status === 201) {
          navigate("/signup");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 400) {
          if (err.response.data.message) {
            alert(err.response.data.message);
          }
          if (err.response.data.errors?.EmailAddress) {
            alert(err.response.data.errors.EmailAddress[0]);
          }
          if (err.response.data.errors?.Password) {
            alert(err.response.data.errors.Password[0]);
          }
        }
      });
  }
  return (
    <div>
      <TextField
        id="name"
        label="Name"
        variant="standard"
        helperText="Please enter your name"
        onChange={onchangeHandlerName}
      />
      <br />
      <TextField
        id="email"
        label="Email"
        variant="standard"
        helperText="Please enter your email"
        onChange={onchangeHandlerEmail}
      />
      <br />
      <TextField
        id="password"
        label="Password"
        variant="standard"
        helperText="Please enter your password"
        onChange={onchangeHandlerPassword}
      />
      <br />
      <TextField
        id="phone"
        label="Phone"
        variant="standard"
        helperText="Please enter your phone number"
        onChange={onchangeHandlerPhone}
      />
      <br />
      <Button onClick={registerNewUser}> Sign Up</Button>
    </div>
  );
}
