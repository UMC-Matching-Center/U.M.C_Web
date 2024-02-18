import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { landingDetailAPI } from "../../../api";
import useGetAccessToken from "../../../utils/getAccessToken";
import LandingPageWrite from "./LandingPageWrite";
import ProjectDetail from "../../../components/ProjectDetail";
import { TextAreaProvider } from "../../../context/TextAreaProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LandingPageDetail({ project, type }) {
  return project ? <ProjectDetail project={project} type={type} /> : null;
}

export default function LandingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useGetAccessToken();
  const { userType, autoLogin } = useSelector((state) => state.userInfo);

  const [data, setData] = useState(null);
  const [, setDisAllow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (accessToken !== "") {
      landingDetailAPI(accessToken, dispatch, autoLogin).then((response) => {
        if (response.isSuccess) {
          const responseData = {
            ...response.project,
            name: response.project.title,
          };
          setData(responseData);
        } else if (response.message === "프로젝트가 존재하지 않습니다.") {
          setDisAllow(true);
          toast.error(response.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/match");
        } else if (response.message === "랜딩페이지가 존재하지 않습니다.") {
          setDisAllow(true);
          toast.error(response.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/match");
        }
        setIsLoading(false);
      });
    }
  }, [location]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TextAreaProvider>
        <ToastContainer />
        <Routes>
          {data === null ? (
            userType === "ROLE_PM" ? (
              <Route
                path="/"
                element={<Navigate to="/myproject/landing/new" />}
              />
            ) : (
              <Route path="/" element={<Navigate to="/match" />} />
            )
          ) : (
            <Route
              path="/"
              element={<LandingPageDetail project={data} type={userType} />}
            />
          )}
          <Route
            path="/new"
            element={userType === "ROLE_PM" && <LandingPageWrite mode="new" />}
          />
          <Route
            path="/modify"
            element={
              userType === "ROLE_PM" && <LandingPageWrite mode="modify" />
            }
          />
          <Route
            path="/"
            element={<LandingPageDetail project={data} type={userType} />}
          />
        </Routes>
      </TextAreaProvider>
    </>
  );
}
