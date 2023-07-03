
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../../redux/action-type";
import { AppState } from "../../redux/app-state";
import "./AdminTab.css";
import AdminComponent from "../AdminComponent";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ICoupon from "../../models/ICoupon";
import {useNavigate } from "react-router-dom";
import AdminUpdateCoupon from "../../adminCreateItem/AdminUpdateCoupon";

function AdminCoupons() {
  let [pageNumber, setPageNumber] = useState(1);
  let amountPerPage: number = 12;
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    getAllCoupons(pageNumber, amountPerPage);
  }, [pageNumber]);

  let coupons = useSelector((state: AppState) => state.coupons);

  let subText = useSelector((state: AppState) => state.searchValue);
  if (subText == "") {
  }

  async function getAllCoupons(pageNumber: number, amountPerPage: number) {
    let url = `http://localhost:8080/coupons/byPage?pageNumber=${pageNumber}&amountOfItemsPerPage=${amountPerPage}`;
    let response = await axios.get(url);
    let couponsArray = response.data;
    dispatch({
      type: ActionType.GetCoupons,
      payload: { coupons: couponsArray },
    });
  }

  function onDeleteClicked(couponId: number) {
    
    axios
      .delete(`http://localhost:8080/coupons/${couponId}`)
      .then(() => {
        getAllCoupons(pageNumber, amountPerPage); 
        alert("Coupon deleted successfully!");
        navigate("/admin/coupons");
      })
      .catch((error) => {
        console.log(error);
      });
  }


  function isSubtextNull() {
    subText = subText.trim();
    if (!subText) {
      return true;
    }
  }
  async function onUpdateCoupon(coupon: ICoupon) {
    dispatch({
      type: ActionType.ChangeCouponProps,
      payload: { coupon: coupon },
    });
    navigate("/admin/coupons/update");
    
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
      <AdminComponent />
      <h3>Coupons</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>price</th>
            <th>description</th>
            <th>category</th>
            <th>expiration date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {coupons
            .filter((coupon) => coupon.couponName.includes(subText))
            .map((coupon, index) => (
              <tr  key={coupon.couponId}>
                <td>{index+1}</td>
                <td>{coupon.couponName}</td>
                <td>{coupon.price}</td>
                <td>{coupon.description}</td>
                <td>{coupon.category}</td>
                <td>{coupon.endDate}</td>
                <td>
                  <EditIcon className="edit-icon" onClick={() => onUpdateCoupon(coupon)}/>
                </td>
                <td>
                  <DeleteForeverIcon  className="delete-icon" onClick={() => onDeleteClicked(coupon.couponId)}/>
                </td>
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
        <h5>Page: {pageNumber}</h5>
      </div>
    </div>
  );
}
export default AdminCoupons;
