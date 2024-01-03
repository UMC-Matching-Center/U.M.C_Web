import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import styled from "styled-components";
import Home from "./pages/Home";
import Register from "./pages/register/Register";
function App() {
  const Headers = styled.div`
    display: flex;
    position: absolute;
    z-index: 1;
  `;

  return (
    <BrowserRouter style={{ position: "relative" }}>
      <Headers>
        <Link to="/">Home</Link>
      </Headers>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/*" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
