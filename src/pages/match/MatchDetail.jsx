import React, { useState, useEffect } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetAccessToken from "../../utils/getAccessToken";
import { matchDetailAPI, matchApplyAPI } from "../../api";
import styled from "styled-components";
import ProjectDetail from "../../components/ProjectDetail";
import MatchQA from "./MatchQA";
import chat from "../../images/ic_chat.svg";
import Modal from "react-modal";
import { Apply, ApplyError } from "../../components/modal";
import { IconLoader, IconCircleCheck } from "@tabler/icons-react";

const ModalStyles = {
  overlay: { width: "100vw", background: "rgba(2, 1, 11, 0.5)", zIndex: "1" },
  content: {
    width: "56.5rem",
    height: "35rem",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    background: "none",
    border: "none",
  },
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

Modal.setAppElement("#root");

const MatchProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useGetAccessToken();
  const { userType, autoLogin } = useSelector((state) => state.userInfo);
  const [data, setData] = useState({
    projectId: null,
    pmId: null,
    name: "",
    image: null,
    introduction: "",
    body: ``,
    recruitments: [],
    members: [],
    createAt: [],
  });
  const [apply, setApply] = useState(false);
  const [applyError, setApplyError] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    if (accessToken !== "") {
      matchDetailAPI(accessToken, dispatch, autoLogin, id).then((response) => {
        if (response.isSuccess) {
          setData(response.project);
        } else {
          alert(response.message);
        }
      });
    } else {
      navigate("/login", { replace: true }); // 메인 페이지로 이동
    }
  }, []);

  const handleApply = () => {
    if (accessToken !== "") {
      matchApplyAPI(accessToken, dispatch, autoLogin, id).then((response) => {
        if (response.isSuccess) {
          setApply(true);
        } else {
          setErrMessage(response.message); // 에러 메시지 정의
          setApplyError(true); // 에러 모달 띄우기
        }
      });
    } else {
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      <Modal
        isOpen={apply}
        onRequestClose={() => setApply(false)}
        style={ModalStyles}
      >
        <Apply isClose={() => setApply(false)} />
      </Modal>
      <Modal
        isOpen={applyError}
        onRequestClose={() => setApplyError(false)}
        style={ModalStyles}
      >
        <ApplyError isClose={() => setApplyError(false)} message={errMessage} />
      </Modal>
      <ProjectDetail project={data} type={userType} />
      <MatchBar>
        <div className="match-question">
          <div
            className="match-question-circle"
            onClick={() =>
              navigate(window.location.pathname + `/question`, {
                state: { id: id },
              })
            }
          >
            <img src={chat} alt="chat-icon" />
            <span>Q&A</span>
          </div>
        </div>
        <div className="match-recruit-bar">
          {data?.recruitments.map((recruit) => {
            return (
              <>
                <RecruitBadge
                  key={recruit.id}
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
                      case "NODEJS":
                        return "서버 개발자(Node js) ";
                      case "ANDROID":
                        return "앱 개발자(Android) ";
                      case "IOS":
                        return "앱 개발자(iOS) ";
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
          {userType === "ROLE_CHALLENGER" && (
            <button onClick={() => handleApply()}>지원하기</button>
          )}
        </div>
      </MatchBar>
    </>
  );
};

function MatchDetail() {
  return (
    <Routes>
      <Route exact path="/:id" element={<MatchProjectDetail />} />
      <Route path="/:id/question" element={<MatchQA />} />
    </Routes>
  );
}

export default MatchDetail;
