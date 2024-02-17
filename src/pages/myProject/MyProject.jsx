import React from "react";
import { Route, Routes } from "react-router-dom";
import { PMRoute } from "../../routes";

import EvaluateTeam from "./TeamEvaluate";
import ApplyStatus from "./ApplyStatus";
import LandingPage from "./LandingPage";

export default function MyProject() {
  return (
    <Routes>
      <Route path="/evaluate" exact element={<EvaluateTeam />} />
      <Route path="/landing/*" element={<LandingPage />} />
      <Route element={<PMRoute />}>
        <Route path="/applystatus" exact element={<ApplyStatus />} />
      </Route>
    </Routes>
  );
}
