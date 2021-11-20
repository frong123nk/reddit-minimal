import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import "./Search.css";
import { setSearchTerm } from "../../app/appSlice";
import { useDispatch, useSelector } from "react-redux";

export const Search = () => {
  const [searchTermLocal, setSearchTermLocal] = useState("");
  const searchTerm = useSelector((state) => state.app.searchTerm);
  const dispatch = useDispatch();

  const onSearchTermChange = (e) => {
    setSearchTermLocal(e.target.value);
  };

  useEffect(() => {
    setSearchTermLocal(searchTerm);
  }, [searchTerm]);

  const onSearchTermSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(searchTermLocal));
  };

  return (
    <div>
      <form id="container-search" onSubmit={onSearchTermSubmit}>
        <input
          id="search"
          type="text"
          placeholder="Search"
          value={searchTermLocal}
          onChange={onSearchTermChange}
          aria-label="Search posts"
        />
        <BiSearch
          className="search-icon"
          type="submit"
          onClick={onSearchTermSubmit}
          aria-label="Search"
        />
      </form>
    </div>
  );
};
