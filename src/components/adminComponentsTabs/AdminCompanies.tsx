import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../redux/action-type";
import { AppState } from "../redux/app-state";
import Search from "../search/Search";
import "./AdminTab.css";
import AdminComponent from "../adminComponents/AdminComponent";

function AdminCompanies() {
  let [pageNumber, setPageNumber] = useState(1);
  let amountPerPage: number = 12;
  let dispatch = useDispatch();
  useEffect(() => {
    getCompanies();
  }, [pageNumber]);
  let companies = useSelector((state: AppState) => state.companies);
  let subText = useSelector((state: AppState) => state.searchValue);
  if (subText == "") {
  }

  async function getCompanies() {
        let url = `http://localhost:8080/companies/byPage?pageNumber=${pageNumber}&amountOfItemsPerPage=${amountPerPage}`;
    // let url = `http://localhost:8080/companies`;
    let response = await axios.get(url);
    let companiesArray = response.data;
    dispatch({
      type: ActionType.GetCompanies,
      payload: { companies: companiesArray },
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
      <h4>Companies</h4>
        <Search />
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>id</th>
            <th>Company Name</th>
            <th>Phone Num</th>
            <th>Address</th>
            <th># Purchases</th>
          </tr>
        </thead>
        <tbody>
          {companies
            .filter((company) => company.companyName.includes(subText))
            .map((company, index) => (
              <tr>
                <td>{company.companyId}</td>
                <td>{company.companyName}</td>
                <td>{company.phoneNumber}</td>
                <td>{company.address}</td>
                <td>{company.numberOfPurchases}</td>
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
          disabled={companies.length < amountPerPage}
          value="next"
          onClick={() => onNextClicked()}
        />
        <p>Page: {pageNumber}</p>
      </div>
    </div>
  );
}
export default AdminCompanies;
