import React from "react";
import styled from "styled-components";

//모든 박스 틀
const MonthBox = styled.div`
  display: flex;
  width: 40rem;
  height: 12.4rem;
  line-height: 150%;
  justify-content: center;
  align-items: center;
  margin: 0rem 0 0 52.3rem; //나중에 수정해야함 margintop
`;

//현재 달
const CurrentMonthBox = styled.span`
  display: flex;
  font-size: 5rem;
  font-weight: 700;
  width : 12.4rem;
  justify-content: center;
`;

//다른 달
const OtherMonthBox = styled.span`
  display: flex;
  font-size: 2.4rem;
  font-weight: 500;
  width: 5.3rem;
  justify-content: center;
`;

const StyledArrow = styled.svg`
  cursor: pointer;
`;

const Arrow = styled.div`
  display: flex;  
  width: 3.6rem;
  height: 3.6rem;
  margin: 0 2.3rem 0 2.3rem;
  justify-content: center;

`;
// 왼쪽 화살표
const BeforeMonthArrow = () => (
  <StyledArrow
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
  >
    <g clipPath="url(#clip0_1653_7120)">
      <path
        d="M21 9L12 18L21 27V9Z"
        stroke="#E7E6EA"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1653_7120">
        <rect width="36" height="36" fill="white" />
      </clipPath>
    </defs>
  </StyledArrow>
);

// 오른쪽 화살표
const AfterMonthArrow = () => (
  <StyledArrow
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
  >
    <g clipPath="url(#clip0_1653_7117)">
      <path
        d="M15 27L24 18L15 9V27Z"
        stroke="#E7E6EA"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1653_7117">
        <rect width="36" height="36" fill="white" />
      </clipPath>
    </defs>
  </StyledArrow>
);
const Months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];


export default function ScheduleMonth({ currentMonthIndex, handleBeforeMonth, handleAfterMonth}) {
  const currentMonth = Months[currentMonthIndex]; //현재 달
  const beforeMonth = Months[(currentMonthIndex - 1 + 12) % 12]; //저번 달
  const afterMonth = Months[(currentMonthIndex + 1) % 12]; //다음 달
  return (
    <MonthBox>
      <OtherMonthBox>{beforeMonth}</OtherMonthBox>
      <Arrow onClick={handleBeforeMonth}>
        <BeforeMonthArrow />
      </Arrow>
      <CurrentMonthBox>{currentMonth}</CurrentMonthBox>
      <Arrow onClick={handleAfterMonth}>
        <AfterMonthArrow />
      </Arrow>
      <OtherMonthBox>{afterMonth}</OtherMonthBox>
    </MonthBox>
  );
}
