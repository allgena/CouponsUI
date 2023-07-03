import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminComponent from "../adminComponents/AdminComponent";

function CreateCompanyManager() {
  let navigate = useNavigate();

  let [companyId, setCompanyId] = useState(0);
  let [companyName, setCompanyName] = useState("");
  let [address, setAddress] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");

  async function onCreateCompany(event: any) {
    if (!companyName || !address || !phoneNumber) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/companies", {
        companyName,
        address,
        phoneNumber,
      });
      console.log(response);
      alert("Company created");
      navigate("/admin/companies");
    } catch (e) {
      alert(e);
      console.error(e);
    }
  }

  function BackToAdminPage() {
    navigate("/admin");
  }

  return (
    <div className="company-creater">
      <AdminComponent />
      <h3>Create company</h3>
      <div className="inputs-container">
        <br />
        <input
          type="text"
          placeholder="Name"
          spellCheck="false"
          onChange={(event) => setCompanyName(event.target.value)}
        />{" "}
        <br />
        <input
          type="text"
          placeholder="Adress"
          spellCheck="false"
          onChange={(event) => setAddress(event.target.value)}
        />{" "}
        <br />
        <input
          type="text"
          placeholder="Phone Number"
          spellCheck="false"
          onChange={(event) => setPhoneNumber(event.target.value)}
        />{" "}
        <br />
        <input
          className="submit-button"
          type="button"
          value="Create"
          onClick={onCreateCompany}
        />{" "}
      </div>
    </div>
  );
}

export default CreateCompanyManager;
