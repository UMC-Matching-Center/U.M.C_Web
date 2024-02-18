import React, { useEffect, useState } from "react";
import EvaluateCard from "../../components/evaluate/EvaluateCard";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import useGetAccessToken from "../../utils/getAccessToken";
import { evaluateAppAPI } from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
`;

export default function EvaluateTeam() {
  const [dataList, setDataList] = useState([]);

  const dispatch = useDispatch();
  const accessToken = useGetAccessToken();
  const { autoLogin } = useSelector((state) => state.userInfo);

  //첫 실행 시 API 호출
  useEffect(() => {
    evaluateAppAPI(accessToken, dispatch, autoLogin).then((response) => {
      if (response.isSuccess) {
        setDataList(response.evaluateDataList);
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
        <EvaluateContainer>
          {dataList.map((list) => (
            <div key={list.memberId}>
              <EvaluateCard list={list} setDataList={setDataList} />
            </div>
          ))}
        </EvaluateContainer>
      </WholeContainer>
    </>
  );
}
