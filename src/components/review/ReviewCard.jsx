import React, { useState } from "react";
import styled from "styled-components";
import ReviewStar from "./ReviewStar";
import ReviewCardDetail from "./ReviewCardDetail";
import mythus from "../../images/mythus.webp";
//카드 전체 컨테이너
const CardContainer = styled.div`
  display: flex;
  width: 38.4rem;
  height: 22rem;
  border-radius: 1rem;
  background: #28272d;
  cursor: pointer;
  color: #fafafa;
  font-weight: 500;
  transition:
    background-color 0.3s,
    opacity 0.3s;

  &:hover {
    background-color: #e7e6eacc;
    opacity: 0.8;
  }
  position: relative;

  &::before {
    content: "평가하기";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3.4rem;
    font-weight: 700;
    color: #131313;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover::before {
    opacity: 1;
  }
`;

//카드 이미지 컨테이너
const CardProfileImgContainer = styled.div`
  display: flex;
  width: 12.3rem;
  height: 12.3rem;
  background-color: #d9d9d9;
  border-radius: 61.5rem;
  margin: 4.8rem 0 4.9rem 3.2rem;
`;

//카드 이미지 출력
const CardProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 61.5rem;
`;

//카드 우측 컨테이너
const CardRightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

//카드 디테일 컨테이너
const CardDetailContainer = styled.div`
  display: flex;
  height: 9.35rem;
  width: 15.1rem;
  border-bottom: 0.1rem solid #6b6880;
  align-items: end;
  margin: 5.05rem 0 0 4.4rem;
  flex-direction: column;
`;

//카드 디테일(닉네임,이름)
const CardDetailName = styled.div`
  margin: 0 0.5rem 0 0;
  font-size: 2rem;
  line-height: 150%;
`;

//카드 디테일(파트)
const CardDetailPart = styled.div`
  margin: 0.5rem 0.5rem 0 0;
  font-size: 1.4rem;
`;

//카드 디테일(학교)
const CardDetailSchool = styled.div`
  margin: 0.5rem 0.5rem 0 0;
  font-size: 1rem;
  font-weight: 300;
`;

//리뷰 컨테이너
const CardStarContainer = styled.div`
  margin: 1.25rem 0 0 11.2rem;
`;

export default function ReviewCard({ list, setDataList }) {
  const [isReviewMode, setisReviewMode] = useState(false);

  const handleReview = () => {
    setisReviewMode(!isReviewMode);
  };
  return (
    <>
      {isReviewMode ? (
        <ReviewCardDetail
          list={list}
          handleReview={handleReview}
          setDataList={setDataList}
        />
      ) : (
        <CardContainer onClick={handleReview}>
          <CardProfileImgContainer>
            <CardProfileImg src={mythus}
              alt="mythus"/>
          </CardProfileImgContainer>
          <CardRightContainer>
            <CardDetailContainer>
              <CardDetailName>
                {list.nickname} / {list.name}
              </CardDetailName>
              <CardDetailPart>{list.part}</CardDetailPart>
              <CardDetailSchool>{list.school}</CardDetailSchool>
            </CardDetailContainer>
            <CardStarContainer>
              <ReviewStar reviewstar={list.reviewstar} editOn={false} />
            </CardStarContainer>
          </CardRightContainer>
        </CardContainer>
      )}
    </>
  );
}
