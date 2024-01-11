import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./Challenger.css";

//현재 챌린저 상태 state
const ChallengerStateBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 3.5rem;
  margin: 1.1rem 0 0 24.4rem;
  font-size: 1.6rem;
  line-height: 150%;
`;

//수락 및 거절
const ChallengerMatchingBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5.9rem;
  border-radius: 0.4rem;
  font-weight: 500;
  color: #fafafa;
  cursor: pointer;
  &:nth-child(1) {
    background-color: #0281e2;
  }
  &:nth-child(2) {
    background-color: #d62117;
    margin-left: 1rem;
  }
`;

//수락이나 거절할게 없을 시
const NoApplicantsMessage = styled.div`
  font-size: 2rem;
  margin-top: 1rem;
  color: #e7e6ea;
`;
const projectsDummy = [
  {
    id: 1,
    chapter: "2기",
    nickname: "도비",
    name: "김도연",
    position: "Design",
  },
  {
    id: 2,
    chapter: "5기",
    nickname: "신구",
    name: "오준영",
    position: "Web",
  },
  {
    id: 3,
    chapter: "4기",
    nickname: "루나",
    name: "고라니",
    position: "Design",
  },
  {
    id: 4,
    chapter: "5기",
    nickname: "코코아",
    name: "나현아기",
    position: "Server",
  },
];

export default function ChallengerNew() {
  const [allButtonsClicked, setAllButtonsClicked] = useState(false);
  const [infoboxData, setInfoboxData] = useState(projectsDummy);

  const handleAccept = (index) => {
    setInfoboxData((prevInfoboxData) =>
      prevInfoboxData.filter((_, i) => i !== index)
    );
  };

  const handleDecline = (index) => {
    setInfoboxData((prevInfoboxData) =>
      prevInfoboxData.filter((_, i) => i !== index)
    );
  };

  useEffect(() => {
    const allClicked = infoboxData.length === 0;
    setAllButtonsClicked(allClicked);
  }, [infoboxData]);

  return (
    <div className="challenger_box">
      <div className="categorybox">
        <div className="categorylist">기수</div>
        <div className="categorylist">닉네임</div>
        <div className="categorylist">이름</div>
        <div className="categorylist">파트</div>
        <div className="categorylist" style={{ marginLeft: "26.2rem" }}>
          선택
        </div>
      </div>
      <div className="box">
      <div className="box__container">
        {infoboxData.map((infobox, index) => (
          <div key={index} className="box__container_main">
            <div className="box__container_list">{infobox.chapter}</div>
            <div className="box__container_list">{infobox.nickname}</div>
            <div className="box__container_list">{infobox.name}</div>
            <div className="box__container_list">{infobox.position}</div>
            <ChallengerStateBox>
              <ChallengerMatchingBtn onClick={() => handleAccept(index)}>
                수락
              </ChallengerMatchingBtn>
              <ChallengerMatchingBtn onClick={() => handleDecline(index)}>
                거절
              </ChallengerMatchingBtn>
            </ChallengerStateBox>
          </div>
        ))}
        {allButtonsClicked && (
          <NoApplicantsMessage>
            {" "}
            죄송합니다. 신청한 인원이 없습니다. 나중에 다시 확인해주세요.
          </NoApplicantsMessage>
        )}
      </div>
    </div>
    </div>
  );
}
