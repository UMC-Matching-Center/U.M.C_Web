import React from "react";
import styled from "styled-components";
import ReviewStar from "./ReviewStar";

import mythus from "../../images/mythus.webp";

//카드 컨테이너
const Container = styled.div`
  display: flex;
  width: 38.4rem;
  height: 22rem;
  border-radius: 1rem;
  background-color: #28272d;
`;

//카드 하얀색 디테일 컨테이너
const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 36.8rem;
  height: 20.6rem;
  border-radius: 0.8rem;
  background-color: #fafafa;
  margin: 0.7rem 0.8rem;
`;

//헤드 컨테이너
const HeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1.8rem 0 0 2.5rem;
  font-weight: 500;
  font-size: 1.4rem;
`;

//해당 IMG 컨테이너
const ImgContainer = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 15rem;
  background-color: #d9d9d9;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 61.5rem;
`;
//파트, 이름, 닉네임 넣는 칸
const HeadTitle = styled.div`
  margin: 0.4rem 0 0 1rem;
`;

//별 컨테이너
const ReviewContainer = styled.div`
  margin: 0.7rem 0 0 1rem;
`;

//체크 표시 컨테이너
const CheckSVGContainer = styled.div`
  position: absolute;
  margin: 0.7rem 0 0 30.2rem;
  cursor: pointer;
  transition: stroke 0.8s;

  &:hover {
    & svg path {
      stroke: black; // 원하는 색상으로 변경
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

export default function ReviewCardDetail({ list, handleReview, setDataList }) {
  const handleText = (e) => {
    setDataList((prevList) => {
      const updatedList = prevList.map((item) => {
        if (item.id === list.id) {
          return { ...item, text: e.target.value };
        }
        return item;
      });
      return updatedList;
    });
  };
  return (
    <Container>
      <DetailContainer>
        <HeadContainer>
          <ImgContainer>
            <ProfileImg src={mythus} alt="mythus" />
          </ImgContainer>
          <HeadTitle>{list.part}</HeadTitle>
          <HeadTitle>
            {list.nickname} / {list.name}
          </HeadTitle>
          <ReviewContainer>
            <ReviewStar
              list={list}
              reviewstar={list.reviewstar}
              editOn={true}
              setDataList={setDataList}
            />
          </ReviewContainer>
          <CheckSVGContainer onClick={handleReview}>
            <CheckSVG />
          </CheckSVGContainer>
        </HeadContainer>
        <TextBox
          placeholder="평가를 작성해주세요"
          value={list.text}
          onChange={handleText}
        />
      </DetailContainer>
    </Container>
  );
}
