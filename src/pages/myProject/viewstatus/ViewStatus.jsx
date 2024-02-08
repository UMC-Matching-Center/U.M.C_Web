import React, { useState } from "react";
import styled from "styled-components";
import ViewHeader from "../../../components/viewstatus/ViewHeader";
import ViewBody from "../../../components/viewstatus/ViewBody";
import ViewSelect from "../../../components/viewstatus/ViewSelect";

//총 컨테이너
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #fafafa;
  font-family: KBO-Dia-Gothic;
`;

//헤더 컨테이너
const HeadContainer = styled.div`
  display: flex;
  width: 99.2rem;
  height: 16.9rem;
  border-radius: 1rem;
  background-color: #fafafa;
  color: #fafafa;
  justify-content: center;
`;

//지원자 보기 헤더
const ApplicantHeader = styled.div`
  margin-top: 8.6rem;
  height: 6rem;
  width: 99.2rem;
  border-bottom: 1px solid #fafafa;
  display : flex;
  flex-direction : row;
`;

//지원자 보기 헤더 텍스트
const ApplicantText = styled.div`
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 150%;
  color: #fafafa;
`;

//지원자보기 해당 바디 큰 틀
const ApplicantContainer = styled.div`
  width: 99.2rem;
  margin: 3.4rem 0 10rem 3.6rem;
`;


export default function ViewStatus() {
  //선택한옵션 설정
  const [selectedOptionIndex, setSelectedOptionIndex] = useState("전체보기"); 
  
  return (
    <Container>
      <HeadContainer>
        <ViewHeader />
      </HeadContainer>
      <ApplicantHeader>
        <ApplicantText>지원자 보기</ApplicantText>
        <ViewSelect setSelectedOptionIndex={setSelectedOptionIndex}/>
      </ApplicantHeader>
      <ApplicantContainer>
        <ViewBody selectedOptionIndex={selectedOptionIndex}/>
      </ApplicantContainer>
    </Container>
  );
}
