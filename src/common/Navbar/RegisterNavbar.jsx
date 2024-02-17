import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Logo from "../../images/logo_crop.svg";
import "./Navbar.css";

const RegisterNavbar = () => {
  const { userType } = useSelector((state) => state.userInfo);
  return (
    <>
      <div className="app__nav" style={{ paddingBottom: "10rem" }}>
        <div className="nav_area">
          <div className="nav_logo">
            <Link
              to={userType !== "ROLE_ADMIN" ? "/" : "/challenger/manage"}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img src={Logo} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterNavbar;
