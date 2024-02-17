import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

export const AdminRoute = () => {
  const { userType } = useSelector((state) => state.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (userType !== "ROLE_ADMIN") {
      navigate("/register", {
        replace: true,
        state: "관리자만 접근 가능합니다.",
      });
    }
  }, [userType, navigate]);

  return userType === "ROLE_ADMIN" ? <Outlet /> : null;
};

export const ExcludeAdminRoute = () => {
  const { userType } = useSelector((state) => state.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (userType === "ROLE_ADMIN") {
      navigate("/register", {
        replace: true,
        state: "관리자는 접근 할 수 없습니다.",
      });
    }
  }, [userType, navigate]);

  return userType !== "ROLE_ADMIN" ? <Outlet /> : null;
};
