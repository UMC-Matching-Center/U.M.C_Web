import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import Register from "./pages/Register";
import styled from "styled-components";
import Home from "./pages/Home";

function App() {
  const Headers = styled.div`
    display: flex;
  `;

  return (
    <BrowserRouter>
      <Headers>
        <Link to="/">Home</Link>
      </Headers>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
