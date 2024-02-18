import React from "react";
import styled from "styled-components";

export default function EvaluateToggle({ evaluateMode, setEvaluateMode }) {
  const toggleHandler = () => {
    setEvaluateMode(!evaluateMode);
  };

  return (
    <Container>
      <div className="text">팀원 평가</div>
      <ToggleContainer $isActive={evaluateMode} onClick={toggleHandler}>
        <div className="toggle-text">{evaluateMode ? "ON" : "OFF"}</div>
        <div className="toggle-circle" />
      </ToggleContainer>
    </Container>
  );
}

//전체 컨테이너
const Container = styled.div`
  display: flex;
  flex-direction: row;
  color: #fff;

  font-size: 1.6rem;
  font-weight: 300;
  line-height: 150%;
  .text {
    padding-top: 0.3rem;
  }
`;

//토글 컨테이너
const ToggleContainer = styled.div`
  position: relative;
  margin-left: 1.1rem;
  width: 7.3rem;
  height: 3.3rem;
  border-radius: 5rem;
  background-color: ${(props) => (props.$isActive ? "#0281e2" : "#cecdd5")};
  cursor: pointer;
  transition: background-color 0.5s;

  .toggle-circle {
    position: absolute;
    top: 0.3rem;
    left: ${(props) => (props.$isActive ? "4.3rem" : "0.3rem")};
    width: 2.7rem;
    height: 2.7rem;
    border-radius: 50%;
    background-color: #fafafa;
    transition: left 0.5s;
  }
  .toggle-text {
    font-weight: 500;
    padding-top: 0.3rem;
    padding-left: ${(props) => (props.$isActive ? "1.1rem" : "3.5rem")};
    transition: 0.5s;
  }
`;
