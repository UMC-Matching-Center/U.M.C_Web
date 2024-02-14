import { Route, Routes, BrowserRouter } from "react-router-dom";

import Navbar from "./common/Navbar/Navbar";
import Footer from "./common/Footer/Footer";
import RegisterNavbar from "./common/Navbar/RegisterNavbar";
import Home from "./pages/Home";
import Register from "./pages/register/Register";
import HomeDetail from "./pages/HomeDetail";
import ChallengerManage from "./pages/challenger/ChallengerManage";
import Schedule from "./pages/schedule/Schedule";
import MyPage from "./pages/myPage/MyPage";
import Notice from "./pages/notice/Notice";
import Match from "./pages/match/Match";
import MyProject from "./pages/myProject/MyProject";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="project/*" element={<HomeDetail />} />
          <Route path="mypage/*" element={<MyPage />} />
          <Route path="challenger/*" element={<ChallengerManage />} />
          <Route path="notice/*" element={<Notice />} />
          <Route path="schedule/*" element={<Schedule />} />
          <Route path="match/*" element={<Match />} />
          <Route path="myproject/*" element={<MyProject />} />
        </Route>
        <Route
          path="/register/*"
          element={
            <>
              <RegisterNavbar />
              <Register />
            </>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
