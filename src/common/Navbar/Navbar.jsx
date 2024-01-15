import React from "react";
import { useSelector } from "react-redux";

import InitNavbar from "./InitNavbar";
import AdminNavbar from "./AdminNavbar";

const Navbar = () => {
  /*--- Redux 관련 ---*/
  const { userType } = useSelector((state) => state.userInfo);

  return <>{userType == "Register" ? <InitNavbar /> : <AdminNavbar />}</>;
};

export default Navbar;
