import React from "react";
import ICoupon from "../models/ICoupon";
import { Reducer } from "react";
import "./CouponCard.css";
import { ActionType } from "../redux/action-type";
import axios from "axios";
import { useDispatch } from "react-redux";

function CouponCard(coupon: ICoupon) {
  let dispatch = useDispatch();

  async function onDeleteCoupon(id: number) {
    try {
      const url = `http://localhost:8080/coupons/${id}`;

      let response = await axios.delete(url);

      dispatch({ type: ActionType.DeleteCoupon, payload: { response } });
    } catch (e: any) {
      console.log(e);
    }
  }

  return (
    <div className="CouponComponent">
      <div className="services">
        <span className="single-img img-one">
          <span className="img-text">
            <h4>{coupon.couponName}</h4>
            {/* <div className="coupon-details"> */}
              <p>{coupon.category}</p>
              <p>{coupon.companyName}</p>
              <p>{coupon.description}</p>
              <p>Price: {coupon.price}$</p>
              <p>Expiration: {coupon.endDate} </p>
            {/* </div> */}
            <div className="add-to-basket">
              <button
                onClick={() => onDeleteCoupon(coupon.id)}
                className="button-add-to-basket"
              >
                Buy Now
              </button>
              <div className="edit-button">
                {/* {logInData?.userType=="ADMIN" && (<input type="button" value={"edit"} />)} */}
              </div>
            </div>
          </span>
        </span>
      </div>
    </div>
  );
}

export default CouponCard;
