import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MatchCard from "../../common/MatchCard/MatchCard";
import MatchDetail from "./MatchDetail";
import MatchWrite from "./MatchWrite";

const projectsDummy = [
  {
    id: 1,
    title: "프로젝트 이름",
    introduction: "설명",
    imageUrl: "../../images/sample_project.png",
    recruit: [
      {
        id: 0,
        part: "DESIGN",
        recruitmentFinished: true,
      },
      {
        id: 1,
        part: "WEB",
        recruitmentFinished: false,
      },
    ],
  },
  {
    id: 2,
    title: "토스, 새로운 차원의 금융",
    introduction: "쉽고 편리한 금융을 넘어 모두의 평등한 금융 경험을 위해",
    imageUrl: "../../images/sample_project.png",
    recruit: [
      {
        id: 0,
        part: "DESIGN",
        recruitmentFinished: true,
      },
      {
        id: 1,
        part: "WEB",
        recruitmentFinished: false,
      },
    ],
  },
  {
    id: 3,
    title: "네이버",
    introduction: `새로워진 네이버 앱 참, 쓸데 있는 즐거움.`,
    imageUrl: "../../images/sample_project.png",
    recruit: [
      {
        id: 0,
        part: "DESIGN",
        recruitmentFinished: true,
      },
      {
        id: 1,
        part: "WEB",
        recruitmentFinished: false,
      },
      {
        id: 2,
        part: "SERVER",
        recruitmentFinished: false,
      },
    ],
  },
  {
    id: 4,
    title: "프로젝트 이름",
    introduction: "설명",
    imageUrl: "../../images/sample_project.png",
    recruit: [
      {
        id: 0,
        part: "DESIGN",
        recruitmentFinished: true,
      },
      {
        id: 1,
        part: "WEB",
        recruitmentFinished: false,
      },
    ],
  },
];

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

function MatchHome() {
  const navigate = useNavigate();

  const handleCardClick = (project) => {
    navigate(`../detail/${project.id}`);
  };

  /*---무한 스크롤 추가 예정---*/

  return (
    <MatchMain>
      <div className="button_wrap">
        <button onClick={() => navigate("../new")}>Add</button>
      </div>
      <MatchList>
        {projectsDummy.map((project) => {
          return (
            <MatchCard
              project={project}
              key={project.id}
              onClick={handleCardClick}
            />
          );
        })}
      </MatchList>
    </MatchMain>
  );
}

export default function Match() {
  const user = { type: "ROLE_PM" }; // API 연결 시 변경 예정
  return (
    <Routes>
      <Route path="/" exact element={<MatchHome type={user.type} />}></Route>
      <Route
        path="/detail/*"
        element={<MatchDetail type={user.type} />}
      ></Route>
      <Route
        path="/new"
        exact
        element={
          user.type === "ROLE_PM" ? (
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
          user.type === "ROLE_PM" ? (
            <MatchWrite mode="modify" />
          ) : (
            <Navigate to=".." />
          )
        }
      ></Route>
    </Routes>
  );
}
