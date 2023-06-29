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
  let [amountOfItemsPerPage, setAmountOfItemsPerPage] = useState(10);
  let [couponsList, setCouponsList] = useState([]);
  let couponsListLength = couponsList.length;
  let selectedCategory = useSelector(
    (state: AppState) => state.selectedCategory
  );

  let subText = useSelector((state: AppState) => state.searchValue);
  if (subText === "") {
  }

  useEffect(() => {
 
    getCouponsByPage(pageNumber, amountOfItemsPerPage);
  }, [pageNumber, selectedCategory]);

  async function getCouponsByPage(
    pageNumber: number,
    amountOfItemsPerPage: number
  ) {
    try {
      let url = `http://localhost:8080/coupons/byPage?pageNumber=${pageNumber}&amountOfItemsPerPage=${amountOfItemsPerPage}&category=${selectedCategory}`;
      debugger;
      let response = await axios.get(url, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
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
      <div className="coupons-container">
        {coupons.map((coupon: ICoupon) => (
          <CouponComponent
            key={coupon.couponId}
            couponId={coupon.couponId}
            couponName={coupon.couponName}
            companyName={coupon.companyName}
            category={coupon.category}
            description={coupon.description}
            price={coupon.price}
            startDate={coupon.startDate}
            endDate={coupon.endDate}
            imageURL={coupon.imageURL}
            coupon={undefined}
          />
        ))}
      </div>
      <div className="pagination-container">
        <button
          className="pagination-button"
          disabled={pageNumber === 1}
          onClick={onBackClicked}
        >
          Back
        </button>
        <button
          className="pagination-button"
          disabled={couponsList.length < amountOfItemsPerPage}
          onClick={onNextClicked}
        >
          Next
        </button>
        <h5>Page: {pageNumber}</h5>
      </div>
    </div>
  );
}

export default CustomerCouponsContainer;
