import React from "react";
import { Route, Routes } from "react-router-dom";
import ReviewTeam from "./review/ReviewTeam";

export default function MyProject() {
    return(
        <Routes>
        <Route path="/review" exact element={<ReviewTeam />}></Route>
      </Routes>
    )
}