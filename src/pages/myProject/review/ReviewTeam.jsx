import React, { useEffect, useState } from "react";
import ReviewCard from "../../../components/review/ReviewCard";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAccessToken from "../../../utils/getAccessToken";
import { reviewAppAPI } from "../../../api";

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

export default function ReviewTeam() {
  const [dataList, setDataList] = useState([]);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useGetAccessToken();
  const { autoLogin } = useSelector((state) => state.userInfo);

  //첫 실행 시 API 호출
  useEffect(() => {
    if (accessToken !== "") {
      reviewAppAPI(accessToken, dispatch, autoLogin).then((response) => {
        if (response.isSuccess) {
          setDataList(response.reviewDataList);
        } else {
          alert(response.message + "api 호출을 실패했습니다.");
        }
      });
    } else {
      navigate("/register", { replace: true }); // 메인 페이지로 이동
    }
  }, []);

  return (
    <WholeContainer>
      <ReviewContainer>
        {dataList.map((list) => (
          <div key={list.memberId}>
            <ReviewCard list={list} setDataList={setDataList} />
          </div>
        ))}
      </ReviewContainer>
    </WholeContainer>
  );
}