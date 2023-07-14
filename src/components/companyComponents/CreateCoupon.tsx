import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState } from "../redux/app-state";
import ICoupon from "../models/ICoupon";
import AdminComponent from "../adminComponents/AdminComponent";
import "./Create.css";
import CompanyComponent from "./CompanyComponent";

function CreateCoupon(props: ICoupon) {
  let navigate = useNavigate();
  let [couponName, setName] = useState("");
  let [price, setPrice] = useState(0);
  let [description, setDescription] = useState("");
  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState("");
  let [category, setCategory] = useState("FOOD");
  let [imageURL, setImageURL] = useState("");

  let companyName = useSelector(
    (state: AppState) => state.logInData.companyName
  );

  debugger;
  let categories = ["FOOD", "TOYS", "COSMETICS", "ELECTRONICS"];

  async function onCreateCoupon(event: any) {
    try {
      debugger;
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
      navigate("/company/coupons");
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

export default CreateCoupon;
