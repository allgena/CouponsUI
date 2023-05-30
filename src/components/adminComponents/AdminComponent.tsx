import Search from "../search/Search";
import { Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../redux/app-state";
import "./AdminComponent.css"


function AdminComponent() {
  let coupons = useSelector((state: AppState) => state.coupons);
  let navigate = useNavigate();
  function onCouponsButtonClick() {
    navigate("/admin/coupons");
  }

  function onUsersButtonClick() {
    navigate("/admin/users");
  }
  function onCompaniesButtonClick() {
    navigate("/admin/companies");
  }
  function onCustomersButtonClick() {
    navigate("/admin/customers");
  }
  function onPurchasesButtonClick() {
    navigate("/admin/purchases");
  }

  return (
    <div className="admin-page">
      <h4>Hello, ADMIN</h4>
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
      </div>
    </div>
  );
}

export default AdminComponent;
