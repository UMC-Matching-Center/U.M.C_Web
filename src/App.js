import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import styled from "styled-components";
import Home from "./pages/Home";
import Register from "./pages/Register";
import SignUp from "./pages/SignUp";

function App() {
  const Headers = styled.div`
    display: flex;
  `;

  return (
    <BrowserRouter>
      <Headers>
        <Link to="/register">Home</Link>
      </Headers>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
