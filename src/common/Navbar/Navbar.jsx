import React from "react";
import { useSelector } from "react-redux";

import InitNavbar from "./InitNavbar";
import AdminNavbar from "./AdminNavbar";
import UserNavbar from "./UserNavbar";
import PMNavbar from "./PMNavbar";

const Navbar = () => {
  /*--- Redux 관련 ---*/
  const { userType, userPart, autoLogin } = useSelector(
    (state) => state.userInfo
  );
  const { token: sessionToken } = useSelector((state) => state.session.session);

  return (
    <>
      {autoLogin === true ? (
        userType === "ROLE_CHALLENGER" ? (
          userPart === "PLAN" ? (
            <PMNavbar /> // 일반 챌린저 (PM)
          ) : (
            <UserNavbar /> // 일반 챌린저 (PM 이외)
          )
        ) : (
          <AdminNavbar /> // 관리자
        )
      ) : sessionToken === "" ? (
        <InitNavbar /> // 회원가입
      ) : userType === "ROLE_CHALLENGER" ? (
        userPart === "PLAN" ? (
          <PMNavbar /> // 일반 챌린저 (PM)
        ) : (
          <UserNavbar /> // 일반 챌린저 (PM 이외)
        )
      ) : (
        <AdminNavbar /> // 관리자
      )}
    </>
  );
};

export default Navbar;
