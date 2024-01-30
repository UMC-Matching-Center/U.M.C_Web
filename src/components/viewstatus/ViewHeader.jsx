import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled.div``;

const HeaderText = styled.div``;

const BodyText = styled.div``;

const HeaderBar = styled.div`
  width: 0.1rem;
  height: 7.3rem;
  background-color: #9c9aab;
`;

export default function ViewHeader() {
  return (
    <HeaderContainer>
      <TextBox>
        <HeaderText></HeaderText>
        <BodyText></BodyText>
      </TextBox>
      <HeaderBar />
      <TextBox>
        <HeaderText></HeaderText>
        <BodyText></BodyText>
      </TextBox>
    </HeaderContainer>
  );
}
