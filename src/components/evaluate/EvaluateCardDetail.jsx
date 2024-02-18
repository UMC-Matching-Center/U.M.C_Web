import React from "react";
import styled from "styled-components";
import EvaluateStar from "./EvaluateStar";
import "./Evaluate.css";

//해당 IMG 컨테이너
const ImgContainer = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 15rem;
  background-color: #d9d9d9;
`;

//해당 프로필 동그라미
const ProfileImg = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 61.5rem;
  justify-content: center;
  align-items: center;
`;
//파트, 이름, 닉네임 넣는 칸
const HeadTitle = styled.div`
  margin: 0.4rem 0 0 1rem;
`;

//별 컨테이너
const EvaluateContainer = styled.div`
  position: absolute;
  margin: 0.7rem 0 0 21rem;
`;

//체크 표시 컨테이너
const CheckSVGContainer = styled.div`
  position: absolute;
  margin: 0.7rem 0 0 30.2rem;
  cursor: pointer;
  transition: stroke 0.8s;

  &:hover {
    & svg path {
      stroke: green; // 원하는 색상으로 변경
    }
  }
`;

//체크 SVG
const CheckSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <g clipPath="url(#clip0_2515_8710)">
      <path
        d="M3 8L7.5 12.75L15 5.25"
        stroke="#D9D9D9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2515_8710">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

//평가하는 입력칸
const TextBox = styled.textarea`
  width: 31.2rem; //32.1 - 0.9 = 31.2
  height: 13rem;
  border: 0.1rem solid #9c9aab;
  resize: none;
  margin: 0.8rem 0 0 2.4rem;
  font-family: KBO-Dia-Gothic;
  font-size: 1rem;
  font-weight: 300;
  padding: 0.4rem 0 0 0.9rem;

  &::placeholder {
    color: #cecdd5;
  }
  &:focus {
    outline: none;
  }
`;

export default function EvaluateCardDetail({
  list,
  handleSaveEvaluate,
  setDataList,
  DefaultCardImg,
  PartsDummy,
}) {
  const handleText = (e) => {
    setDataList((prevList) => {
      const updatedList = prevList.map((item) => {
        if (item.memberId === list.memberId) {
          return { ...item, content: e.target.value };
        }
        return item;
      });
      return updatedList;
    });
  };

  return (
    <div className="evaluate-container">
      <div className="evaluate-detail-container">
        <div className="evaluate-head-container">
          <ImgContainer>
            <ProfileImg
              style={{
                backgroundImage: `url(${list.profileImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            >
              {list.profileImage ? null : <DefaultCardImg />}
            </ProfileImg>
          </ImgContainer>
          <HeadTitle>
            {PartsDummy.map((part) => {
              if (list.memberPart === part.content) {
                return part.display;
              }
              return null; // 조건을 만족하지 않는 경우 null 반환
            })}
          </HeadTitle>
          <HeadTitle style={{ marginTop: "0.3rem" }}>
            {list.nameNickname.split("/")[0].trim()} /{" "}
            {list.nameNickname.split("/")[1].trim()}
          </HeadTitle>
          <EvaluateContainer>
            <EvaluateStar list={list} editOn={true} setDataList={setDataList} />
          </EvaluateContainer>
          <CheckSVGContainer onClick={() => handleSaveEvaluate(list)}>
            <CheckSVG />
          </CheckSVGContainer>
        </div>
        <TextBox
          placeholder="평가를 작성해주세요"
          value={list.content}
          onChange={handleText}
        />
      </div>
    </div>
  );
}
