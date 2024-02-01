import React, { useState } from "react";
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
    padding: 2.3rem 8.6rem 0 0.5rem;
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

const QAList = [
  {
    idx: 0,
    Qcontent:
      "질문질문질문질문질문아무말 대잔치 질문질문질문질문질문아무말 대잔치 질문질문질문질문질문아무말 대잔치 ",
    Acontent: "",
  },
  {
    idx: 1,
    Qcontent: "질문질문",
    Acontent: "답변답변",
  },
  {
    idx: 2,
    Qcontent: "질문질문",
    Acontent: "답변답변",
  },
  {
    idx: 3,
    Qcontent: "질문질문히히힣하하",
    Acontent: "답변답변",
  },

  {
    idx: 4,
    Qcontent: "질문질문히히힣하하",
    Acontent: "답변답변",
  },
];

/*---질문하기&수정하기, 삭제 이벤트 함수 추후 구현---*/
const MatchChat = () => {
  const [toggles, setToggles] = useState(QAList.map(() => false)); // 각 질문 toggle 변수
  const user = { type: "ROLE_PLAN" };

  // IconChevronDown 클릭 시, 답변 toggle
  const handleToggle = (index) => {
    setToggles((prevToggles) => {
      const newToggles = [...prevToggles];
      newToggles[index] = !newToggles[index];
      return newToggles;
    });
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
            {QAList.map((question, index) => {
              return (
                <QAModal key={question.idx}>
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
                      {question.Qcontent}{" "}
                      {user.type === "ROLE_PLAN" && <DeleteQA>삭제</DeleteQA>}
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
                          user.type === "ROLE_PLAN" ? "visible" : "hidden"
                        }`,
                      }}
                    />
                    <div style={{ marginLeft: "2.5rem" }}>
                      {question.Acontent !== ""
                        ? question.Acontent
                        : "아직 답변이 등록되지 않았습니다."}
                    </div>
                  </div>
                </QAModal>
              );
            })}
          </QAContent>
        </QAWrapper>
      </QAContainer>
      <QARequest>
        <button>질문하기</button>
      </QARequest>
    </>
  );
};

export default MatchChat;
