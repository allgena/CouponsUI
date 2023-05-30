import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../redux/action-type";
import { AppState } from "../redux/app-state";
import Search from "../search/Search";
import "./AdminTab.css";
import AdminComponent from "../adminComponents/AdminComponent";

function AdminUsers() {
  let [pageNumber, setPageNumber] = useState(1);
  let amountPerPage: number = 12;
  let dispatch = useDispatch();
  useEffect(() => {
    getAllUsers(pageNumber, amountPerPage);
  }, [pageNumber]);
  let users = useSelector((state: AppState) => state.users);
  let subText = useSelector((state: AppState) => state.searchValue);
  if (subText == "") {
  }

  async function getAllUsers(pageNumber: number, amountPerPage: number) {
    let url = `http://localhost:8080/users/byPage?pageNumber=${pageNumber}&amountOfItemsPerPage=${amountPerPage}`;
    // let url = `http://localhost:8080/users`;
    let response = await axios.get(url);
    let userArray = response.data;

    dispatch({ type: ActionType.GetUsers, payload: { users: userArray } });
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
        <h4>Users</h4>
        <Search />
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>id</th>
            <th>User Name</th>
            <th>Phone Num</th>
            <th>User Type</th>
            <th>Company Name</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((users: any) => users.userName.includes(subText))
            .map((user, index) => (
              <tr>
                <td>{user.userId}</td>
                <td>{user.userName}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.userType}</td>
                <td>{user.companyName}</td>
                {/* <td><input type="button" value="Delete" onClick={()=>DeleteUser(user.id)}/></td> */}
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
          disabled={users.length < amountPerPage}
          value="next"
          onClick={() => onNextClicked()}
        />
        <p>Page: {pageNumber}</p>
      </div>
    </div>
  );
}
export default AdminUsers;
