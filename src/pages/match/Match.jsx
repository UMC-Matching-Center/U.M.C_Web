import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import useGetAccessToken from "../../utils/getAccessToken";
import { matchListAPI } from "../../api";
import styled from "styled-components";
import MatchCard from "../../common/MatchCard/MatchCard";
import MatchDetail from "./MatchDetail";
import MatchWrite from "./MatchWrite";
import { TextAreaProvider } from "../../context/TextAreaProvider";

// const projectsDummy = [
//   {
//     projectId: 5,
//     name: "프로젝트 이름",
//     introduction: "설명",
//     image: "../../images/sample_project.png",
//     recruitments: [
//       {
//         id: 0,
//         part: "DESIGN",
//         recruitmentFinished: true,
//       },
//       {
//         id: 1,
//         part: "WEB",
//         recruitmentFinished: false,
//       },
//     ],
//   },
//   {
//     projectId: 6,
//     name: "토스, 새로운 차원의 금융",
//     introduction: "쉽고 편리한 금융을 넘어 모두의 평등한 금융 경험을 위해",
//     image: "../../images/sample_project.png",
//     recruitments: [
//       {
//         id: 0,
//         part: "DESIGN",
//         recruitmentFinished: true,
//       },
//       {
//         id: 1,
//         part: "WEB",
//         recruitmentFinished: false,
//       },
//     ],
//   },
//   {
//     projectId: 7,
//     name: "네이버",
//     introduction: `새로워진 네이버 앱 참, 쓸데 있는 즐거움.`,
//     image: "../../images/sample_project.png",
//     recruitments: [
//       {
//         id: 0,
//         part: "DESIGN",
//         recruitmentFinished: true,
//       },
//       {
//         id: 1,
//         part: "WEB",
//         recruitmentFinished: false,
//       },
//       {
//         id: 2,
//         part: "SPRINGBOOT",
//         recruitmentFinished: false,
//       },
//     ],
//   },
//   {
//     projectId: 8,
//     name: "프로젝트 이름",
//     introduction: "설명",
//     image: "../../images/sample_project.png",
//     recruitments: [
//       {
//         id: 0,
//         part: "DESIGN",
//         recruitmentFinished: true,
//       },
//       {
//         id: 1,
//         part: "WEB",
//         recruitmentFinished: false,
//       },
//     ],
//   },
// ];

const MatchMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > .button_wrap {
    width: 120rem;
    margin-bottom: 1.4rem;

    > button {
      float: right;
      width: 7rem;
      height: 3.2rem;
      border-radius: 2rem;
      border: 0.2rem solid var(--primary-600, #0261aa);
      background: transperant;
      color: #fffefe;

      font-family: KBO-Dia-Gothic;
      font-size: 1.4rem;
    }
  }
`;

const MatchList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  grid-gap: 7.8rem 2.4rem;
`;

function MatchHome({ type }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useGetAccessToken();
  const { autoLogin } = useSelector((state) => state.userInfo);

  const [data, setData] = useState([]); // 전체 프로젝트 데이터
  const [newData, setNewData] = useState([]);
  const [page, setPage] = useState(1); // 데이터를 불러온 횟수(페이지)

  /*---프로젝트 카드 클릭 이벤트(이동)---*/
  const handleCardClick = (project) => {
    navigate(`../detail/${project.projectId}`);
  };

  const loadData = () => {
    if (accessToken !== "") {
      matchListAPI(accessToken, dispatch, autoLogin, page).then((response) => {
        if (response.isSuccess) {
          if (page === 1) {
            setData(response.projectList);
          } else {
            setNewData(response.projectList);
            setData((preData) => [...preData, ...newData]);
          }
          setPage((prePage) => prePage + 1);
        } else {
          alert(response.message);
        }
      });
    } else {
      navigate("/login", { replace: true }); // 메인 페이지로 이동
    }
  };
  /*---무한 스크롤---*/
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      loadData();
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <MatchMain>
      {type === "ROLE_PM" && (
        <div className="button_wrap">
          <button onClick={() => navigate("../new")}>Add</button>
        </div>
      )}
      <MatchList>
        {data.map((project) => {
          return (
            <MatchCard
              project={project}
              key={project.projectId}
              onClick={handleCardClick}
            />
          );
        })}
      </MatchList>
    </MatchMain>
  );
}

export default function Match() {
  const { userType } = useSelector((state) => state.userInfo);
  return (
    <TextAreaProvider>
      <Routes>
        <Route path="/" exact element={<MatchHome type={userType} />}></Route>
        <Route path="/detail/*" element={<MatchDetail />}></Route>
        <Route
          path="/new"
          exact
          element={
            userType === "ROLE_PM" ? (
              <MatchWrite mode="new" />
            ) : (
              <Navigate to=".." />
            )
          }
        ></Route>
        <Route
          path="/modify"
          exact
          element={
            userType === "ROLE_PM" ? (
              <MatchWrite mode="modify" />
            ) : (
              <Navigate to=".." />
            )
          }
        ></Route>
      </Routes>
    </TextAreaProvider>
  );
}
