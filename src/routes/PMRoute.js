import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

export const PMRoute = () => {
  const { userType } = useSelector((state) => state.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (userType !== "ROLE_PM") {
      navigate("/register", {
        replace: true,
        state: "Plan 매니저만 접근 가능합니다.",
      });
    }
  }, [userType, navigate]);

  return userType === "ROLE_PM" ? <Outlet /> : null;
};
