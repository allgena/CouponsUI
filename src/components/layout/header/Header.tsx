import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/app-state";
import Search from "../../search/Search";
import "../header/Header.css";
import { useNavigate } from "react-router-dom";
import Login from "../../login/Login";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { ActionType } from "../../redux/action-type";

function Header() {
  let [pageNumber, setPageNumber] = useState(1);
  let [amountOfItemsPerPage, setAmountOfItemsPerPage] = useState(10);
  const navigate = useNavigate();
  let dispatch = useDispatch();
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const onCategoryClick = (category: SetStateAction<string>) => {
    setSelectedCategory(category);
    dispatch({ type: ActionType.SelectedCategory, payload: { category } });
  };
  
  useEffect(() => {
    debugger
        getCouponsByPage(pageNumber, amountOfItemsPerPage);
  
  }, [pageNumber, selectedCategory]);

  async function getCouponsByPage(
    pageNumber: number,
    amountOfItemsPerPage: number
  ) {
    try {
      let url = `http://localhost:8080/coupons/byPage?pageNumber=${pageNumber}&amountOfItemsPerPage=${amountOfItemsPerPage}&category=${selectedCategory}`;
      debugger      
      let response = await axios.get(url, {
        headers: {Authorization: `${localStorage.getItem("token")}`}
      });
      dispatch({
        type: ActionType.GetCoupons,
        payload: { coupons: response.data },
      });
    } catch (e: any) {}
  }

  function onLoginButtonClick() {
    navigate("/login");
  }

  function onRegisterButtonClick() {
    navigate("/register");
  }
  function setIsModalOpen(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="components">
      <div className="logo"><a href="/">G.A.C.</a></div>

      <div className="search">
        <Search/>
      </div>
      <div className="categories">
      <div className={selectedCategory === "All" ? "selected" : ""} onClick={() => onCategoryClick("All")}>All</div>
        <div className={selectedCategory === "FOOD" ? "selected" : ""} onClick={() => onCategoryClick("Food")}>Food</div>
        <div className={selectedCategory === "TOYS" ? "selected" : ""} onClick={() => onCategoryClick("Toys")}>Toys</div>
        <div className={selectedCategory === "COSMETICS" ? "selected" : ""} onClick={() => onCategoryClick("Cosmetics")}>Cosmetics</div>
        <div className={selectedCategory === "ELECTRONICS" ? "selected" : ""} onClick={() => onCategoryClick("Electronics")}>Electronics</div>
      </div>

      <div className="loginButton">
        <input type="button" value="Login" onClick={onLoginButtonClick} />
      
      </div>
      <div className="userName">
        <span> {useSelector((state: AppState) => state.logInData.userName)}</span>
       
      </div>
    </div>
  );
}
export default Header;



// function Header() {
//   const navigate = useNavigate();
//   const [isLoginModalOpen, setLoginModalOpen] = useState(false);


//   function onLoginButtonClick() {
//     setLoginModalOpen(true);
//   }

//   function onRegisterButtonClick() {
//     navigate("/register");
//   }
//   return (
//     <div className="components">
//       <div className="logo"><a href="/">G.A.C.</a></div>

//       <div className="search">
//         <Search/>
//       </div>
//       <div className="categories">
//         <div>All</div>
//         <div>Food</div>
//         <div>Toys</div>
//         <div>Cosmetics</div>
//         <div>Electronics</div>
//       </div>

//       <div className="loginButton">
//       <button onClick={() => setLoginModalOpen(true)}>{isLoginModalOpen && <Login />}</button>
     
//       </div>
//       <div className="userName">
//         <span> {useSelector((state: AppState) => state.logInData.userName)}</span>
       
//       </div>
      
//     </div>
//   );
// }
// export default Header;
