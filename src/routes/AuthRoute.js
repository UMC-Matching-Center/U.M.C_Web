import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import useGetAccessToken from "../utils/getAccessToken";

export const PrivateRoutes = () => {
  const { userType } = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const accessToken = useGetAccessToken();

  useEffect(() => {
    if (userType === "REGISTER" || userType === null || accessToken === "") {
      navigate("/register", {
        replace: true,
        state: "로그인이 필요한 서비스입니다.",
      });
    }
  }, [userType, navigate]);

  return userType !== "REGISTER" ? <Outlet /> : null;
};
