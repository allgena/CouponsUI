import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState } from "../redux/app-state";
import ICoupon from "../models/ICoupon";
import CompanyComponent from "./CompanyComponent";
import "./Create.css"



function CompanyCouponManager(props: ICoupon) {
  
  let navigate = useNavigate();
  let coupon = useSelector((state: AppState) => state.coupon);
  let [couponId, setCouponID] = useState(coupon.couponId);
  let [couponName, setName] = useState(coupon.couponName);
  let [price, setPrice] = useState(coupon.price);
  let [description, setDescription] = useState(coupon.description);
  let [startDate, setStartDate] = useState(coupon.startDate);
  let [endDate, setEndDate] = useState(coupon.endDate);
  let [category, setCategory] = useState(coupon.category);
  let [companyName, setCompanyName] = useState(coupon.companyName);
  let [imageURL, setImageURL] = useState(coupon.imageURL);

  let userCompanyName = useSelector((state: AppState) => state.logInData.companyName);


  let categories = ["FOOD", "TOYS", "COSMETICS", "ELECTRONICS"];

  async function onCreateCoupon(event: any) {
    try {
      const response = await axios.post("http://localhost:8080/coupons", {
        couponName,
        price,
        description,
        startDate,
        endDate,
        category,
        companyName,
        imageURL,
      });
      console.log(response);
      alert("Coupon successfully created!");
      navigate("/company");
    } catch (e) {
      alert(e);
      console.error(e);
    }
  }
async function onUpdateCoupon(event: any) {
    try {
      const response = await axios.put("http://localhost:8080/coupons", {
        couponId,
        couponName,
        price,
        description,
        startDate,
        endDate,
        category,
        companyName,
        imageURL,
      });
      console.log(response);
      alert("Coupon updated");
  
    } catch (e) {
      alert(e);
      console.error(e);
    }
  }




  return (
    <div className="coupon-creater">
        <CompanyComponent />
      <h3>Create Coupon</h3>
      <div className="inputs-container">
       
        <label htmlFor="name"> Coupon Name: </label>
        <br />
        <input
          type="text"
          defaultValue={props.couponName}
          spellCheck="false"
          name="name"
          onChange={(event) => setName(event.target.value)}
        />{" "}
        <br />
        <label htmlFor="companyId"> Company name: </label>
        <br />
        <input
          type="text"
          defaultValue={`${userCompanyName}`}
          spellCheck="false"
          name="companyId"
          onChange={(event) => setCompanyName(event.target.value)}
        />{" "}
        <br></br>
        <label htmlFor="price">Price: </label>
        <br />
        <input
          type="text"
          defaultValue={`${props.price}`}
          name="price"
          onChange={(event) => setPrice(+event.target.value)}
        />{" "}
        <br />
        <label htmlFor="description"> Description: </label>
        <br />
        <input
          type="text"
          defaultValue={props.description}
          spellCheck="false"
          name="description"
          onChange={(event) => setDescription(event.target.value)}
        />{" "}
        <br />
        <label htmlFor="startDate">Start Date: </label>
        <br />
        <input
          type="date"
          defaultValue={props.startDate}
          name="startDate"
          onChange={(event) => setStartDate(event.target.value)}
        />{" "}
        <br />
        <label htmlFor="endDate">End Date: </label>
        <br />
        <input
          type="date"
          defaultValue={props.endDate}
          name="endDate"
          onChange={(event) => setEndDate(event.target.value)}
        />{" "}
        <br />
        <label htmlFor="categoryId">Category: </label>
        <br />
        <select
          name="categoryId"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* <input
          type="text"
          defaultValue={`${props.category}`}
          spellCheck="false"
          name="categoryId"
          onChange={(event) => setCategory(event.target.value)}
        />{" "}
        <br /> */}
        
        <br />
        <label htmlFor="companyId"> Coupon Image URL: </label>
        <br />
        <input
          type="text"
          defaultValue={`${props.imageURL}`}
          spellCheck="false"
          name="imageURL"
          onChange={(event) => setImageURL(event.target.value)}
        />{" "}
         <br />
        <input
          className="submit-button"
          type="button"
          value="Create"
          onClick={onCreateCoupon}
        />
        {/* <input
          className="submit-button"
          type="button"
          value="Delete"
          onClick={onUpdateCoupon}
        /> */}
        <br />
      </div>
    </div>
  );
}

export default CompanyCouponManager;