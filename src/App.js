import { Route, Routes, BrowserRouter } from "react-router-dom";

import Navbar from "./common/Navbar/Navbar";
import RegisterNavbar from "./common/Navbar/RegisterNavbar";
import Home from "./pages/Home";
import Register from "./pages/register/Register";
import ProjectDetail from "./components/ProjectDetail";
import ChallengerManage from "./pages/challenger/ChallengerManage";
import Schedule from "./pages/schedule/Schedule";
import MyPage from "./pages/myPage/MyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="project/*" element={<ProjectDetail />} />
          <Route path="mypage/*" element={<MyPage />} />
          <Route path="challenger/*" element={<ChallengerManage />} />
          <Route path="schedule/*" element={<Schedule/>}/>
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
    </BrowserRouter>
  );
}
export default App;
