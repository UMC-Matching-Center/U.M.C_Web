import React, { useEffect, useState } from "react";
import EvaluateCard from "../../components/evaluate/EvaluateCard";
import EvaluateToggle from "../../components/evaluate/EvaulateToggle";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import useGetAccessToken from "../../utils/getAccessToken";
import { evaluateAppAPI, myEvaluationAPI } from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyEvaluationCard from "../../components/evaluate/MyEvaluationCard";

const WholeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 7.8rem 0;
`;

const EvaluateContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3.4rem 2.4rem;
  }
`;

const EvaluateModeContainer = styled.div`
  margin : 0 0 1.1rem 105rem;
`;
export default function EvaluateTeam() {
  const [evaluateData, setEvaluateData] = useState([]); //상호평가 하기
  const [myEvaluationData, setMyEvaluationData] = useState([]); //내 상호평가 보기
  const [evaluateMode, setEvaluateMode] = useState(true); //토글 버튼

  const dispatch = useDispatch();
  const accessToken = useGetAccessToken();
  const { autoLogin } = useSelector((state) => state.userInfo);

  //첫 실행 시 API 호출
  useEffect(() => {
    evaluateAppAPI(accessToken, dispatch, autoLogin).then((response) => {
      if (response.isSuccess) {
        setEvaluateData(response.evaluateDataList);
      } else {
        toast.error(response.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
    myEvaluationAPI(accessToken, dispatch, autoLogin).then((response) => {
      if (response.isSuccess) {
        setMyEvaluationData(response.myEvaluationData);
      } else {
        toast.error(response.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  }, []);

    //첫 실행 시 API 호출
  useEffect(() => {
    evaluateAppAPI(accessToken, dispatch, autoLogin).then((response) => {
      if (response.isSuccess) {
        setEvaluateData(response.evaluateDataList);
      } else {
        toast.error(response.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
    myEvaluationAPI(accessToken, dispatch, autoLogin).then((response) => {
      if (response.isSuccess) {
        setMyEvaluationData(response.myEvaluationData);
      } else {
        toast.error(response.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  }, []);
  return (
    <>
      <WholeContainer>
        <ToastContainer />
        <EvaluateModeContainer>
          <EvaluateToggle
            evaluateMode={evaluateMode}
            setEvaluateMode={setEvaluateMode}
          />
        </EvaluateModeContainer>
        <EvaluateContainer>
          {evaluateMode
            ? evaluateData.map((list) => (
                <div key={list.memberId}>
                  <EvaluateCard list={list} setEvaluateData={setEvaluateData} />
                </div>
              ))
            : myEvaluationData.map((list,index) => (
                <div key={index}>
                  <MyEvaluationCard list={list} />
                </div>
              ))}
        </EvaluateContainer>
      </WholeContainer>
    </>
  );
}
