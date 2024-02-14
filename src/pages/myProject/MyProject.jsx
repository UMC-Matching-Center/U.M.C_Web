import React from "react";
import { Route, Routes } from "react-router-dom";
import ReviewTeam from "./review/ReviewTeam";
import LandingPage from "./LandingPage";

export default function MyProject() {
  return (
    <Routes>
      <Route path="/review" exact element={<ReviewTeam />}></Route>
      <Route path="/landing/*" element={<LandingPage />}></Route>
    </Routes>
  );
}
