import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { landingDetailAPI } from "../../../api";
import useGetAccessToken from "../../../utils/getAccessToken";
import LandingPageWrite from "./LandingPageWrite";
import ProjectDetail from "../../../components/ProjectDetail";
import { TextAreaProvider } from "../../../context/TextAreaProvider";

function LandingPageDetail({ project, type }) {
  return project ? <ProjectDetail project={project} type={type} /> : null;
}

export default function LandingPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const accessToken = useGetAccessToken();
  const { userType, autoLogin } = useSelector((state) => state.userInfo);

  const [data, setData] = useState(null);

  useEffect(() => {
    if (accessToken !== "") {
      landingDetailAPI(accessToken, dispatch, autoLogin).then((response) => {
        if (response.isSuccess) {
          const responseData = {
            ...response.project,
            name: response.project.title,
          };
          setData(responseData);
        } else if (response.project === null) {
          setData(null);
        }
      });
    }
  }, [location]);

  return (
    <>
      <TextAreaProvider>
        <Routes>
          {userType === "ROLE_PM" && data === null ? (
            <Route path="/new" element={<LandingPageWrite mode="new" />} />
          ) : (
            <Route
              path="/"
              element={<LandingPageDetail project={data} type={userType} />}
            />
          )}
          <Route
            path="/modify"
            element={
              userType === "ROLE_PM" && <LandingPageWrite mode="modify" />
            }
          />
        </Routes>
      </TextAreaProvider>
    </>
  );
}
