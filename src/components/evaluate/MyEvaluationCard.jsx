import React from "react";
import EvaluateStar from "./EvaluateStar";
import "./Evaluate.css";
import styled from "styled-components";

export default function MyEvaluationCard({ list }) {
  return (
    <div className="container">
      <div className="detail-container">
        <div className="head-container">
          <EvaluateStar list={list} editOn={false} />
        </div>
        <TextBox>{list.content}</TextBox>
      </div>
    </div>
  );
}

const TextBox = styled.div`
  margin: 1.1rem 2.4rem 0 2.4rem;
  font-family: KBO-Dia-Gothic;
  font-weight: 300;
  line-height: 150%;
  font-size: 1.4rem;
`;
