import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../redux/action-type";
import { AppState } from "../redux/app-state";
import "./AdminTab.css";
import AdminComponent from "../adminComponents/AdminComponent";

function AdminPurchases() {
  let [pageNumber, setPageNumber] = useState(1);
  let amountPerPage: number = 12;
  let dispatch = useDispatch();

  useEffect(() => {
    getPurchases();
  }, [pageNumber]);
  
  let purchases = useSelector((state: AppState) => state.purchases);
  let subText = useSelector((state: AppState) => state.searchValue);
  if (subText === "") {
  }

  async function getPurchases() {
    let url = `http://localhost:8080/purchases/byPage?pageNumber=${pageNumber}&amountOfItemsPerPage=${amountPerPage}`;
  
    let response = await axios.get(url);
    let purchasesArray = response.data;
    dispatch({
      type: ActionType.GetPurchases,
      payload: { purchases: purchasesArray },
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
      <AdminComponent />
      <h3>Purchases</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Customer Id</th>
            <th>Customer Name</th>
            <th>Coupon Id</th>
            <th>Coupon Name</th>
            <th>Company Name</th>
            <th># OfItems</th>
          </tr>
        </thead>
        <tbody>
          {purchases
            // .filter((purchase: any) => purchase.companyName.includes(subText))
            .map((purchase, index) => (
              <tr>
                <td>{purchase.id}</td>
                <td>{purchase.customerId}</td>
                <td>{purchase.customerName}</td>
                <td>{purchase.couponId}</td>
                <td>{purchase.couponName}</td>
                <td>{purchase.companyName}</td>
                <td>{purchase.amountOfPurchased}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        <input
          type="button"
          disabled={pageNumber === 1}
          value="back"
          onClick={() => onBackClicked()}
        />
        <input
          type="button"
          disabled={purchases.length < amountPerPage}
          value="next"
          onClick={() => onNextClicked()}
        />
        <h5>Page: {pageNumber}</h5>
      </div>
    </div>
  );
}
export default AdminPurchases;
