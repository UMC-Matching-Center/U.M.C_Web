import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  matchQAListAPI,
  matchQuestionUploadAPI,
  matchQADeleteAPI,
  matchAnswerUploadAPI,
} from "../../api";
import useGetAccessToken from "../../utils/getAccessToken";
import {
  IconLetterQ,
  IconChevronDown,
  IconChevronUp,
  IconPencil,
} from "@tabler/icons-react";
import styled from "styled-components";

const QAContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const QAWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120rem;
  height: 77.1rem;
  margin-bottom: 2.1rem;
  background: #fafafa;
  border-radius: 1rem;
`;

const QATitle = styled.div`
  margin: 5.8rem auto 6rem auto;
  width: 99.6rem;
  font-family: KBO-Dia-Gothic;
  font-size: 4.8rem;
  font-weight: 500;
  text-align: center;
`;

const QAContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 99.6rem;
  height: 52.3rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const QAModal = styled.div`
  display: flex;
  flex-direction: column;
  width: 95rem;
  padding: 2.3rem 2rem;
  border-bottom: 0.1rem solid #9c9aab;

  > .question-toggle {
    display: flex;

    > .question-content {
      font-family: KBO-Dia-Gothic;
      margin-left: 2rem;
      padding-right: 3.6rem;
      font-size: 2.4rem;
      font-weight: 300;
    }
  }

  > .question-toggle-open {
    display: flex;
    font-family: KBO-Dia-Gothic;
    font-size: 1.8rem;
    font-weight: 300;
    padding: 2.3rem 0 0 0.5rem;
  }

  & input {
    font-family: KBO-Dia-Gothic;
    font-size: 1.8rem;
    font-weight: 300;
  }

  & textarea {
    border: 0;
    outline: 0;
    font-family: KBO-Dia-Gothic;
    font-size: 1.8rem;
    font-weight: 300;
    width: 80rem;
    height: 10rem;
  }

  & .matchQA_button {
    margin-left: auto;
    width: 4rem;
    height: 2.4rem;
    text-align: center;
    color: #0261aa;
    border: 0.1rem solid #0261aa;
    border-radius: 0.5rem;
  }
`;

const DeleteQA = styled.button`
  width: 4rem;
  height: 2.4rem;
  text-align: center;
  border-radius: 0.5rem;
  border: 0.1rem solid #9c9aab;
  color: #9c9aab;
  font-size: 1.8rem;
  &:hover {
    border: 0.1rem solid #d62117;
    color: #d62117;
  }
`;

const QARequest = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3.9rem;
  padding: 1.9rem 0;
  border-top: 0.1rem solid #fafafa;
  background: var(--primary-900, #000d17);

  > button {
    width: 120rem;
    height: 3.9rem;
    border-radius: 1rem;
    background: #0261aa;
    color: #fafafa;
    font-weigth: 300;
    font-size: 2rem;
  }
`;

/*---질문하기&수정하기, 삭제 이벤트 함수 추후 구현---*/
const MatchQA = () => {
  const [QAData, setQAData] = useState([]);
  const [toggles, setToggles] = useState([]); // 각 질문 toggle 변수
  const [AContent, setAContent] = useState([]);
  const [disableAnswer, setDisableAnswer] = useState([]);
  const [QMode, setQMode] = useState(false);
  const [newQ, setNewQ] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const projectId = state.id;

  const dispatch = useDispatch();
  const accessToken = useGetAccessToken();
  const { userType } = useSelector((state) => state.userInfo);

  // API : 리스트 조회
  const loadData = () => {
    if (accessToken !== "") {
      matchQAListAPI(accessToken, dispatch, projectId).then((response) => {
        if (response.isSuccess) {
          setQAData(response.qnaList);
          setToggles(response.qnaList.map(() => false));
          setAContent(response.qnaList.map(() => ""));
          setDisableAnswer(response.qnaList.map(() => true));
        } else {
          alert(response.message);
        }
      });
    } else {
      navigate("/login", { replace: true }); // 메인 페이지로 이동
    }
  };

  useEffect(() => {
    loadData(); // 데이터 불러오기
  }, []);

  /*----- 각 Q&A 핸들러 -----*/
  // IconChevronDown 클릭 시, 답변 toggle
  const handleToggle = (index) => {
    setToggles((prevToggles) => {
      const newToggles = [...prevToggles];
      newToggles[index] = !newToggles[index];
      return newToggles;
    });
  };

  // 답변 입력 핸들러
  const handleAnswerChange = (index, value) => {
    setAContent((prevList) => {
      const newList = [...prevList];
      newList[index] = value;
      return newList;
    });
  };

  // 답변 입력 상태 변경 핸들러
  const handleDisableAnswerChange = (index) => {
    setDisableAnswer((prevList) => {
      const newList = [...prevList];
      newList[index] = false;
      return newList;
    });
  };

  // 답변 삭제 이벤트
  const deleteQA = (index, questionId) => {
    if (accessToken !== "") {
      matchQADeleteAPI(accessToken, dispatch, questionId).then((response) => {
        if (response.isSuccess) {
          // 삭제된 QA를 제외하고 QA 목록 업데이트
          const updatedQAList = QAData.filter((qa, idx) => idx !== index);
          setQAData(updatedQAList);

          // 그 외 Toggles, AContent 및 DisableAnswer 상태 업데이트
          setToggles(updatedQAList.map(() => false));
          setAContent(updatedQAList.map(() => ""));
          setDisableAnswer(updatedQAList.map(() => true));
        } else {
          alert(response.message);
        }
      });
    } else {
      navigate("/login", { replace: true }); // 메인 페이지로 이동
    }
  };

  // 새로운 질문 등록
  const uploadNewQ = () => {
    if (accessToken !== "") {
      matchQuestionUploadAPI(accessToken, dispatch, projectId, newQ).then(
        (response) => {
          if (response.isSuccess) {
            // 삭제된 QA를 제외하고 QA 목록 업데이트
            const updatedQAList = [
              ...QAData,
              {
                questionId: response.questionId,
                question: newQ,
                answer: null,
                createAt: null,
              },
            ];
            setQAData(updatedQAList);

            // 그 외 Toggles, AContent 및 DisableAnswer 상태 업데이트
            setToggles(updatedQAList.map(() => false));
            setAContent(updatedQAList.map(() => ""));
            setDisableAnswer(updatedQAList.map(() => true));
          } else {
            alert(response.message);
          }
        }
      );
    } else {
      navigate("/login", { replace: true }); // 메인 페이지로 이동
    }

    setNewQ("");
    setQMode(false);
  };

  // 새로운 답변 등록
  const uploadNewA = (questionId, answer) => {
    if (accessToken !== "") {
      matchAnswerUploadAPI(accessToken, dispatch, questionId, answer).then(
        (response) => {
          if (response.isSuccess) {
            // 답변 등록된 QA 목록 업데이트
            const updatedQAList = QAData.map((item) => {
              if (item.questionId === questionId) {
                return { ...item, answer: answer };
              }
              return item;
            });
            setQAData(updatedQAList);
          } else {
            alert(response.message);
          }
        }
      );
    } else {
      navigate("/login", { replace: true }); // 메인 페이지로 이동
    }
    /*patch로 보내고(api) , state value값으로 QAData[index].answer? 변경해 변경*/
  };

  return (
    <>
      <QAContainer>
        <QAWrapper>
          <QATitle>
            <div style={{ color: "#000000" }}>UMC Matching Center</div>
            <div style={{ color: "#0261aa" }}>Q&A</div>
          </QATitle>
          <QAContent>
            {QMode && (
              <QAModal>
                <div className="question-toggle">
                  <div
                    style={{
                      width: "2.4rem",
                      height: "2.4rem",
                      borderRadius: "3rem",
                      backgroundColor: "#0261AA",
                      padding: "0.3rem",
                    }}
                  >
                    <IconLetterQ size={24} color="#FAFAFA" />
                  </div>
                  <div className="question-content">
                    <textarea
                      placeholder="질문을 입력해주세요"
                      value={newQ}
                      onChange={(e) => setNewQ(e.target.value)}
                    />
                  </div>
                  <button className="matchQA_button" onClick={uploadNewQ}>
                    등록
                  </button>
                </div>
              </QAModal>
            )}
            {QAData?.reverse().map((question, index) => {
              return (
                <QAModal key={question.questionId}>
                  <div className="question-toggle">
                    <div
                      style={{
                        width: "2.4rem",
                        height: "2.4rem",
                        borderRadius: "3rem",
                        backgroundColor: "#0261AA",
                        padding: "0.3rem",
                      }}
                    >
                      <IconLetterQ size={24} color="#FAFAFA" />
                    </div>
                    <div
                      className="question-content"
                      style={{
                        color: `${toggles[index] ? "#014171" : "#131313"}`,
                      }}
                    >
                      {question.question}{" "}
                      {question.question && userType === "ROLE_PM" && (
                        <DeleteQA
                          onClick={() => deleteQA(index, question.questionId)}
                        >
                          삭제
                        </DeleteQA>
                      )}
                    </div>
                    {!toggles[index] ? (
                      <IconChevronDown
                        size={32}
                        color="#014171"
                        style={{ marginLeft: "auto" }}
                        onClick={() => {
                          handleToggle(index);
                        }}
                      />
                    ) : (
                      <IconChevronUp
                        size={32}
                        color="#014171"
                        style={{ marginLeft: "auto" }}
                        onClick={() => {
                          handleToggle(index);
                        }}
                      />
                    )}
                  </div>
                  <div
                    className="question-toggle-open"
                    style={{ display: `${toggles[index] ? "" : "none"}` }}
                  >
                    <IconPencil
                      size={20}
                      color="#393556"
                      stroke={1}
                      style={{
                        visibility: `${
                          userType === "ROLE_PM" ? "visible" : "hidden"
                        }`,
                        cursor: "pointer",
                      }}
                      onClick={() => handleDisableAnswerChange(index)}
                    />
                    <div style={{ marginLeft: "2.5rem" }}>
                      {userType === "ROLE_PM" ? (
                        question.answer === null ? (
                          <input
                            value={AContent[index]}
                            onChange={(e) =>
                              handleAnswerChange(index, e.target.value)
                            }
                            placeholder="답변을 입력해주세요"
                            disabled={disableAnswer[index]}
                          />
                        ) : (
                          question.answer
                        )
                      ) : question.answer === null ? (
                        "아직 답변이 등록되지 않았습니다."
                      ) : (
                        question.answer
                      )}
                    </div>
                    {userType === "ROLE_PM" &&
                      question.answer === null &&
                      !disableAnswer[index] && (
                        <button
                          className="matchQA_button"
                          onClick={() =>
                            uploadNewA(question.questionId, AContent[index])
                          }
                        >
                          등록
                        </button>
                      )}
                  </div>
                </QAModal>
              );
            })}
          </QAContent>
        </QAWrapper>
      </QAContainer>
      {userType === "ROLE_CHALLENGER" && (
        <QARequest>
          <button onClick={() => setQMode(true)}>질문하기</button>
        </QARequest>
      )}
    </>
  );
};

export default MatchQA;
