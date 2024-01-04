import { Route, Routes, BrowserRouter } from "react-router-dom";
import styled from "styled-components";

import Navbar from "./common/Navbar/Navbar";
import Home from "./pages/Home";
import Register from "./pages/register/Register";
import ProjectDetail from "./components/ProjectDetail";

function App() {
  const Headers = styled.div`
    display: flex;
    justify-content: center;
    padding: 3.9rem 8.6rem;
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
      </Routes>
    </BrowserRouter>
  );
}
export default App;
