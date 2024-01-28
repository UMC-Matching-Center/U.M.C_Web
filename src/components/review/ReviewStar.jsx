import React from "react";
import styled from "styled-components";

//스타 클릭할때 pointer 넣어주기
const StyledSpan = styled.span`
  cursor: pointer;
`;

// 해당 Star 커스텀마이징
const ReviewStarSVG = styled.svg`
  margin-right: 0.4rem;
`;

//차있는 Star
const ReviewStarFilled = () => (
  <ReviewStarSVG
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="13"
    viewBox="0 0 12 13"
    fill="none"
  >
    <path
      d="M4.12163 4.16996L0.931627 4.63246L0.875127 4.64396C0.789597 4.66667 0.711625 4.71167 0.649173 4.77436C0.586722 4.83706 0.542029 4.91521 0.519658 5.00082C0.497288 5.08644 0.498041 5.17647 0.521841 5.2617C0.545641 5.34693 0.591635 5.42432 0.655127 5.48596L2.96613 7.73546L2.42113 10.913L2.41463 10.968C2.40939 11.0564 2.42776 11.1447 2.46785 11.2237C2.50794 11.3027 2.56832 11.3697 2.64279 11.4177C2.71727 11.4657 2.80317 11.4931 2.8917 11.497C2.98023 11.5009 3.06821 11.4812 3.14663 11.44L5.99963 9.93996L8.84613 11.44L8.89613 11.463C8.97866 11.4955 9.06835 11.5054 9.156 11.4918C9.24366 11.4782 9.32612 11.4416 9.39492 11.3856C9.46373 11.3296 9.5164 11.2563 9.54754 11.1733C9.57868 11.0902 9.58717 11.0004 9.57213 10.913L9.02663 7.73546L11.3386 5.48546L11.3776 5.44296C11.4333 5.37435 11.4699 5.29219 11.4835 5.20486C11.4971 5.11753 11.4873 5.02815 11.4552 4.94583C11.423 4.8635 11.3696 4.79118 11.3004 4.73622C11.2312 4.68126 11.1486 4.64563 11.0611 4.63296L7.87113 4.16996L6.44513 1.27996C6.40386 1.19623 6.33999 1.12572 6.26072 1.07641C6.18146 1.02711 6.08997 1.00098 5.99663 1.00098C5.90328 1.00098 5.8118 1.02711 5.73253 1.07641C5.65327 1.12572 5.58939 1.19623 5.54813 1.27996L4.12163 4.16996Z"
      fill="#FFB042"
    />
  </ReviewStarSVG>
);

//비어있는 Star
const ReviewStarNotFilled = () => (
  <ReviewStarSVG
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="13"
    viewBox="0 0 12 13"
    fill="none"
  >
    <g clipPath="url(#clip0_2497_5922)">
      <path
        d="M6.00004 9.37498L2.91404 10.9975L3.50354 7.56098L1.00354 5.12748L4.45354 4.62748L5.99654 1.50098L7.53954 4.62748L10.9895 5.12748L8.48954 7.56098L9.07904 10.9975L6.00004 9.37498Z"
        stroke="#FFB042"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2497_5922">
        <rect
          width="12"
          height="12"
          fill="white"
          transform="translate(0 0.5)"
        />
      </clipPath>
    </defs>
  </ReviewStarSVG>
);

//0.5 Star
const ReviewStarHalfFilled = () => (
  <ReviewStarSVG
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="13"
    viewBox="0 0 12 13"
    fill="none"
  >
    <g clipPath="url(#clip0_2497_5916)">
      <path
        d="M5.99995 1.00017C6.08146 1.00048 6.16163 1.02085 6.23339 1.05948C6.30516 1.09811 6.36631 1.15382 6.41145 1.22167L6.44495 1.27967L7.87095 4.17018L11.061 4.63268C11.4315 4.68668 11.601 5.10267 11.4125 5.39568L11.3775 5.44317L11.3385 5.48618L9.02645 7.73567L9.57145 10.9132C9.58565 10.9961 9.57874 11.0812 9.55134 11.1607C9.52395 11.2402 9.47697 11.3115 9.41474 11.3681C9.3525 11.4246 9.27702 11.4646 9.19526 11.4843C9.11351 11.504 9.02811 11.5027 8.94695 11.4807L8.89645 11.4632L8.84595 11.4402L5.99945 9.94017L3.14645 11.4402C3.09395 11.4677 3.04045 11.4852 2.98645 11.4932L2.93345 11.4982C2.86367 11.5007 2.79412 11.4887 2.72927 11.4628C2.66441 11.4369 2.60567 11.3978 2.55681 11.3479C2.50795 11.298 2.47006 11.2384 2.44554 11.1731C2.42103 11.1077 2.41044 11.0379 2.41445 10.9682L2.42095 10.9132L2.96595 7.73567L0.654455 5.48567C0.594681 5.42745 0.550412 5.35521 0.525675 5.27552C0.500937 5.19583 0.496516 5.11122 0.512813 5.02939C0.529111 4.94755 0.565609 4.87109 0.618989 4.80696C0.672369 4.74282 0.740937 4.69305 0.818455 4.66218L0.874955 4.64418L0.931955 4.63268L4.12145 4.17018L5.54795 1.28017C5.58774 1.19448 5.65174 1.1223 5.73206 1.07255C5.81238 1.02279 5.90551 0.997635 5.99995 1.00017ZM5.99995 2.63718V8.87517C6.04023 8.87518 6.08035 8.88005 6.11945 8.88967L6.17695 8.90768L6.23295 8.93267L8.41445 10.0822L7.99645 7.64568C7.97585 7.52526 8.00004 7.40147 8.06445 7.29768L8.09945 7.24818L8.14045 7.20318L9.91345 5.47668L7.46795 5.12267C7.34708 5.10513 7.23681 5.04395 7.15795 4.95068L7.12145 4.90217L7.09145 4.84917L5.99995 2.63718Z"
        fill="#FFB042"
      />
    </g>
    <defs>
      <clipPath id="clip0_2497_5916">
        <rect
          width="12"
          height="12"
          fill="white"
          transform="translate(0 0.5)"
        />
      </clipPath>
    </defs>
  </ReviewStarSVG>
);

export default function ReviewStar({ list, reviewstar, editOn, setDataList }) {
  // 해당 star를 클릭할 때 해당 star 값에 값을 넣어줌
  const handleStar = (index, event) => {
    if (event && event.clientX) {
      const clickX = event.clientX;
      const starWidth = 12; // ReviewStarSVG의 너비를 12로 가정

      const isLeftClick =
        clickX - event.currentTarget.getBoundingClientRect().left <
        starWidth / 2;

      setDataList((prevList) => {
        const updatedList = prevList.map((item) => {
          if (item.id === list.id) {
            // 좌클릭일 때 0.5를 더하고, 우클릭일 때는 1을 더합니다.
            const newReviewStar = isLeftClick ? index - 0.5 : index;

            return { ...item, reviewstar: newReviewStar };
          }
          return item;
        });
        return updatedList;
      });
    }
  };

  const reviewStarHead = Math.floor(reviewstar); //4.5점일 때, 4점을 뜻함.
  const reviewStarTail = reviewstar % 1; //4.5점일 때, 0.5점을 뜻함

  //해당 Edit상태가 ON일때
  const editStars = Array.from({ length: 5 }, (_, index) => {
    const adjustedIndex = index + 1; // index를 1부터 시작하도록 수정

    return (
      <StyledSpan
        key={index}
        onClick={(event) => handleStar(adjustedIndex, event)} // 마우스 클릭 시 해당 위치에 있는 값 부여하기
      >
        {
          adjustedIndex <= reviewStarHead ? (
            <ReviewStarFilled /> // 다 채운 star
          ) : adjustedIndex === reviewStarHead + 1 && reviewStarTail === 0.5 ? (
            <ReviewStarHalfFilled /> // 반만 채운 star, isHoveringOut이 true일 때 같이 작동
          ) : (
            <ReviewStarNotFilled />
          ) // 안 채워진 star
        }
      </StyledSpan>
    );
  });

  //해당 Edit상태가 OFF일때
  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index + 1 <= reviewStarHead) {
      return <ReviewStarFilled key={index} />;
    } else if (index + 1 == reviewStarHead + 1 && reviewStarTail == 0.5) {
      return <ReviewStarHalfFilled key={index} />;
    } else {
      return <ReviewStarNotFilled key={index} />;
    }
  });

  return <div>{editOn ? editStars : stars}</div>;
}
