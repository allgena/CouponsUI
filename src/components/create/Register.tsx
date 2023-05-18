import React, { useState } from "react";
import axios from "axios";
import "../create/Register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  let [userName, setName] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [address, setAddress] = useState("");
  let [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function createCustomer():Promise<void>{
    try {
      const response = await axios.post("http://localhost:8080/customers", 
                    {user:{userName,password,phoneNumber},address});
      console.log(response);
      navigate("/register");
      }
      
     catch (e) {
      console.log(e);
      }
  }

  return (
    <div className="Register">
      <div className="container">
        <h3>Sign Up</h3>
        <input
          type="text"
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
        />
        <br />

        <input
          type="text"
          placeholder="Phone number"
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Address"
          onChange={(event) => setAddress(event.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <input type="button" value="Create" onClick={createCustomer} />
        <br />
      </div>
    </div>
  );
}

export default Register;