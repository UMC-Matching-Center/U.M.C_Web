import React from "react";
import { useSelector } from "react-redux";

import InitNavbar from "./InitNavbar";
import AdminNavbar from "./AdminNavbar";

const Navbar = () => {
  /*--- Redux 관련 ---*/
  const { userType, autoLogin } = useSelector((state) => state.userInfo);
  const { token: sessionToken } = useSelector((state) => state.session.session);

  return (
    <>
      {autoLogin === true ? (
        userType == "ROLE_CHALLENGER" ? (
          <AdminNavbar /> // 일반 챌린저
        ) : (
          <AdminNavbar /> // 관리자
        )
      ) : sessionToken === "" ? (
        <InitNavbar /> // 회원가입
      ) : userType == "ROLE_CHALLENGER" ? (
        <AdminNavbar /> // 일반 챌린저
      ) : (
        <AdminNavbar /> // 관리자
      )}
    </>
  );
};

export default Navbar;
