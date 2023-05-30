import Footer from "../footer/Footer";
import "../layouts/Layout.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../../create/Register";
import Login from "../../login/Login";
import Header from "../header/Header";

import CompanyCouponsContainer from "../../coupons/CompanyCouponsContainer";
import CustomerCouponsContainer from "../../coupons/CustomerCouponsContainer";
import AdminCoupons from "../../adminComponentsTabs/AdminCoupons";
import AdminUsers from "../../adminComponentsTabs/AdminUsers";
import AdminPurchases from "../../adminComponentsTabs/AdminPurchases";
import AdminCustomers from "../../adminComponentsTabs/AdminCustomers";
import AdminCompanies from "../../adminComponentsTabs/AdminCompanies";
import AdminComponent from "../../adminComponents/AdminComponent";
import Home from "../../home/Home";

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
            <Route path="/company" element={<CompanyCouponsContainer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminComponent />} />
               <Route path="/admin/coupons" element={<AdminCoupons />} />  
               <Route path="/admin/customers" element={<AdminCustomers />} />  
               <Route path="/admin/users" element={<AdminUsers />} />  
               <Route path="/admin/companies" element={<AdminCompanies />} />  
               <Route path="/admin/purchases" element={<AdminPurchases />} />  
            </Routes>
         
          
            {/* <Route path="/admin" element={<AdminCouponsContainer/>} /> */}
          
        </main>

        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default Layout;
