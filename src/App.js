import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import styled from "styled-components";
import Home from "./pages/Home";
import Register from "./pages/register_pages/Register";
import Signup from "./pages/register_pages/Signup";
import AdminSignup from "./pages/register_pages/AdminSignup";
import UserSignup from "./pages/register_pages/UserSignup";
import SignupSuccess from "./pages/register_pages/SignupSuccess";
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
        <Route path="/register/signup" element={<Signup />} />
        <Route path="/register/signup/mode1" element={<UserSignup />} />
        <Route path="/register/signup/mode2" element={<AdminSignup />} />
        <Route path="/registerComplete" element={<SignupSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
