import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ICoupon from "../models/ICoupon";
import { ActionType } from "../redux/action-type";
import { AppState } from "../redux/app-state";
import "./AdminTab.css";
import Search from "../search/Search";
import AdminComponent from "../adminComponents/AdminComponent";

function AdminCoupons() {
  let [pageNumber, setPageNumber] = useState(1);
  let amountPerPage: number = 12;
  let dispatch = useDispatch();

  useEffect(() => {
    getAllCoupons(pageNumber, amountPerPage);
  }, [pageNumber]);
  let coupons = useSelector((state: AppState) => state.coupons);
  let subText = useSelector((state: AppState) => state.searchValue);
  if (subText == "") {
  }

  async function getAllCoupons(pageNumber: number, amountPerPage: number) {
    let url = `http://localhost:8080/coupons?pageNumber=${pageNumber}&amountPerPage=${amountPerPage}`;
    let response = await axios.get(url);
    let couponsArray = response.data;
    dispatch({
      type: ActionType.GetCoupons,
      payload: { coupons: couponsArray },
    });
  }
  function isSubtextNull() {
    subText = subText.trim();
    if (!subText) {
      return true;
    }
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
    <div className="cards-container">
      <AdminComponent/>
     <div className="search">
        <h4>Coupons</h4>
        <Search />
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>name</th>
            <th>price</th>
            <th>description</th>
            <th>category</th>
            <th>expiration date</th>
            <th>id</th>
          </tr>
        </thead>
        <tbody>
          {coupons
            .filter((coupon) => coupon.couponName.includes(subText))
            .map((coupon, index) => (
              <tr>
                <td>{coupon.couponName}</td>
                <td>{coupon.price}</td>
                <td>{coupon.description}</td>
                <td>{coupon.category}</td>
                <td>{coupon.endDate}</td>
                <td>{coupon.id}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        <input
          type="button"
          disabled={pageNumber == 1}
          value="back"
          onClick={() => onBackClicked()}
        />
        <input
          type="button"
          disabled={coupons.length < amountPerPage}
          value="next"
          onClick={() => onNextClicked()}
        />
        <p>Page: {pageNumber}</p>
      </div>
    </div>
  );
}
export default AdminCoupons;
