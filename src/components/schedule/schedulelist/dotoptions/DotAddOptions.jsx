import React, { useState } from "react";
import styled from "styled-components";

/*-------------------필터 옵션 선택 칸------------------*/
//선택 박스
const SelectBox = styled.div`
  z-index: 1;
  position: relative;
  width: 4.5rem;
  height: 2.7rem;
  background-color: #02010b;
  align-self: center;
  cursor: pointer;
  color: #010004;
  border: 1px solid #fafafa;
  &::before {
    color: #fafafa;
    content: "⌵";
    position: absolute;
    right: 0.65rem;
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
  padding: 0rem;
  overflow: hidden;
  left: -0.1rem;
  top: 1.2rem;
  max-height: 26.1rem;
  max-height: ${(props) => (props.$show ? "none" : "0")};
  background-color: #fafafa;
  color: #010004;
`;

//개개인 옵션 세팅
const Option = styled.li`
  transition: background-color 0.2s ease-in;
  font-size: 1.2rem;
  background-color: #02010b;
  border: 0.1rem solid #6b6880;
  border-top: none;
  &:first-child {
    border: 0.1rem solid #6b6880;
  }

  &:hover {
    background-color: #6b6880;
  }
`;

//개개인 옵션 세팅 안에 컨텐츠
const OptionContents = styled.div`
  width: 2.6rem;
  height: 2.7rem;
`;
//해당 옵션 박스
const OptionBox = styled.div`
  display: flex;
`;

// 해당 닷 스타일링
const StyledSVG = styled.svg`
  margin: 0.5rem 0 0 0.4rem;
  width: 1.5rem;
  height: 1.5rem;
`;

//틱 마크 스타일링
const StyledFrameImg = styled.svg`
  width: 1.4rem;
  height: 1.4rem;
  margin: 0.6rem 0.5rem 0 0;
`;
const FrameImg = () => (
  <StyledFrameImg
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
  </StyledFrameImg>
);

export default function DotAddOptions({
  colorOptionList,
  handleColorChange,
  formData,
}) {
  //색깔 정하기
  const [isShowOptions, setIsShowOptions] = useState(false);

  // DotOptions 배열 구성
  const DotOptions = colorOptionList.map((option) => ({
    value: option.value,
    content: (
      <StyledSVG>
        <circle cx="7.5" cy="7.5" r="7.5" fill={option.value} />
      </StyledSVG>
    ),
  }));
  return (
    <SelectBox onClick={() => setIsShowOptions((prev) => !prev)}>
      <Label>
        {
          <StyledSVG>
            <circle cx="7.5" cy="7.5" r="7.5" fill={formData.scheduleColor} />
          </StyledSVG>
        }
      </Label>
      <SelectOptions $show={isShowOptions}>
        {DotOptions.map((option) => (
          <Option
            onClick={() => handleColorChange(option.value)}
            key={option.value}
            style={option.value === formData.scheduleColor ? { backgroundColor: "#FAFAFA" } : {}}
            >
            <OptionBox>
              <OptionContents>{option.content}</OptionContents>
              {option.value == formData.scheduleColor && (
                <StyledFrameImg>{FrameImg()}</StyledFrameImg>
              )}
            </OptionBox>
          </Option>
        ))}
      </SelectOptions>
    </SelectBox>
  );
}
