import React from "react";
import styled from "styled-components";
import ViewHeader from "../../../components/viewstatus/ViewHeader";
const ViewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ViewHeadContainer = styled.div`
  display: flex;
  width: 99.2rem;
  height: 16.9rem;
  border-radius: 1rem;
  background-color: #fafafa;
  color: #fafafa;
`;

const ViewApplicantHeader = styled.div`
  margin-top: 8.6rem;
  height: 6rem;
  width: 99.2rem;
  border-bottom: 1px solid #fafafa;
`;
const ViewApplicantText = styled.div`
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 150%;
  color: #fafafa;
`;

const ViewApplicantBody = styled.div`
  margin: 3.4rem 0 0 3.6rem;
`;

export default function ViewStatus() {
  return (
    <ViewContainer>
      <ViewHeadContainer>
        <ViewHeader />
      </ViewHeadContainer>
      <ViewApplicantHeader>
        <ViewApplicantText>지원자 보기</ViewApplicantText>
      </ViewApplicantHeader>
      <ViewApplicantBody></ViewApplicantBody>
    </ViewContainer>
  );
}
