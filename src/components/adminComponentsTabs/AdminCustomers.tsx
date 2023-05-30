import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../redux/action-type";
import { AppState } from "../redux/app-state";

import "./AdminTab.css";
import Search from "../search/Search";
import AdminComponent from "../adminComponents/AdminComponent";

function AdminCustomers() {
  let [pageNumber, setPageNumber] = useState(1);
  let amountPerPage: number = 12;
  let dispatch = useDispatch();

  useEffect(() => {
    getAllCustomers(pageNumber, amountPerPage);
  }, [pageNumber]);
  let customers = useSelector((state: AppState) => state.customers);
  let subText = useSelector((state: AppState) => state.searchValue);
  if (subText == "") {
  }

  async function getAllCustomers(pageNumber: number, amountPerPage: number) {
    let url = `http://localhost:8080/customers/byPage?pageNumber=${pageNumber}&amountOfItemsPerPage=${amountPerPage}`;

    // let url = `http://localhost:8080/customers`;
    let response = await axios.get(url);
    let customersArray = response.data;
    dispatch({
      type: ActionType.GetCustomers,
      payload: { customers: customersArray },
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
        <h4>Customers</h4>
        <Search />
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>name</th>
            <th>phoneNumber</th>
            <th>address</th>
            {/* <th>userId</th> */}
            <th>id</th>
            <th># Purchases</th>
          </tr>
        </thead>
        <tbody>
          {customers
            .filter((customer) => customer.address.includes(subText))
            .map((customer, index) => (
              <tr>
                <td>{customer.customerName}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.address}</td>
                {/* <td>{customer.userId}</td>  */}
                <td>{customer.customerId}</td>
                <td>{customer.amountOfPurchases}</td>
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
          disabled={customers.length < amountPerPage}
          value="next"
          onClick={() => onNextClicked()}
        />
        <p>Page: {pageNumber}</p>
      </div>
    </div>
  );
}
export default AdminCustomers;
