import React, { useState } from "react";
import styled from "styled-components";

/*-------------------필터 옵션 선택 칸------------------*/
//선택 박스
const SelectBox = styled.div`
  z-index: 1;
  position: relative;
  width: 10rem; //11.52-1.52
  padding: 1.08rem 0 1.08rem 1.52rem;
  border-radius: 0.5rem;
  background-color: #ffffff;
  margin: -1.4rem 0 0 76.1rem;
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
  left: -0.1rem;
  padding: 0rem;
  overflow: hidden;
  max-height: ${(props) => (props.show ? "none" : "0")};
  border-radius: 0.5rem;
  border: ${(props) => (props.show ? "0.1rem solid #6b6880" : "none")};
  background-color: #fafafa;
  color: #010004;
  font-size: 1rem;
`;

//개개인 옵션 세팅
const Option = styled.li`
  transition: background-color 0.2s ease-in;
  font-size: 1.2rem;
  font-weight: 300;
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
  margin: 0rem -0.7rem 0 0.8rem;
  width: 1.4rem;
  height: 1.2rem;
`;

//체크 표시 이미지
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

export default function ViewSelect({ setSelectedOptionIndex }) {
  const [isShowOptions, setIsShowOptions] = useState(false); //보여주는 옵션들
  const [currentValue, setCurrentValue] = useState("전체보기"); //현재 옵션
  const [isCompareOptions, setIsCompareOptions] = useState(false); //비교해서 처리하는 옵션

  const optionList = [
    { num: 1, content: "전체보기" },
    { num: 2, content: "Design" },
    { num: 3, content: "Android" },
    { num: 4, content: "iOS" },
    { num: 5, content: "Web" },
    { num: 6, content: "Spring Boot" },
    { num: 7, content: "Node.js" },
  ];

  //옵션 선택하면 그 값에 따라 변경되도록 설정
  const handleOnChangeOption = (content, index) => {
    setCurrentValue(content);
    setSelectedOptionIndex(content);
    setIsCompareOptions(index);
  };

  return (
    <SelectBox onClick={() => setIsShowOptions((prev) => !prev)}>
      <Label>{currentValue}</Label>
      <SelectOptions show={isShowOptions}>
        {optionList.map((option, i) => (
          <Option
            onClick={() => handleOnChangeOption(option.content, i)}
            key={i}
          >
            <OptionBox>
              <OptionContents>{option.content}</OptionContents>
              {isCompareOptions === i && <StyledSVG>{FrameImg()}</StyledSVG>}
            </OptionBox>
          </Option>
        ))}
      </SelectOptions>
    </SelectBox>
  );
}
