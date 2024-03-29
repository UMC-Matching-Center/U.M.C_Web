import React from "react";
import EvaluateStar from "./EvaluateStar";
import "./Evaluate.css";
import styled from "styled-components";

export default function MyEvaluationCard({ list }) {
  return (
    <div className="evaluate-container">
      <div className="evaluate-detail-container">
        <HeadContainer>
          <EvaluateStar list={list} editOn={false} />
        </HeadContainer>
        <TextBox>{list.content}</TextBox>
      </div>
    </div>
  );
}

const HeadContainer = styled.div`
  margin: 2.7rem 0 0 2.4rem;
`;

const TextBox = styled.div`
  margin: 1.1rem 2.4rem 0 2.4rem;
  font-family: KBO-Dia-Gothic;
  font-weight: 300;
  line-height: 150%;
  font-size: 1.4rem;
`;
