import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ICoupon from "../models/ICoupon";
import { ActionType } from "../redux/action-type";
import { AppState } from "../redux/app-state";
import CouponComponent from "../couponCard/CouponCard";
import "./CustomerCouponsContainer.css";


function CustomerCouponsContainer() {
  let dispatch = useDispatch();

  let coupons = useSelector((state: AppState) => state.coupons);
  let [pageNumber, setPageNumber] = useState(1);
  let [amountOfItemsPerPage, setAmountOfItemsPerPage] = useState(5);
  let [couponsList, setCouponsList] = useState([]);
  let couponsListLength = couponsList.length;

  useEffect(() => {
    getCouponsByPage(pageNumber, amountOfItemsPerPage);
  }, [pageNumber]);

  async function getCouponsByPage(
    pageNumber: number,
    amountOfItemsPerPage: number
  ) {
    try {
      const url = `http://localhost:8080/coupons/byPage?pageNumber=${pageNumber}&amountOfItemsPerPage=${amountOfItemsPerPage}`;

      let response = await axios.get(url);
      couponsList = response.data;
      setCouponsList(couponsList);
      dispatch({
        type: ActionType.GetCoupons,
        payload: { coupons: couponsList },
      });
    } catch (e: any) {}
  }

  function onNextClicked() {
    pageNumber++;
    setPageNumber(pageNumber);
  }

  function onBackClicked() {
    pageNumber--;
    setPageNumber(pageNumber);
  }

  return (
    
    <div className="customer-container">
      
      {/* <h4>CustomerCouponContainer</h4> */}
      {/* <h4>Coupons: {couponsListLength}</h4> */}
      <div className="coupons-container">
        {coupons.map((coupon: ICoupon) => (
          <CouponComponent
            key={coupon.id}
            id={coupon.id}
            couponName={coupon.couponName}
            companyName={coupon.companyName}
            category={coupon.category}
            description={coupon.description}
            price={coupon.price}
            startDate={coupon.startDate}
            endDate={coupon.endDate}
          />
        ))}
      </div>
      <input
        type="button"
        disabled={pageNumber == 1}
        value="back"
        onClick={() => onBackClicked()}
      />
      <input
        type="button"
        disabled={couponsList.length < 4}
        value="next"
        onClick={() => onNextClicked()}
      />
      <h5>Page: {pageNumber}</h5>
     
    </div>
  );
}

export default CustomerCouponsContainer;
