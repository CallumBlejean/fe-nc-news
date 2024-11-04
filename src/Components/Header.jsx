import React from "react";
import "../Components-CSS/Header.css";
import HeaderBox from "../Components-CSS/Header-box";
import { Link } from "react-router-dom";
function Header() {
  return (
    <HeaderBox>
      <header>
        <h1 id="title">NC News</h1>
        <nav id="nav">
          <div className="dropdown">
            <button className="dropdown-button">Menu</button>
            <div className="dropdown-content">
              <Link to="/">Home</Link>
              <Link to="/articles">Articles</Link>
            </div>
          </div>
        </nav>
      </header>
    </HeaderBox>
  );
}

export default Header;
