import Search from "../../search/Search";
import "../header/Header.css";
import { useNavigate } from "react-router-dom";


function Header() {
  const navigate = useNavigate();
  function onLoginButtonClick() {
    navigate("/login");
  }

  function onRegisterButtonClick() {
    navigate("/register");
  }
  return (
    <div className="components">
      <div className="logo">G.A.C.</div>
      <Search/>
      <div className="categories">
        <div>All</div>
        <div>Food</div>
        <div>Toys</div>
        <div>Cosmetics</div>
        <div>Electrics</div>
    
      </div>
   
      <div className="loginButton">
      
        <input type="button" value="Login" onClick={onLoginButtonClick} />
        {/* <input type="button" value="Register" onClick={onRegisterButtonClick} /> */}
      </div>
    </div>
  );
}
export default Header;
