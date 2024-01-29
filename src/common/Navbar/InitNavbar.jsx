import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";

import Logo from "../../images/logo_crop.svg";
import "./Navbar.css";

const InitNavbar = () => {
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="app__nav">
        <div className="nav_area">
          <div className="nav_logo">
            <Link to="/">
              <img src={Logo} />
            </Link>
          </div>
          <ul className="nav_center">
            <li className="nav-home">
              <Link to="/">Home</Link>
            </li>
          </ul>
          <div className="nav_right">
            <button className="login_button" onClick={navigateToLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default InitNavbar;
