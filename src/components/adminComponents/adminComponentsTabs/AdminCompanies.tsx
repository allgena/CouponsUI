import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../../redux/action-type";
import { AppState } from "../../redux/app-state";
import "./AdminTab.css";
import AdminComponent from "../AdminComponent";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ICompany from "../../models/ICompany";
import { useNavigate } from "react-router-dom";

function AdminCompanies() {
  let [pageNumber, setPageNumber] = useState(1);
  let amountPerPage: number = 12;
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    getCompanies(pageNumber, amountPerPage);
  }, [pageNumber]);

  let companies = useSelector((state: AppState) => state.companies);
  let subText = useSelector((state: AppState) => state.searchValue);

  if (subText == "") {
  }

  async function getCompanies(pageNumber: number, amountPerPage: number) {
    let url = `http://localhost:8080/companies/byPage?pageNumber=${pageNumber}&amountOfItemsPerPage=${amountPerPage}`;

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

  async function deleteCompany(companyId: number) {
    try {
      await axios.delete(`http://localhost:8080/companies/${companyId}`);
      getCompanies(pageNumber, amountPerPage);
      alert("Company deleted successfully!");
      navigate("/admin/companies");
    } catch (error) {
      console.log(error);
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

  function onUpdateCompany(company: ICompany): void {
    debugger;
    dispatch({
      type: ActionType.UpdateCompany,
      payload: { company: company },
    });
    navigate("/admin/update/companies");
  }

  return (
    <div className="cards-container">
      <AdminComponent />
      <h3>Companies</h3>

      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Company Name</th>
            <th>Phone Num</th>
            <th>Address</th>
            <th># Purchases</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {companies
            .filter((company) => company.companyName.includes(subText))
            .map((company, index) => (
              <tr key={company.companyId}>
                <td>{index + 1}</td>
                <td>{company.companyName}</td>
                <td>{company.phoneNumber}</td>
                <td>{company.address}</td>
                <td>{company.numberOfPurchases}</td>
                <td>
                  <EditIcon
                    className="edit-icon"
                    onClick={() => onUpdateCompany(company)}
                  />
                </td>
                <td>
                  <DeleteForeverIcon
                    className="delete-icon"
                    onClick={() => deleteCompany(company.companyId)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        <input
          type="button"
          disabled={pageNumber === 1}
          value="back"
          onClick={onBackClicked}
        />
        <input
          type="button"
          disabled={companies.length < amountPerPage}
          value="next"
          onClick={onNextClicked}
        />
        <h5>Page: {pageNumber}</h5>
      </div>
    </div>
  );
}

export default AdminCompanies;
