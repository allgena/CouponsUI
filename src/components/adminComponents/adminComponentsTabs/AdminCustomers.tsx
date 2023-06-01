import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../../redux/action-type";
import { AppState } from "../../redux/app-state";
import "./AdminTab.css";
import AdminComponent from "../AdminComponent";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';


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
      <AdminComponent />
      <h3>Customers</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>phoneNumber</th>
            <th>address</th>
            <th># Purchases</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {customers
            .filter((customer) => customer.customerName.includes(subText))
            .map((customer, index) => (
              <tr key={customer.customerId}>
                <td>{index+1}</td>
                <td>{customer.customerName}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.address}</td>
                
                <td>{customer.amountOfPurchases}</td>
                <th><EditIcon/></th>
            <th><DeleteForeverIcon/></th>
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
        <h5>Page: {pageNumber}</h5>
      </div>
    </div>
  );
}
export default AdminCustomers;
