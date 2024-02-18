import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ScheduleMonth from "../../components/schedule/ScheduleMonth";
import CustomCalendar from "../../components/schedule/CustomCalendar";
import ScheduleList from "../../components/schedule/ScheduleList";

import { scheduleDataAPI } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import useGetAccessToken from "../../utils/getAccessToken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ScheduleBox = styled.div`
  margin-top: -6.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: KBO-Dia-Gothic;
  color: #fafafa;
`;

//캘린더와 일정 추가 부분을 가로로 만들기 위해 생성
const ScheduleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 120rem;
  flex-direction: row;
  margin-top: 3rem;
`;

//컬러 옵션 리스트
const colorOptionList = [
  { id: 1, value: "#DCDEEE" },
  { id: 2, value: "#FF7676" },
  { id: 3, value: "#FFA654" },
  { id: 4, value: "#FFE974" },
  { id: 5, value: "#70AD4E" },
  { id: 6, value: "#CCE6F9" },
  { id: 7, value: "#359AE8" },
  { id: 8, value: "#0261AA" },
  { id: 9, value: "#747BBB" },
];

export default function Schedule() {
  const dispatch = useDispatch();
  const accessToken = useGetAccessToken();
  const { autoLogin } = useSelector((state) => state.userInfo);
  //해당 달 구하기
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );
  const [currentYearIndex, setCurrentYearIndex] = useState(
    new Date().getFullYear()
  );

  //해당 날짜 변경하게끔 설정
  const [dummyData, setDummyData] = useState([]);

  //데이터 추가 설정
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    scheduleColor: "#DCDEEE",
    startYear: "",
    startMonth: "",
    startDay: "",
    endYear: "",
    endMonth: "",
    endDay: "",
  });

  const handleBeforeMonth = () => {
    setCurrentMonthIndex((currentMonthIndex - 1 + 12) % 12);
    setCurrentYearIndex(
      currentMonthIndex === 0 ? currentYearIndex - 1 : currentYearIndex
    );
  };

  const handleAfterMonth = () => {
    setCurrentMonthIndex((currentMonthIndex + 1 + 12) % 12);
    setCurrentYearIndex(
      currentMonthIndex === 11 ? currentYearIndex + 1 : currentYearIndex
    );
  };

  // 첫 실행시, formData가 사용될 때 마다 API 호출
  useEffect(() => {
    scheduleDataAPI(accessToken, dispatch, autoLogin).then((response) => {
      if (response.isSuccess) {
        setDummyData(response.scheduleList);
      } else {
        if (!toast.isActive("scheduleDataAPI", "evaluateAPI")) {
          toast.error(response.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            toastId: "scheduleDataAPI",
          });
        }
      }
    });
  }, [formData]);

  return (
    <>
      <ToastContainer containerId={"scheduleAPI"} />
      <ScheduleBox>
        <ScheduleMonth
          currentMonthIndex={currentMonthIndex} //현재 달 index값 give
          currentYearIndex={currentYearIndex} //현재 년도
          handleBeforeMonth={handleBeforeMonth} //저번 달 이동 handle 값 get
          handleAfterMonth={handleAfterMonth} //다음 달 이동 handle 값 get
        />
        <ScheduleContainer>
          <CustomCalendar
            currentMonthIndex={currentMonthIndex} //현재 달 index값 give
            currentYearIndex={currentYearIndex} //현재 년도
            dummyData={dummyData} //해당 데이터 give
            formData={formData} //추가하는 데이터에 대한 반응하기 위해 give
          />
          <ScheduleList
            currentMonthIndex={currentMonthIndex} //현재 달 index값 give
            currentYearIndex={currentYearIndex} //현재 년도 넘기기
            colorOptionList={colorOptionList} //해당 컬러 옵션 데이터 give
            dummyData={dummyData} //해당 데이터 give
            setDummyData={setDummyData}
            formData={formData} //추가하는 데이터에 대한 반응하기 위해 give
            setFormData={setFormData} //데이터 값을 주기 위한 것
          />
        </ScheduleContainer>
      </ScheduleBox>
    </>
  );
}
