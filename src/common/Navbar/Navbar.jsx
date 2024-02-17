import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import InitNavbar from "./InitNavbar";
import RegisterNavbar from "./RegisterNavbar";
import AdminNavbar from "./AdminNavbar";
import UserNavbar from "./UserNavbar";
import PMNavbar from "./PMNavbar";

export default function Navbar() {
  const locationNow = useLocation();
  const pageRoot = locationNow.pathname.split("/")[1];

  /*--- Redux 관련 ---*/
  const { userType, autoLogin } = useSelector((state) => state.userInfo);

  return (
    <>
      {pageRoot === "register" ? (
        <RegisterNavbar />
      ) : autoLogin === true ? (
        userType !== "ROLE_ADMIN" ? (
          userType === "ROLE_PM" ? (
            <PMNavbar /> // 일반 챌린저 (PM)
          ) : (
            <UserNavbar /> // 일반 챌린저 (PM 이외)
          )
        ) : (
          <AdminNavbar /> // 관리자
        )
      ) : userType === "REGISTER" ? (
        <InitNavbar /> // 회원가입
      ) : userType !== "ROLE_ADMIN" ? (
        userType === "ROLE_PM" ? (
          <PMNavbar /> // 일반 챌린저 (PM)
        ) : (
          <UserNavbar /> // 일반 챌린저 (PM 이외)
        )
      ) : (
        <AdminNavbar /> // 관리자
      )}
    </>
  );
}
