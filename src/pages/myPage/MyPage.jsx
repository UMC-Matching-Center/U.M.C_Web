import React from "react";
import { Routes, Route } from "react-router-dom";
import MyPageAdmin from "./MyPageAdmin";
import MyPageUser from "./MyPageUser";
import "./MyPage.css";
import { useSelector } from "react-redux";

const MyPage = () => {
  const { userType } = useSelector((state) => state.userInfo);
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <>{userType === "ROLE_ADMIN" ? <MyPageAdmin /> : <MyPageUser />}</>
        }
      ></Route>
    </Routes>
  );
};

export default MyPage;
