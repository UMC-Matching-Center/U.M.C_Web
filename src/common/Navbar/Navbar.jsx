import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import InitNavbar from "./InitNavbar";
import AdminNavbar from "./AdminNavbar";

const Navbar = () => {
  /*--- Redux 관련 ---*/
  const { userType } = useSelector((state) => state.userInfo);

  return (
    <>
      {userType === "Register" ? <InitNavbar /> : <AdminNavbar />}
      <Outlet />
    </>
  );
};

export default Navbar;
