import React, { useState } from "react";
import styled from "styled-components";
import ReviewStar from "./ReviewStar";
import ReviewCardDetail from "./ReviewCardDetail";
import { reviewSaveAPI } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import useGetAccessToken from "../../utils/getAccessToken";

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

//해당 프로필 동그라미
const CardProfileImg = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 61.5rem;
  align-items: center;
  justify-content: center;
`;

const DefaultCardImg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="84"
    height="84"
    viewBox="0 0 84 84"
    fill="none"
  >
    <g clipPath="url(#clip0_2734_5309)">
      <path
        d="M14 74V65.6667C14 61.2464 15.9667 57.0072 19.4673 53.8816C22.968 50.756 27.716 49 32.6667 49H51.3333C56.284 49 61.032 50.756 64.5327 53.8816C68.0333 57.0072 70 61.2464 70 65.6667V74M28 24.5C28 28.213 29.475 31.774 32.1005 34.3995C34.726 37.025 38.287 38.5 42 38.5C45.713 38.5 49.274 37.025 51.8995 34.3995C54.525 31.774 56 28.213 56 24.5C56 20.787 54.525 17.226 51.8995 14.6005C49.274 11.975 45.713 10.5 42 10.5C38.287 10.5 34.726 11.975 32.1005 14.6005C29.475 17.226 28 20.787 28 24.5Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2734_5309">
        <rect width="84" height="84" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
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
  margin: 0 0.4rem 0 0;
  font-size: 2rem;
  line-height: 150%;
`;

//카드 디테일(파트)
const CardDetailPart = styled.div`
  margin: 0.5rem 0.4rem 0 0;
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

//파트들 정의
const PartsDummy = [
  { num: 1, content: "DESIGN", display: "Design" },
  { num: 2, content: "ANDROID", display: "Android" },
  { num: 3, content: "IOS", display: "iOS" },
  { num: 4, content: "WEB", display: "Web" },
  { num: 5, content: "SPRINGBOOT", display: "Spring" },
  { num: 6, content: "NODEJS", display: "Node.js" },
];
export default function ReviewCard({ list, setDataList }) {
  const dispatch = useDispatch();
  const accessToken = useGetAccessToken();
  const { autoLogin } = useSelector((state) => state.userInfo);

  const [isReviewMode, setisReviewMode] = useState(false);

  //상호평가 들어가기
  const handleReview = () => {
    setisReviewMode(!isReviewMode);
  };

  //상호 평가 저장
  const handleSaveReview = (list) => {
    setisReviewMode(!isReviewMode);
    const updatedList = {
      rate: list.rate,
      content: list.content,
    };
    console.log(list.memberId);
    console.log(updatedList);
    reviewSaveAPI(
      accessToken,
      dispatch,
      autoLogin,
      list.memberId,
      updatedList
    ).then((response) => {
      if (response.isSuccess) {
        console.log("상호 평가 저장 성공");
      } else {
        alert(response.message);
      }
    });
  };

  return (
    <>
      {isReviewMode ? (
        <ReviewCardDetail
          list={list}
          handleSaveReview={handleSaveReview}
          setDataList={setDataList}
          DefaultCardImg={DefaultCardImg}
          PartsDummy={PartsDummy}
        />
      ) : (
        <CardContainer onClick={() => handleReview()}>
          <CardProfileImgContainer>
            <CardProfileImg
              style={{
                backgroundImage: `url(${list.profileImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            >
              {list.profileImage ? null : <DefaultCardImg />}
            </CardProfileImg>
          </CardProfileImgContainer>
          <CardRightContainer>
            <CardDetailContainer>
              <CardDetailName>
                {list.nameNickname.split("/")[0].trim()} /{" "}
                {list.nameNickname.split("/")[1].trim()}
              </CardDetailName>
              <CardDetailPart>
                {PartsDummy.map((part) => {
                  if (list.memberPart === part.content) {
                    return part.display;
                  }
                  return null; // 조건을 만족하지 않는 경우 null 반환
                })}
              </CardDetailPart>
              <CardDetailSchool>{list.university}</CardDetailSchool>
            </CardDetailContainer>
            <CardStarContainer>
              <ReviewStar list={list} editOn={false} />
            </CardStarContainer>
          </CardRightContainer>
        </CardContainer>
      )}
    </>
  );
}
