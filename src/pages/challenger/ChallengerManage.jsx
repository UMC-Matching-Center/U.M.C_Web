import React, { useState } from "react";
import styled from "styled-components";
import "./Challenger.css";
import { Route, Routes } from "react-router-dom";
import ChallengerNew from "./ChallengerNew";

/*-------------------박스 두개 중 첫 번째 상단 박스------------------*/
//현재 챌린저 상태 state
const StateBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 3.5rem;
  margin: 1.1rem 0 0 13.6rem;
  font-size: 1.8rem;
  font-family: KBO-Dia-Gothic;
  line-height: 150%;
  color: #131313;
`;

//첼린저 신청 차수
const MatchingNum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5.6rem;
  border-radius: 0.4rem;
  font-weight: 500;
  background-color: #014171;
  color: #e7e6ea;
`;

//매칭 결과
const MatchingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11.8rem;
  border-radius: 0.4rem;
  margin-left: 1rem;
  color: #131313;
  background-color: ${(props) => {
    if (props.statecolor == "미지원") return "#CECDD5";
    else if (props.statecolor == "지원 완료") return "#014171";
    else if (props.statecolor == "결과 대기중") return "#CCE6F9";
    else if (props.statecolor == "매칭 완료") return "red";
  }};
`;

/*-------------------필터 옵션 선택 칸------------------*/
//선택 박스
const SelectBox = styled.div`
  z-index: 1;
  position: relative;
  width: 10rem; //11.52-1.52
  padding: 1.08rem 0 1.08rem 1.52rem;
  border-radius: 0.5rem;
  background-color: #ffffff;
  margin-left: 28.6rem;
  align-self: center;
  cursor: pointer;
  color: #010004;

  &::before {
    content: "⌵";
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.5rem;
  }
`;

//현재 선택한 옵션 (최상단에 뜸)
const Label = styled.label`
  width: 6.784rem;
  height: 1.44rem;
  font-size: 1.2rem;
  font-weight: 300;
  text-align: center;
`;

//옵션 리스트 (해당 옵션들 나열)
const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  left: 0;
  padding: 0rem;
  overflow: hidden;
  height: 18rem;
  max-height: ${(props) => (props.show ? "none" : "0")};
  border-radius: 0.5rem;
  background-color: #fafafa;
  color: #010004;
  font-weight: 300;
  font-size: 1rem;
`;

//개개인 옵션 세팅
const Option = styled.li`
  transition: background-color 0.2s ease-in;
  font-size: 1.2rem;
  width: 8.48rem; //11.52-1.52*2
  border-top: 1px solid #6b6880;
  padding: 1rem 1.52rem;
  &:hover {
    background-color: #cecdd5;
  }
`;

//개개인 옵션 세팅 안에 컨텐츠
const OptionContents = styled.div`
  width: 6.784rem;
`;

const OptionBox = styled.div`
  display: flex;
`;

const StyledSVG = styled.svg`
  margin: 0.2rem -0.7rem 0 1.3rem;
  width: 1.4rem;
  height: 1.2rem;
`;
const FrameImg = () => (
  <StyledSVG
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
  >
    <g clipPath="url(#clip0_1516_3247)">
      <path
        d="M2.91663 6.99992L5.83329 9.91659L11.6666 4.08325"
        stroke="#0261AA"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1516_3247">
        <rect width="14" height="14" fill="white" />
      </clipPath>
    </defs>
  </StyledSVG>
);

/*-------------------화살 방향------------------*/
//화살 방향
const ArrowBtn = styled.div`
  margin: 0.5rem 0 0 4.2rem;
`;

//위 화살 방향
const DropUpArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="8"
    viewBox="0 0 18 10"
    fill="none"
  >
    <path d="M17 9L9 1L1 9" stroke="#9C9AAB" strokeLinecap="round" />
  </svg>
);

//아래 화살 방향
const DropDownArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="8"
    viewBox="0 0 18 10"
    fill="none"
  >
    <path d="M1 1L9 9L17 1" stroke="#9C9AAB" strokeLinecap="round" />
  </svg>
);

/*-------------------전에 매칭된 것들 여부 확인 디테일 박스------------------*/
//매칭 디테일
const MatchingDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 99.6rem;
  background-color: #45444d;
  border-radius: 0rem 0rem 0.8rem 0.8rem;
  font-size: 1.6rem;
  font-weight: 500;
  margin : -1.6rem 0 1.6rem 0; //container_main에서 아무리 margin-top을 해도 nth-child 적용이 안되어서 1.6rem을 여기서 빼기해줌 

`;

//매칭 디테일 리스트
const MatchingDetailList = styled.span`
  display: flex;
  height: 3.4rem;
  border-radius: 0.5rem;
  color: #fafafa;
  align-items: center;
  justify-content: center;
  margin: 0rem 0 1.1rem 3.2rem;
  padding: 0rem 1.6rem;
  &:nth-child(1) {
    margin-top: 1.2rem;
  }
  background-color: ${({ matchingTeam }) =>
    matchingTeam === "1"
      ? "#BE5B56"
      : matchingTeam === "2"
        ? "#70AD4E"
        : "#0261AA"};
`;

//탈부 버튼
const ExitBtn = styled.div`
  display: flex;
  margin: 1.1rem 2.4rem 1.6rem 90.5rem;
  width: 6.7rem;
  height: 3.6rem;
  font-size: 1.8rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.4rem;
  background-color: #d62117;
  color: #fafafa;
  cursor: pointer;
`;

const projectsDummy = [
  {
    id: 1,
    chapter: "2기",
    nickname: "도비",
    name: "김도연",
    position: "Design",
    generation: "3차",
    currentstate: "결과 대기중",
  },
  {
    id: 2,
    chapter: "5기",
    nickname: "신구",
    name: "오준영",
    position: "Web",
    generation: "3차",
    currentstate: "미지원",
  },
  {
    id: 3,
    chapter: "4기",
    nickname: "루나",
    name: "고라니",
    position: "Design",
    generation: "2차",
    currentstate: "지원 완료",
  },
  {
    id: 4,
    chapter: "5기",
    nickname: "코코아",
    name: "나현아기",
    position: "Server",
    generation: "1차",
    currentstate: "매칭 완료",
  },
  {
    id: 5,
    chapter: "5기",
    nickname: "리처드",
    name: "오수빈",
    position: "Web",
    generation: "1차",
    currentstate: "매칭 완료",
  },
  {
    id: 6,
    chapter: "5기",
    nickname: "하누",
    name: "정현우",
    position: "Web",
    generation: "2차",
    currentstate: "지원 완료",
  },
  {
    id: 7,
    chapter: "5기",
    nickname: "애옹",
    name: "이아영",
    position: "Desgin",
    generation: "3차",
    currentstate: "미지원",
  },
];

function ChallengerList() {
  const [showDetail, setShowDetail] = useState([]);
  const [arrowState, setArrowState] = useState([]);
  const [radiusState, setRadiusState] = useState([]);
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [currentValue, setCurrentValue] = useState("전체");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [infoboxData, setInfoboxData] = useState(projectsDummy);
  const optionList = [
    { num: 1, content: "전체" },
    { num: 2, content: "미지원" },
    { num: 3, content: "지원 완료" },
    { num: 4, content: "결과 대기중" },
    { num: 5, content: "매칭 완료" },
  ];

  const handleOnChangeOption = (num, content, index) => {
    setCurrentValue(content);
    setSelectedOptionIndex(index);
  };

  const handleDetail = (index) => {
    const updatedShowDetail = [...showDetail];
    updatedShowDetail[index] = !updatedShowDetail[index];
    setShowDetail(updatedShowDetail);
    setArrowState(updatedShowDetail);
    setRadiusState(updatedShowDetail);
  };

  const handleExit = (index) => {
    setInfoboxData((prevInfoboxData) =>
      prevInfoboxData.filter((_, i) => i !== index)
    );
    setShowDetail((prevShowDetail) =>
      prevShowDetail.map((_, i) => (i !== index ? false : false))
    );
    setArrowState((prevShowDetail) =>
      prevShowDetail.map((_, i) => (i !== index ? false : false))
    );
    setRadiusState((prevRadiusState) =>
      prevRadiusState.map((_, i) => (i !== index ? false : false))
    );
  };
  return (
    <div className="challenger_box">
      <div className="categorybox">
        <div className="categorylist">기수</div>
        <div className="categorylist">닉네임</div>
        <div className="categorylist">이름</div>
        <div className="categorylist">파트</div>
        <SelectBox onClick={() => setIsShowOptions((prev) => !prev)}>
          <Label>{currentValue}</Label>
          <SelectOptions show={isShowOptions}>
            {optionList.map((option, i) => (
              <Option
                onClick={() =>
                  handleOnChangeOption(option.num, option.content, i)
                }
                key={i}
              >
                <OptionBox>
                  <OptionContents>{option.content}</OptionContents>
                  {selectedOptionIndex === i && (
                    <StyledSVG>{FrameImg()}</StyledSVG>
                  )}
                </OptionBox>
              </Option>
            ))}
          </SelectOptions>
        </SelectBox>
      </div>
      <div className="box">
        <div className="box__container">
          {infoboxData.map(
            (infobox, index) =>
              (currentValue == "전체" ||
                currentValue == infobox.currentstate) && (
                <div key={infobox.id}>
                  <div
                    className="box__container_main"
                    onClick={() => handleDetail(index)}
                    style={{
                      cursor: "pointer",
                      borderRadius: radiusState[index]
                        ? "0.8rem 0.8rem 0rem 0rem"
                        : "0.8rem",
                    }}
                  >
                    <div key={index} className="box__container_list">
                      {infobox.chapter}
                    </div>
                    <div key={index} className="box__container_list">
                      {infobox.nickname}
                    </div>
                    <div key={index} className="box__container_list">
                      {infobox.name}
                    </div>
                    <div key={index} className="box__container_list">
                      {infobox.position}
                    </div>
                    <StateBox>
                      <MatchingNum>{infobox.generation}</MatchingNum>
                      <MatchingState statecolor={infobox.currentstate}>
                        {infobox.currentstate}
                      </MatchingState>
                      <ArrowBtn>
                        {arrowState[index] ? (
                          <DropUpArrow />
                        ) : (
                          <DropDownArrow />
                        )}
                      </ArrowBtn>
                    </StateBox>
                  </div>
                  {showDetail[index] && (
                    <MatchingDetailBox>
                      <MatchingDetailList>
                        1차 : Tape - 주위 사람들과 음악 취향을 공유하는 소셜
                        네트워크 서비스
                      </MatchingDetailList>
                      <MatchingDetailList>
                        3차 : Tape - 취향을 공유하는 소셜 네트워크 서비스
                      </MatchingDetailList>
                      <ExitBtn onClick={() => handleExit(index)}>탈부</ExitBtn>
                    </MatchingDetailBox>
                  )}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default function ChallengerManage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ChallengerList />} />
        <Route path="/manage" element={<ChallengerList />} />
        <Route path="/new" element={<ChallengerNew />} />
      </Routes>
    </div>
  );
}
