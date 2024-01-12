import React from "react";
import { Routes, Route } from "react-router-dom";
import MyPageAdmin from "./MyPageAdmin";
import MyPageUser from "./MyPageUser";
import "./MyPage.css";

const MyPage = () => {
  const user = { type: "USER" };
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <>
            {user.type === "MANAGER" && <MyPageAdmin />}
            {user.type === "USER" && <MyPageUser />}
          </>
        }
      ></Route>
    </Routes>
  );
};

export default MyPage;
