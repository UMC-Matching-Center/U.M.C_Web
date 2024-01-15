import { Route, Routes, BrowserRouter } from "react-router-dom";

import Navbar from "./common/Navbar/Navbar";
import RegisterNavbar from "./common/Navbar/RegisterNavbar";
import Home from "./pages/Home";
import Register from "./pages/register/Register";
import ProjectDetail from "./components/ProjectDetail";
import ChallengerManage from "./pages/challenger/ChallengerManage";
import MyPage from "./pages/myPage/MyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/*" element={<Home />} />
          <Route path="/project/*" element={<ProjectDetail />} />
          <Route path="/mypage/*" element={<MyPage />} />
          <Route path="/challenger/*" element={<ChallengerManage />} />
        </Route>
        <Route element={<RegisterNavbar />}>
          <Route path="/register/*" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
