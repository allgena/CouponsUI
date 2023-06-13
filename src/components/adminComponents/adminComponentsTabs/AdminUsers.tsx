import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../../redux/action-type";
import { AppState } from "../../redux/app-state";
import "./AdminTab.css";
import AdminComponent from "../AdminComponent";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import IUser from "../../models/IUser";
import { useNavigate } from "react-router-dom";

function AdminUsers() {
  let [pageNumber, setPageNumber] = useState(1);
  let amountPerPage: number = 10;
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    getAllUsers(pageNumber, amountPerPage);
  }, [pageNumber]);

  let users = useSelector((state: AppState) => state.users);
  let subText = useSelector((state: AppState) => state.searchValue);
  if (subText == "") {
  }

  async function getAllUsers(pageNumber: number, amountPerPage: number) {
    let url = `http://localhost:8080/users/byPage?pageNumber=${pageNumber}&amountOfItemsPerPage=${amountPerPage}`;
    let response = await axios.get(url);
    let userArray = response.data;

    dispatch({ type: ActionType.GetUsers, payload: { users: userArray } });
  }



  function onDeleteClicked(userId: number) {
    // Make an API request to delete the user
    axios
      .delete(`http://localhost.157:8080/users/${userId}`)
      .then(() => {
        getAllUsers(pageNumber, amountPerPage);
        alert("User deleted successfully!");
        navigate("/admin/users");
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

  function onNextClicked() {
    pageNumber++;
    setPageNumber(pageNumber);
  }

  function onBackClicked() {
    pageNumber--;
    setPageNumber(pageNumber);
  }

  function onUpdateUser(user: IUser): void {
    dispatch({
      type: ActionType.UpdateUser,
      payload: { user: user },
    });
    navigate("/admin/update/user");
  }

  return (
    <div className="cards-container">
      <AdminComponent />
      <h3>Users</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>

            <th>User Name</th>
            <th>Phone Num</th>
            <th>User Type</th>
            <th>Company Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => user.userName.includes(subText))
            .map((user, index) => (
              <tr key={user.userId}>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.userType}</td>
                <td>{user.companyName}</td>
                <td>
                <EditIcon className="edit-icon"onClick={() => onUpdateUser(user)}/>
                </td>
                <td>
                  <DeleteForeverIcon className="delete-icon"
                    onClick={() => onDeleteClicked(user.userId)}
                  />
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
          disabled={users.length < amountPerPage}
          value="next"
          onClick={() => onNextClicked()}
        />
        <h5>Page: {pageNumber}</h5>
      </div>
    </div>
  );
}
export default AdminUsers;
