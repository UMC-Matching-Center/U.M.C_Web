import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AdminRoute, ExcludeAdminRoute, PrivateRoutes } from "./routes";

import Navbar from "./common/Navbar/Navbar";
import Footer from "./common/Footer/Footer";
import Home from "./pages/home/Home";
import HomeDetail from "./pages/home/HomeDetail";
import Register from "./pages/register/Register";
import ChallengerManage from "./pages/challenger/ChallengerManage";
import Schedule from "./pages/schedule/Schedule";
import MyPage from "./pages/myPage/MyPage";
import Notice from "./pages/notice/Notice";
import Match from "./pages/match/Match";
import MyProject from "./pages/myProject/MyProject";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<ExcludeAdminRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="project/*" element={<HomeDetail />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route element={<AdminRoute />}>
            <Route path="challenger/*" element={<ChallengerManage />} />
          </Route>
          <Route element={<ExcludeAdminRoute />}>
            <Route path="myproject/*" element={<MyProject />} />
          </Route>
          <Route path="mypage/*" element={<MyPage />} />
          <Route path="notice/*" element={<Notice />} />
          <Route path="schedule/*" element={<Schedule />} />
          <Route path="match/*" element={<Match />} />
        </Route>
        <Route path="register/*" element={<Register />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
