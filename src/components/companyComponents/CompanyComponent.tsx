import Search from "../search/Search";
import { Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../redux/app-state";
import "./AdminComponent.css"


function CompanyComponent() {
  let coupons = useSelector((state: AppState) => state.coupons);
  let navigate = useNavigate();
  function onCouponsButtonClick() {
    navigate("/admin/tab/coupons");
  }

  function onUsersButtonClick() {
    navigate("/admin/tab/users");
  }
  function onCompaniesButtonClick() {
    navigate("/admin/tab/companies");
  }
  function onCustomersButtonClick() {
    navigate("/admin/tab/customers");
  }
  function onPurchasesButtonClick() {
    navigate("/admin/tab/purchases");
  }

  function onCreateCouponClick(){
    navigate("/admin/create/coupons")
  }

  function onCreateCompanyClick(){
    navigate("/admin/create/companies")
  }

  return (
    <div className="admin-page">
      <h4>Hello, ADMIN</h4>
      <div className="sections-buttons">
      <input type="button" value="Create Coupon" onClick={onCreateCouponClick}/>
        <input type="button" value="Coupons" onClick={onCouponsButtonClick} />

        <input type="button" value="Users" onClick={onUsersButtonClick} />
        <input type="button" value="Create Company" onClick={onCreateCompanyClick}/>
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

export default CompanyComponent;
