import React, { useState } from "react";
import ReviewCard from "../../../components/review/ReviewCard";
import styled from "styled-components";

const WholeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 7.8rem 0;
`;

const ReviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3.4rem 2.4rem;
`;

const TeamList = [
  {
    id: 1,
    nickname: "캐슬",
    name: "이호성",
    part: "Spring",
    school: "가천대학교",
    reviewstar: 3.5,
    text: "",
  },
  {
    id: 2,
    nickname: "캐슬",
    name: "이호성",
    part: "Android",
    school: "가천대학교",
    reviewstar: "none",
    text: "",
  },
  {
    id: 3,
    nickname: "캐슬",
    name: "이호성",
    part: "Spring",
    school: "가천대학교",
    reviewstar: 4.5,
    text: "",
  },
  {
    id: 4,
    nickname: "캐슬",
    name: "이호성",
    part: "Spring",
    school: "가천대학교",
    reviewstar: 4.5,
    text: "",
  },
];

export default function ReviewTeam() {
  const [dataList, setDataList] = useState(TeamList);

  return (
    <WholeContainer>
      <ReviewContainer>
        {dataList.map((list) => (
          <div key={list.id}>
            <ReviewCard list={list} setDataList={setDataList} />
          </div>
        ))}
      </ReviewContainer>
    </WholeContainer>
  );
}
