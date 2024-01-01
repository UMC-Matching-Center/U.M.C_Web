import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import styled from "styled-components";
import Home from "./pages/Home";
import ProjectDetail from "./components/ProjectDetail";
import Navbar from "./common/Navbar/Navbar";

function App() {
  const Headers = styled.div`
    display: flex;
    padding:3.9rem 0;
  `;

  return (
    <BrowserRouter>
      <Headers>
          <Navbar/>
        </Headers>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/Home/project/*" element={<ProjectDetail/>}/>
        <Route path="/Register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
