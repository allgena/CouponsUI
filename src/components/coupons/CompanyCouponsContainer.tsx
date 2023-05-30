import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CouponComponent from "../couponCard/CouponCard";
import ICoupon from "../models/ICoupon";
import { ActionType } from "../redux/action-type";
import { AppState } from "../redux/app-state";
import "./CompanyCouponsContainer.css";

function CompanyCouponsContainer() {
  let dispatch = useDispatch();

  let coupons = useSelector((state: AppState) => state.coupons);
  let [pageNumber, setPageNumber] = useState(1);
  let [amountOfItemsPerPage, setAmountOfItemsPerPage] = useState(6);
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
      dispatch({ type: ActionType.GetCoupons, payload: { couponsList } });
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
    <div className="company-container">
      {/* <h4>CompanyCouponContainer</h4> */}
      <h4>Coupons: {couponsListLength}</h4>
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
        disabled={couponsList.length < 5}
        value="next"
        onClick={() => onNextClicked()}
      />
      <h5>Page: {pageNumber}</h5>
    </div>
  );
}

export default CompanyCouponsContainer;
