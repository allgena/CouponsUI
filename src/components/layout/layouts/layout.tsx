import Footer from "../footer/Footer";
import "../layouts/Layout.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../../login/Register";
import Login from "../../login/Login";
import Header from "../header/Header";
import CustomerCouponsContainer from "../../customerContainer/CustomerCouponsContainer";
import AdminCoupons from "../../adminComponents/adminComponentsTabs/AdminCoupons";
import AdminUsers from "../../adminComponents/adminComponentsTabs/AdminUsers";
import AdminPurchases from "../../adminComponents/adminComponentsTabs/AdminPurchases";
import AdminCustomers from "../../adminComponents/adminComponentsTabs/AdminCustomers";
import AdminCompanies from "../../adminComponents/adminComponentsTabs/AdminCompanies";
import AdminComponent from "../../adminComponents/AdminComponent";
import Home from "../../home/Home";
import CreateCompany from "../../adminComponents/adminComponentsTabs/CreateCompany";
import CompanyManager from "../../adminComponents/adminComponentsTabs/CreateCompany";
import SingleCoupon from "../../adminCreateItem/SingleCoupon";
import CompanyComponent from "../../companyComponents/CompanyComponent";
import CompanyPurchases from "../../companyComponents/CompanyPurchases";
import CompanyCouponManager from "../../companyComponents/CompanyCouponManager";
import CompanyCoupons from "../../companyComponents/CompanyCoupons";

function Layout() {
  return (
    <div className="layout">
      <BrowserRouter>
        <header>
          <Header />
        </header>

        <main className="main">
      
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/coupons" element={<CustomerCouponsContainer />} />
            <Route path="/company" element={<CompanyComponent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminComponent />} />
            <Route path="/admin/coupons" element={<AdminCoupons />} />
            <Route path="/admin/customers" element={<AdminCustomers />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/companies" element={<AdminCompanies />} />
            <Route path="/admin/purchases" element={<AdminPurchases />} />
            <Route path="/admin/create/companies" element={<CompanyManager/>}/>
            <Route path="/admin/create/coupons" element={<SingleCoupon couponId={0} couponName={""}
            price={0} description={""} startDate={undefined} endDate={undefined} category={""}
            companyName={""} imageURL={""} coupon={undefined}/>}/>
            <Route path="/company/coupons" element={<CompanyCoupons />} />
            <Route path="/company/purchases" element={<CompanyPurchases />} />
            <Route path="/company/create/coupons" element={<CompanyCouponManager couponId={0} couponName={""}
            price={0} description={""} startDate={undefined} endDate={undefined} category={""}
            companyName={""} imageURL={""} coupon={undefined}/>}/>
          </Routes>
        </main>

        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default Layout;
