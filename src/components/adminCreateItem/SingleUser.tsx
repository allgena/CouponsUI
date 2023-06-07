import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState } from "../redux/app-state";
import AdminComponent from "../adminComponents/AdminComponent";
import "./Create.css"
import IUser from "../models/IUser";


function SingleUser(props: IUser) {
  
  let navigate = useNavigate();
  let user = useSelector((state: AppState) => state.userForUpdate);
  
  let [userId, setUserId] = useState(user.userId);
  let [userName, setUserName] = useState(user.userName);
  let [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  let [companyName, setCompanyName] = useState(user.companyName);
  let [userType, setUserType] = useState(user.userType);

  let companiesNames = useSelector((state: AppState) => state.companiesNames);

  let userTypes = ["COMPANY", "ADMIN", "CUSTOMER"];

 
  async function onUpdateUser(event: any) {
    try {
      const response = await axios.put("http://localhost:8080/users", {
        userId,
        userName,
        userType,
        phoneNumber,
        companyName,

      });
      console.log(response);
      alert("User updated");
    } catch (e) {
      alert(e);
      console.error(e);
    }
  }
  // function BackToAdmin() {
  //   navigate("/admin/tab");
  // }

  return (
    <div className="coupon-creater">
        <AdminComponent />
      <h3>Update user</h3>
      <div className="inputs-container">
       
        <label htmlFor="name"> User Name: </label>
        <br />
        <input
          type="text"
          defaultValue={user.userName}
          spellCheck="false"
          name="name"
          onChange={(event) => setUserName(event.target.value)}
        />{" "}
        
        <br />
        <br />
        <label htmlFor="name"> User Type: </label>
        <br />
        <select
          name="categoryId"
          value={userType}
          onChange={(event) => setUserType(event.target.value)}
        >
          {userTypes.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <br></br>
        <br></br>
        <label htmlFor="companyId"> Phone: </label>
        <br />
        <input
          type="text"
          defaultValue={`${user.phoneNumber}`}
          spellCheck="false"
          name="companyId"
          onChange={(event) => setPhoneNumber(event.target.value)}
        />{" "}
         <br />
        <br></br>
        <label htmlFor="price">Company Name: </label>
        <br />
        
        {/* <input
          type="text"
          defaultValue={`${user.companyName}`}
          name="price"
          onChange={(event) => setCompanyName(event.target.value)}
        />{" "} */}
     
        <select
          name="categoryId"
          value={companiesNames}
          onChange={(event) => setCompanyName(event.target.value)}
        >
          {companiesNames.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <br></br>
         <br />
         <br />
                <input
          className="submit-button"
          type="button"
          value="Update"
          onClick={onUpdateUser}
        />
        <br />
      </div>
    </div>
  );
}

export default SingleUser;
