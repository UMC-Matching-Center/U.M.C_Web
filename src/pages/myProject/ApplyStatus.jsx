import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ViewHeader from "../../components/applyStatus/ViewHeader";
import ViewBody from "../../components/applyStatus/ViewBody";
import ViewSelect from "../../components/applyStatus/ViewSelect";

import { useDispatch, useSelector } from "react-redux";
import useGetAccessToken from "../../utils/getAccessToken";
import { appFailAPI, appPassAPI, viewAppAPI } from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
`;

//지원자 보기 헤더
const ApplicantHeader = styled.div`
  margin-top: 8.6rem;
  height: 6rem;
  width: 99.2rem;
  border-bottom: 1px solid #fafafa;
  display: flex;
  flex-direction: row;
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

export default function ApplyStatus() {
  const dispatch = useDispatch();
  const accessToken = useGetAccessToken();
  const { autoLogin } = useSelector((state) => state.userInfo);

  const [selectedOptionIndex, setSelectedOptionIndex] = useState("전체보기"); //선택한옵션 설정
  const [totalMatchingDTO, setTotalMatchingDTO] = useState({}); //전체 지원자 현황
  const [partMatchingDTO, setPartMatchingDTO] = useState([]); //파트 별 지원자 현황
  const [competitionRate, setCompetitionRate] = useState(); // 경쟁률 현황
  const [applicantInfoList, setApplicantInfoList] = useState([]); //앱 인포리스트
  const [showModal, setShowModal] = useState(false); //모달 띄우기
  const [render, setRender] = useState(false); //렌더링을 위한 것

  //해당 모달이 출력되고나서 해당 합격/불합격 버튼을 클릭하고 난 후 처리
  const handlePassOrFail = (modalType, memberId) => {
    {
      modalType == "합격"
        ? appPassAPI(accessToken, dispatch, autoLogin, memberId).then(
            (response) => {
              if (response.isSuccess) {
                if (!toast.isActive("appPassAPI", "ApplyStatus")) {
                  toast.success("합격 처리 완료", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    toastId: "appPassAPI",
                  });
                }
                setRender(!render);
              } else {
                if (!toast.isActive("appPassAPI", "ApplyStatus")) {
                  toast.error(response.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    toastId: "appPassAPI",
                  });
                }
              }
            }
          )
        : appFailAPI(accessToken, dispatch, autoLogin, memberId).then(
            (response) => {
              if (response.isSuccess) {
                if (!toast.isActive("appFailAPI", "ApplyStatus")) {
                  toast.success("불합격 처리 완료", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    toastId: "appFailAPI",
                  });
                }
                setRender(!render);
              } else {
                if (!toast.isActive("appFailAPI", "ApplyStatus")) {
                  toast.error(response.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    toastId: "appFailAPI",
                  });
                }
              }
            }
          );
    }
    setShowModal(false);
  };

  //첫 실행 시,버튼 누를 시 API 호출
  useEffect(() => {
    viewAppAPI(accessToken, dispatch, autoLogin).then((response) => {
      if (response.isSuccess) {
        setTotalMatchingDTO(response.totalMatchingData);
        setPartMatchingDTO(response.partMatchingData);
        setCompetitionRate(response.competitionRate);
        setApplicantInfoList(response.appInfoList);
      } else {
        if (!toast.isActive("viewAppAPI", "ApplyStatus")) {
          toast.error(response.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            toastId: "viewAppAPI",
          });
        }
      }
    });
  }, [render]);

  return (
    <>
      <ToastContainer containerId={"ApplyStatus"} />
      <Container>
        <HeadContainer>
          <ViewHeader
            totalMatchingDTO={totalMatchingDTO}
            partMatchingDTO={partMatchingDTO}
            competitionRate={competitionRate}
          />
        </HeadContainer>
        <ApplicantHeader>
          <ApplicantText>지원자 보기</ApplicantText>
          <ViewSelect setSelectedOptionIndex={setSelectedOptionIndex} />
        </ApplicantHeader>
        <ApplicantContainer>
          <ViewBody
            selectedOptionIndex={selectedOptionIndex}
            applicantInfoList={applicantInfoList}
            handlePassOrFail={handlePassOrFail}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </ApplicantContainer>
      </Container>
    </>
  );
}
