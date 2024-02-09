import React from "react";
import { Route, Routes } from "react-router-dom";
import ReviewTeam from "./review/ReviewTeam";
import ViewStatus from "./viewstatus/ViewStatus";

export default function MyProject() {
    return(
        <Routes>
        <Route path="/review" exact element={<ReviewTeam />}></Route>
        <Route path="/viewstatus" exact element={<ViewStatus />}></Route>
      </Routes>
    )
}