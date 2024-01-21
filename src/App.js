import { Route, Routes, BrowserRouter } from "react-router-dom";
import styled from "styled-components";

import Navbar from "./common/Navbar/Navbar";
import Home from "./pages/Home";
import Register from "./pages/register/Register";
import ProjectDetail from "./components/ProjectDetail";
import ChallengerManage from "./pages/challenger/ChallengerManage";
import Schedule from "./pages/schedule/Schedule";

function App() {
  const Headers = styled.div`
    display: flex;
    padding: 3.9rem 0;
  `;

  return (
    <BrowserRouter>
      <Headers>
        <Navbar />
      </Headers>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/project/*" element={<ProjectDetail />} />
        <Route path="/register/*" element={<Register />} />
        <Route path="/challenger/*" element={<ChallengerManage />} />
        <Route path="/schedule/*" element={<Schedule/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
