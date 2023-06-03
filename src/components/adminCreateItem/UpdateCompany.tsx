import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


import { useSelector } from "react-redux";

import AdminComponent from "../adminComponents/AdminComponent";
import { AppState } from "../redux/app-state";

function UpdateCompanyManager() {
  let navigate = useNavigate();
  let company = useSelector((state: AppState) => state.companyForUpdate);

  let companyId= company.companyId;
  let [companyName, setCompanyName] = useState(company.companyName);
  let [address, setAddress] = useState(company.address);
  let [phoneNumber, setPhoneNumber] = useState(company.phoneNumber);

 
  async function onUpdateCompany(event: any) {
    try {
      debugger
      const response = await axios.put("http://localhost:8080/companies", {
        companyId,
        companyName,
        address,
        phoneNumber,
      });
      console.log(response);
      alert("Company  updated");
      navigate("/admin/companies");
    } catch (e) {
      alert(e);
      console.error(e);
    }
  }

  async function onDeleteCompany(event: any) {
  
    try {
      const url = `http://localhost:8080/companies/${companyId}`;
      const response = await axios.delete(url);
      console.log(response);

      alert("Company deleted");
      navigate("/admin/create/companies");
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
          defaultValue={company.companyName}
          onChange={(event) => setCompanyName(event.target.value)}
        />{" "}
        <br />
        <input
          type="text"
          placeholder="Adress"
          spellCheck="false"
          defaultValue={company.address}
          onChange={(event) => setAddress(event.target.value)}
        />{" "}
        <br />
        <input
          type="text"
          placeholder="Phone Number"
          spellCheck="false"
          defaultValue={company.phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />{" "}
        <br />
        <input
          className="submit-button"
          type="button"
          value="Update"
          onClick={onUpdateCompany}
        />{" "}
         <br />
        <input
          className="submit-button"
          type="button"
          value="Delete"
          onClick={onDeleteCompany}
        />{" "}
       
      </div>
  
    </div>
  );
}

export default UpdateCompanyManager;
