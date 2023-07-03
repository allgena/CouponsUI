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
    getCouponsByPage(pageNumber, amountOfItemsPerPage);
  }, [pageNumber, selectedCategory]);

  async function getCouponsByPage(
    pageNumber: number,
    amountOfItemsPerPage: number
  ) {
    try {
      let url = `http://localhost:8080/coupons/byPage?pageNumber=${pageNumber}&amountOfItemsPerPage=${amountOfItemsPerPage}&category=${selectedCategory}`;
      let response = await axios.get(url, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
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
  return (
    <div className="components">
      <div className="logo">
        <a href="/coupons">G.A.C.</a>
      </div>
      <div className="search">
        <Search />
      </div>
      <div className="category-dropdown">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryClick(e.target.value)}
        >
          <option value="All">Categories</option>
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Toys">Toys</option>
          <option value="Cosmetics">Cosmetics</option>
          <option value="Electronics">Electronics</option>
        </select>
      </div>
      <div className="loginButton">
        <input type="button" value="Login" onClick={onLoginButtonClick} />
      </div>
      <div className="userName">
        <span>
          Hello, {useSelector((state: AppState) => state.logInData.userName)}
        </span>
      </div>
    </div>
  );
}
export default Header;
