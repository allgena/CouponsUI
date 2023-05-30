import { useState } from "react";
import { useDispatch } from "react-redux";
import { ActionType } from "../redux/action-type";
import "./Search.css"

function Search() {
  let [subText, setSubText] = useState("");
  const dispatch = useDispatch();
  return (

    <input
      id="search-box"
      type="text"
      placeholder="search"
      onChange={(event) => {
        //
        let searchValue = event.target.value;
        dispatch({ type: ActionType.SearchValue, payload: { searchValue } });
      }}
    />
  );
}

export default Search;
