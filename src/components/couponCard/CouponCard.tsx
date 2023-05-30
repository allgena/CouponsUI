import React, { useEffect, useState } from "react";
import ICoupon from "../models/ICoupon";
import "./CouponCard.css";
import { ActionType } from "../redux/action-type";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../redux/app-state";


function CouponCard(coupon: ICoupon) {
  let userType = useSelector((state: AppState) => state.logInData.userType);
  let customerName = useSelector((state: AppState) => state.logInData.userName);

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [modalIsOpen, setModalIsOpen] = useState(false);
  let subText = useSelector((state: AppState) => state.searchValue);
  if (subText == "") {
  }
  async function deleteCoupon(id: number) {
    try {
      const url = `http://localhost:8080/coupons/${id}`;

      let response = await axios.delete(url);
      let couponDeletedId = id;
      dispatch({ type: ActionType.DeleteCoupon, payload: { couponDeletedId } });
    } catch (e: any) {
      console.log(e);
    }
  }
 
 
  function editCoupon(id: number): void {
    throw new Error("Function not implemented.");
  }

  async function addToPurcheses(id: number): Promise<void> {
    if (userType != "CUSTOMER") {
      navigate("/login");
    }
    try {
      const url = `http://localhost:8080/purchases?customerName=${customerName}&couponId=${id}`;
      let response = await axios.post(url);
      let couponToPurchases = id;
      dispatch({
        type: ActionType.AddToPurchases,
        payload: { couponToPurchases },
      });
    } catch (e: any) {
      console.log(e);
    }
  }

  let imageURL = "";
  if (!coupon.imageURL.startsWith("http")){
    imageURL = "../../img/" + coupon.imageURL; 
  }
  else
   imageURL = coupon.imageURL;

 
  return (
    <div className="CouponComponent">
      <div className="services">
        <span
          className="single-img img-one"
          style={{ backgroundImage: `url(${imageURL})` }} >
          <span className="img-text">
            <h4>{coupon.couponName}</h4>
            <p>{coupon.category}</p>
            <p>{coupon.companyName}</p>
            <p>{coupon.description}</p>
            <p>Price: {coupon.price}$</p>
            <p>Expiration: {coupon.endDate} </p>

            <div className="services-buttons">
              {/* {userType == "ADMIN" && (
                <button onClick={() => deleteCoupon(coupon.couponId)}>
                  Delete
                </button>
              )} */}
              
              {(userType == "CUSTOMER" || userType == "") && (
                <div className="by-button">
                  <button onClick={() => addToPurcheses(coupon.couponId)}>
                    Buy now
                  </button>
                </div>
              )}
              {/* {userType == "ADMIN" && (
                <button onClick={() => editCoupon(coupon.couponId)}>
                  Edit
                </button>
              )} */}
            </div>
          </span>
        </span>

  
      </div>
    </div>
  );
}

export default CouponCard;
