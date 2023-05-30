import Search from "../search/Search";
import { Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../redux/app-state";
import "./AdminComponent.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function AdminComponent() {
  let coupons = useSelector((state: AppState) => state.coupons);
  let userType = useSelector((state: AppState) => state.logInData.userType);

  let navigate = useNavigate();

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

  function onCreateCouponClick() {
    debugger;
    if (userType !== "ADMIN") {
      navigate("/login");
    } else navigate("/admin/create/coupons");
  }

  function onCreateCompanyClick() {
    if (userType != "ADMIN") {
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
          value="Customers"
          onClick={onCustomersButtonClick}
        />
        <input
          type="button"
          value="Purchases"
          onClick={onPurchasesButtonClick}
        />
        <input
          type="button"
          value="Coupon Manager"
          onClick={onCreateCouponClick}
        />
        <input
          type="button"
          value="Company Manager"
          onClick={onCreateCompanyClick}
        />
      </div>
    </div>
  );
}

export default AdminComponent;
