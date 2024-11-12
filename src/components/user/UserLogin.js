import { React, useState } from "react";
import { Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserLogin.css";
//Hadeel@outlook.com
//HhAa1234@@

//HadeelAbed2000@outlook.com
//Hadeel123456@@

export default function UserLogin(prop) {
  const { getUserData } = prop;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const [userSignIn, setUserSignIn] = useState({
    emailAddress: "",
    password: "",
  });

  function onchangeHandlerEmailSignIn(event) {
    setUserSignIn({ ...userSignIn, emailAddress: event.target.value });
  }

  function onchangeHandlerPasswordSignIn(event) {
    setUserSignIn({ ...userSignIn, password: event.target.value });
  }

  const navigate = useNavigate();

  function signInExistingUser() {
    const signinUrl = "http://localhost:5125/api/v1/user/signin";

    axios
      .post(signinUrl, userSignIn)
      .then((res) => {
        console.log(res, "response from sign in");
        if (res.status === 200) {
          localStorage.setItem("token", res.data);
        }
      })
      .then(() => {
        getUserData();
      })
      .then(() => {
        navigate("/profile");
      })
      .catch((error) => {});
  }
  return (
    <div className="user-login-container">
      <h2>Sign In</h2>
      <br />
      <TextField
        id="email"
        label="Email"
        variant="standard"
        helperText="Please enter your email"
        onChange={onchangeHandlerEmailSignIn}
        className="user-login-field"
      />
      <br />
      <FormControl variant="standard" className="user-login-field">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          type={showPassword ? "text" : "password"}
          onChange={onchangeHandlerPasswordSignIn}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <br />
      <Button onClick={signInExistingUser} className="user-login-button">
        {" "}
        Sign In
      </Button>

      <div className="user-login-footer">
        <h1> Do not have an account yet?</h1>
        <Link to="/signup">
          <Button className="create-account-button"> Create an account</Button>
        </Link>
      </div>
      <br />
    </div>
  );
}
