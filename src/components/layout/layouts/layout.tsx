import Footer from "../footer/Footer";
import "../layouts/Layout.css";
import Register from "../../login/Register";
import Login from "../../login/Login";
import Header from "../header/Header";
import CustomerCouponsContainer from "../../customerContainer/CustomerCouponsContainer";
import AdminCoupons from "../../adminComponents/adminComponentsTabs/AdminCoupons";
import AdminUsers from "../../adminComponents/adminComponentsTabs/AdminUsers";
import AdminPurchases from "../../adminComponents/adminComponentsTabs/AdminPurchases";
import AdminCustomers from "../../adminComponents/adminComponentsTabs/AdminCustomers";
import AdminCompanies from "../../adminComponents/adminComponentsTabs/AdminCompanies";
import Home from "../../home/Home";
import CreateCompanyManager from "../../adminCreateItem/CreateCompany";
import AdminUpdateCoupon from "../../adminCreateItem/AdminUpdateCoupon";
import CompanyComponent from "../../companyComponents/CompanyComponent";
import CompanyPurchases from "../../companyComponents/CompanyPurchases";
import CompanyCoupons from "../../companyComponents/CompanyCoupons";
import SingleUser from "../../adminCreateItem/SingleUser";
import UpdateCompanyManager from "../../adminCreateItem/UpdateCompany";
import CreateCoupon from "../../companyComponents/CreateCoupon";
import CompanyUpdateCoupon from "../../companyComponents/CompanyUpdateCoupon";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuardedRoute from "../../GuardedRoute";
import AdminComponent from "../../adminComponents/AdminComponent";

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
            <Route
              path="/admin/create/companies"
              element={<CreateCompanyManager />}
            />
            <Route
              path="/admin/update/companies"
              element={<UpdateCompanyManager />}
            />

            <Route path="/company/coupons" element={<CompanyCoupons />} />
            <Route path="/company/purchases" element={<CompanyPurchases />} />
            <Route
              path="/company/coupons/create"
              element={
                <CreateCoupon
                  couponId={0}
                  couponName={""}
                  price={0}
                  description={""}
                  startDate={undefined}
                  endDate={undefined}
                  category={""}
                  companyName={""}
                  imageURL={""}
                  coupon={undefined}
                />
              }
            />
            <Route
              path="/admin/coupons/update"
              element={
                <AdminUpdateCoupon
                  couponId={0}
                  couponName={""}
                  price={0}
                  description={""}
                  startDate={undefined}
                  endDate={undefined}
                  category={""}
                  companyName={""}
                  imageURL={""}
                  coupon={undefined}
                />
              }
            />
            <Route
              path="/company/coupons/update"
              element={
                <CompanyUpdateCoupon
                  couponId={0}
                  couponName={""}
                  price={0}
                  description={""}
                  startDate={undefined}
                  endDate={undefined}
                  category={""}
                  companyName={""}
                  imageURL={""}
                  coupon={undefined}
                />
              }
            />
            <Route
              path="/admin/update/user"
              element={
                <SingleUser
                  userId={0}
                  userName={""}
                  userType={""}
                  phoneNumber={""}
                  companyName={""}
                />
              }
            />
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
