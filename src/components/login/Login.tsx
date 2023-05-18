import React, { useState } from "react";
import axios from "axios";
import "../login/Login.css";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import ISuccessfulLoginData from "../models/ISuccessFulLoginData";

function Login() {
  let [userName, setUserName] = useState("");
  let [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function onLogin() {
    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        userName,
        password,
      });
      let token: string = response.data;
      let decodedToken: any = jwt_decode(token);
      let strSuccessfulLoginResponse: string = decodedToken.sub;
      let successfulLoginResponse: ISuccessfulLoginData = JSON.parse(
        strSuccessfulLoginResponse
      );
      console.log("Decoded: ", successfulLoginResponse);

      if (successfulLoginResponse.userType === "CUSTOMER") {
        navigate("/customer");
      } else if (successfulLoginResponse.userType === "CONPANY") {
        navigate("/conpany");
      } else if (successfulLoginResponse.userType === "ADMIN") {
        navigate("/admin");
      }
    } catch (e: any) {
      console.error(e);
      if (e.response?.data?.error?.message) {
        alert(e.response.data.error.message);
      } else {
        alert("Login invalid, try later");
      }
    }
  }

  return (
    <body>
      <div className="Login">
        <h3>Sign In</h3>
        <div className="#">
          <input
            type="text"
            placeholder="User Name"
            onChange={(event) => setUserName(event.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />
        </div>
        <div className="chek">
          <input type="checkbox" value="yes" />
          <p> Keep me Signed in</p>
        </div>
        <div className="login button">
          <input type="button" value="Login" onClick={onLogin} />
          <br />
        </div>
        <p>
          Not a member? <span className="sign up">Sing Up</span>
        </p>
        <br />
      </div>
    </body>
  );
}

export default Login;