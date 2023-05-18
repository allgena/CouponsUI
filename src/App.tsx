import { Routes, Route, BrowserRouter, Router } from 'react-router-dom';
import Login from '../src/components/login/Login';
import Register from '../src/components/create/Register';
import AdminComponent from "../src/components/adminComponents/AdminComponent";
import CustomerComponent from "../src/components/customerComponents/CustomerComponent";
import CompanyComponent from "./components/companyComponents/CompanyComponent";


import './App.css';

function App() {
  return (
  
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/admin" element={<AdminComponent/>}/>
      <Route path="/customer" element={<CustomerComponent/>}/>
      <Route path="/company" element={<CompanyComponent/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
   </BrowserRouter>

  );
}

export default App;