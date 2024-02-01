import React, { useEffect } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProjectDetail from "../../components/ProjectDetail";
import MatchChat from "./MatchChat";
import chat from "../../images/ic_chat.svg";
import { IconLoader, IconCircleCheck } from "@tabler/icons-react";

const DATA = {
  idx: 0,
  name: "프로젝트이름",
  image: "string",
  introduction: "string",
  body: "string",
  recruitments: [
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
      part: "SPRINGBOOT",
      recruitmentFinished: false,
    },
  ],
};

const MatchBar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;

  > .match-question {
    margin-bottom: 2rem;
    padding: 0 14rem;

    > .match-question-circle {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: auto;
      width: 9rem;
      height: 9rem;
      border-radius: 5rem;
      background: #0261aa;
      cursor: pointer;
      > span {
        position: absolute;
        top: 3rem;
        color: #ffffff;
        font-family: KBO-Dia-Gothic;
        font-weight: 300;
        font-size: 1.8rem;
      }
    }
  }

  > .match-recruit-bar {
    display: flex;
    height: 4.1rem;
    padding: 1.7rem 12rem;
    border-top: 0.1rem solid #fafafa;
    background: var(--primary-900, #000d17);

    > button {
      width: 12.1rem;
      height: 4.2rem;
      border-radius: 0.8rem;
      color: #ffffff;
      background: #0261aa;
      font-weight: 500;
      font-size: 2rem;

      margin-left: auto;
    }
  }
`;

const RecruitBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0 1.1rem;
  width: auto;
  max-width: 35.6rem;
  height: 2.7rem;
  padding: 0.6rem 1.8rem;
  margin-right: 1.1rem;
  border-radius: 2.5rem;
  background: ${(props) => props.$background};
  font-weight: ${(props) => props.$bold};
  font-size: 2rem;
  font-family: KBO-Dia-Gothic;
`;

const MatchProjectDetail = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const user = { type: "ROLE_PLAN" };

  useEffect(() => {
    /*API: 프로젝트 id값 통해 해당 프로젝트 데이터(DATA) 받아오기*/
    console.log(id);
  }, []);

  return (
    <>
      <ProjectDetail project={DATA} type={user.type} />
      <MatchBar>
        <div className="match-question">
          <div
            className="match-question-circle"
            onClick={() => navigation(window.location.pathname + "/chat")}
          >
            <img src={chat} alt="chat-icon" />
            <span>Q&A</span>
          </div>
        </div>
        <div className="match-recruit-bar">
          {DATA.recruitments.map((recruit) => {
            return (
              <>
                <RecruitBadge
                  key={recruit.idx}
                  $background={
                    !recruit.recruitmentFinished ? "#CCE6F9" : "#D9D9D9"
                  }
                  $bold={!recruit.recruitmentFinished ? "500" : "300"}
                >
                  {(() => {
                    switch (recruit.part) {
                      case "WEB":
                        return "웹 개발자 ";
                      case "DESIGN":
                        return "디자이너 ";
                      case "SPRINGBOOT":
                        return "서버 개발자(Spring Boot) ";
                      default:
                        return "";
                    }
                  })()}
                  {!recruit.recruitmentFinished ? "모집 중" : "모집 완료"}
                  {!recruit.recruitmentFinished ? (
                    <IconLoader color={"#131313"} size={24} />
                  ) : (
                    <IconCircleCheck color={"#131313"} size={24} />
                  )}
                </RecruitBadge>
              </>
            );
          })}
          {user.type === "ROLE_CHALLENGER" && <button>지원하기</button>}
        </div>
      </MatchBar>
    </>
  );
};

function MatchDetail() {
  return (
    <Routes>
      <Route exact path="/:id" element={<MatchProjectDetail />} />
      <Route path="/:id/chat" element={<MatchChat />} />
    </Routes>
  );
}

export default MatchDetail;
