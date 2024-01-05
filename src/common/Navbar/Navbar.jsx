import React from "react";
import Logo from "../../images/logo_crop.png";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/register");
  };
  return (
    <div className="app__nav">
      <ul className="app__nav_items">
        <li className="app__nav_item">
          <Link to="/">
            <img src={Logo} />
          </Link>
        </li>
        <li className="app__nav_item nav-home">
          <Link to="/">Home</Link>
        </li>
        <li className="app__nav_item nav-loginButton">
          <button onClick={navigateToLogin}>Login</button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
