import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState } from "../redux/app-state";
import ICoupon from "../models/ICoupon";
import AdminComponent from "../adminComponents/AdminComponent";
import "./Create.css"
import CompanyComponent from "./CompanyComponent";


function CompanyUpdateCoupon(props: ICoupon) {
  
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


  let categories = ["FOOD", "TOYS", "COSMETICS", "ELECTRONICS"];

 
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
      navigate("/company/coupons");

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
        <CompanyComponent />
      <h3>Update coupon</h3>
      <div className="inputs-container">
       
        <label htmlFor="name"> Coupon Name: </label>
        <br />
        <input
          type="text"
          defaultValue={coupon.couponName}
          spellCheck="false"
          name="name"
          onChange={(event) => setName(event.target.value)}
        />{" "}
              
        <br></br>
        <label htmlFor="price">Price: </label>
        <br />
        <input
          type="text"
          defaultValue={`${coupon.price}`}
          name="price"
          onChange={(event) => setPrice(+event.target.value)}
        />{" "}
        <br />
        <label htmlFor="description"> Description: </label>
        <br />
        <input
          type="text"
          defaultValue={coupon.description}
          spellCheck="false"
          name="description"
          onChange={(event) => setDescription(event.target.value)}
        />{" "}
        <br />
        <label htmlFor="startDate">Start Date: </label>
        <br />
        <input
          type="date"
          defaultValue={coupon.startDate}
          name="startDate"
          onChange={(event) => setStartDate(event.target.value)}
        />{" "}
        <br />
        <label htmlFor="endDate">End Date: </label>
        <br />
        <input
          type="date"
          defaultValue={coupon.endDate}
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
          defaultValue={`${coupon.imageURL}`}
          spellCheck="false"
          name="imageURL"
          onChange={(event) => setImageURL(event.target.value)}
        />{" "}
         <br />
                <input
          className="submit-button"
          type="button"
          value="Update"
          onClick={onUpdateCoupon}
        />
        <br />
      </div>
    </div>
  );
}

export default CompanyUpdateCoupon;
