import React from "react";
import { FaReddit } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import "./Header.css";
import { Search } from "../Search/Search";

export const Header = () => {
  const openGit = () => {
    window.open("https://github.com/frong123nk");
  };

  return (
    <header>
      <div id="header-front">
        <div className="title">
          <div className="text">MOCK</div>
          <FaReddit className="logo-icon" />
          <div className="text">RIDDIT</div>
        </div>
        <div className="tag-search">
          <Search />
        </div>
      </div>
      <div id="header-back">
        <AiFillGithub className="logo-icon" onClick={openGit}></AiFillGithub>
      </div>
    </header>
  );
};
