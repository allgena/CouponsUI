// import Search from "../search/Search";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../redux/app-state";
import "./AdminComponent.css";

function AdminComponent() {
  let coupons = useSelector((state: AppState) => state.coupons);
  let userType = useSelector((state: AppState) => state.logInData.userType);

  let navigate = useNavigate();
  let dispatch = useDispatch();

  function onCouponsButtonClick() {
    if (userType !== "ADMIN") {
      navigate("/login");
    } else navigate("/admin/coupons");
  }

  function onUsersButtonClick() {
    if (userType !== "ADMIN") {
      navigate("/login");
    } else navigate("/admin/users");
  }
  function onCompaniesButtonClick() {
    if (userType !== "ADMIN") {
      navigate("/login");
    } else navigate("/admin/companies");
  }
  function onCustomersButtonClick() {
    if (userType !== "ADMIN") {
      navigate("/login");
    } else navigate("/admin/customers");
  }
  function onPurchasesButtonClick() {
    if (userType !== "ADMIN") {
      navigate("/login");
    } else navigate("/admin/purchases");
  }

  function onCreateCompanyClick() {
    if (userType !== "ADMIN") {
      navigate("/login");
    } else navigate("/admin/create/companies");
  }

  return (
    <div className="admin-page">
      <h4>
        Hello, {useSelector((state: AppState) => state.logInData.userName)}
      </h4>
      <div className="sections-buttons">
        <input type="button" value="Coupons" onClick={onCouponsButtonClick} />
        <input type="button" value="Users" onClick={onUsersButtonClick} />
        <input
          type="button"
          value="Companies"
          onClick={onCompaniesButtonClick}
        />

        <input
          type="button"
          value="Purchases"
          onClick={onPurchasesButtonClick}
        />

        <input
          type="button"
          value="Create Company"
          onClick={onCreateCompanyClick}
        />
      </div>
    </div>
  );
}

export default AdminComponent;
