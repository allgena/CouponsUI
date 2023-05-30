import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminComponent from "../../adminComponents/AdminComponent";
import "../main/Main.css";
import CustomerCouponsContainer from "../../coupons/CustomerCouponsContainer";
import Register from "../../create/Register";
import Login from "../../login/Login";

import Header from "../header/Header";
import AdminCouponsTab from "../../adminComponentsTabs/AdminCoupons";
import AdminCoupons from "../../adminComponentsTabs/AdminCoupons";
import AdminCustomers from "../../adminComponentsTabs/AdminCustomers";
import Home from "../../home/Home";

function Main() {
  return (
    
    <div className="components">

<Home/>
    </div>
  );
}
export default Main;
