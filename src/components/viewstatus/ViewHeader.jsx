import React from "react";
import styled from "styled-components";

//헤더 총 컨테이너
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

//텍스트 큰박스
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  margin-right: 4.2rem;
  justify-content: center;
  align-items: center;
  &:last-child {
    margin: 0;
  }
`;

//숫자 들어가는 헤더 텍스트 박스
const HeaderTextBox = styled.div`
  display: flex;
  height: 5.1rem;
  line-height: 150%;
  justify-content: center;
  align-items: center;
`;

//숫자 들어가는 것중에 큰 숫자
const HeaderTextBig = styled.div`
  font-size: 3.4rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;

//숫자 들어가는 것중에 작은 숫자
const HeaderTextSmall = styled.div`
  display: flex;
  padding: 1.2rem 0 0 0.4rem;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;

  color: #6b6880;
`;

//헤더 작은 텍스트
const HeaderTextSmallText = styled.div`
  padding: 0.1rem 0 0 0.4rem;
`;

//하단에 인원 및 경쟁률을 출력하는 바디텍스트
const BodyText = styled.div`
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 300;
  color: #6b6880;
`;

// | 헤더 바
const HeaderBar = styled.div`
  width: 0.1rem;
  height: 7.3rem;
  background-color: #9c9aab;
  margin-right: 4.2rem;
  &:nth-child(2) {
    margin-right: 5.9rem;
  }
`;

//옵션 리스트
const OptionList = [
  { num: 1, content: "DESIGN", display: "디자이너 매칭 인원" },
  { num: 2, content: "ANDROID", display: "Android 매칭 인원" },
  { num: 3, content: "IOS", display: "iOS 매칭 인원" },
  { num: 4, content: "WEB", display: "Web 매칭 인원" },
  { num: 5, content: "SPRINGBOOT", display: "Spring 매칭 인원" },
  { num: 6, content: "NODEJS", display: "Node.js 매칭 인원" },
];

export default function ViewHeader({
  totalMatchingDTO,
  partMatchingDTO,
  competitionRate,
}) {
  return (
    <HeaderContainer>
      <TextBox>
        <HeaderTextBox>
          <HeaderTextBig>{totalMatchingDTO.nowMatchingNum}</HeaderTextBig>
          <HeaderTextSmall>
            /
            <HeaderTextSmallText>
              {totalMatchingDTO.totalMatchingNum}
            </HeaderTextSmallText>
          </HeaderTextSmall>
        </HeaderTextBox>
        <BodyText>현재 매칭 인원</BodyText>
      </TextBox>
      <HeaderBar />
      {OptionList.map((option) => {
        const filteredPart = partMatchingDTO.filter(
          (parts) => parts.part === option.content
        );
        return (
          filteredPart.length > 0 && (
            <React.Fragment key={option.num}>
              <TextBox>
                <HeaderTextBox>
                  <HeaderTextBig>{filteredPart[0].matchingNum}</HeaderTextBig>
                  <HeaderTextSmall>
                    /
                    <HeaderTextSmallText>
                      {filteredPart[0].totalNum}
                    </HeaderTextSmallText>
                  </HeaderTextSmall>
                </HeaderTextBox>
                <BodyText>{option.display}</BodyText>
              </TextBox>
            </React.Fragment>
          )
        );
      })}
      <HeaderBar />
      <TextBox>
        <HeaderTextBox>
          <HeaderTextBig>{competitionRate}</HeaderTextBig>
          <HeaderTextSmall>: 1</HeaderTextSmall>
        </HeaderTextBox>
        <BodyText>지원 경쟁률 </BodyText>
      </TextBox>
    </HeaderContainer>
  );
}
