import React from "react";
import { Route, Routes } from "react-router-dom";
import { PMRoute } from "../../routes";

import ReviewTeam from "./review/ReviewTeam";
import ViewStatus from "./viewstatus/ViewStatus";
import LandingPage from "./LandingPage";

export default function MyProject() {
  return (
    <Routes>
      <Route path="/review" exact element={<ReviewTeam />} />
      <Route path="/landing/*" element={<LandingPage />} />
      <Route element={<PMRoute />}>
        <Route path="/viewstatus" exact element={<ViewStatus />} />
      </Route>
    </Routes>
  );
}
