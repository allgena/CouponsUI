import Search from "../search/Search";
import { Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../redux/app-state";
import "../adminComponents/AdminComponent.css"
import "./CompanyCouponManager";
import "./CompanyCoupons"




function CompanyComponent() {
  let coupons = useSelector((state: AppState) => state.coupons);
  let userType = useSelector((state: AppState) => state.logInData.userType);  
  let userCompanyName = useSelector((state: AppState) => state.logInData.companyName);


  let navigate = useNavigate();


  function onCouponsButtonClick() {
    if (userType !== "COMPANY") {
      navigate("/login");
    } else navigate("/company/coupons");
  }

  
  function onCustomersButtonClick() {
    if (userType !== "COMPANY") {
      navigate("/login");
    } else navigate("/company/customers");
  }
  
  function onPurchasesButtonClick() {
    if (userType !== "COMPANY") {
      navigate("/login");
    } else navigate("/company/purchases");
  }

  function onCreateCouponClick() {
    debugger;
    if (userType !== "COMPANY") {
      navigate("/login");
    } else navigate("/company/create/coupons");
  }

  // function onCreateCompanyClick() {
  //   if (userType !== "COMPANY") {
  //     navigate("/login");
  //   } else navigate("/company/create/companies");
  // }

  return (
    <div className="company-page">
      <h4>
        Hello, {useSelector((state: AppState) => state.logInData.userName)  } { `from  "${userCompanyName}"`}
      </h4>
      <div className="sections-buttons">
        <input type="button" value="Coupons" onClick={onCouponsButtonClick} />
        
        {/* <input
          type="button"
          value="Customers"
          onClick={onCustomersButtonClick}
        /> */}
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
        {/* <input
          type="button"
          value="Company Manager"
          onClick={onCreateCompanyClick}
        /> */}
      </div>
    </div>
  );
}

export default CompanyComponent;
