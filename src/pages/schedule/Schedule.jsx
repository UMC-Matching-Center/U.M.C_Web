import React, { useState } from "react";
import styled from "styled-components";

import ScheduleMonth from "../../components/schedule/ScheduleMonth";
import CustomCalendar from "../../components/schedule/CustomCalendar";
import ScheduleList from "../../components/schedule/ScheduleList";

const ScheduleBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 21rem;
  font-family: KBO-Dia-Gothic;
  color: #fafafa;
`;

//캘린더와 일정 추가 부분을 가로로 만들기 위해 생성
const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top : 1.5rem;
`;
const projectDummy = [
  {
    id: 1,
    title: "기말고사",
    startyear: "24",
    startmonth: "1",
    startday: "8",
    endyear: "24",
    endmonth: "1",
    endday: "10",
    text: "가천대학교 기말고사",
    color: "#DCDEEE",
  },
  {
    id: 2,
    title: "개발자 매칭",
    startyear: "24",
    startmonth: "1",
    startday: "8",
    endyear: "24",
    endmonth: "1",
    endday: "11",
    text: "",
    color: "#FF7676",
  },
  {
    id: 3,
    title: "기말고사",
    startyear: "24",
    startmonth: "1",
    startday: "8",
    endyear: "24",
    endmonth: "1",
    endday: "23",
    text: "",
    color: "#DCDEEE",
  },
];

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
  //해당 달 구하기
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );
  const [currentYearIndex, setCurrentYearIndex] = useState(new Date().getFullYear()
  );
  console.log(currentYearIndex);
  console.log(currentMonthIndex);
  
  //해당 날짜 변경하게끔 설정
  const [dummyData, setDummyData] = useState(projectDummy);

  //데이터 추가 설정
  const [formData, setFormData] = useState({
    title: "",
    color: "#DCDEEE",
    startyear: "",
    startmonth: "",
    startday: "",
    endyear: "",
    endmonth: "",
    endday: "",
    memo: "",
  });

  const handleBeforeMonth = () => {
    setCurrentMonthIndex((currentMonthIndex - 1 + 12) % 12);
    setCurrentYearIndex((currentMonthIndex === 0 ? currentYearIndex - 1 : currentYearIndex))
  };

  const handleAfterMonth = () => {
    setCurrentMonthIndex((currentMonthIndex + 1 + 12) % 12);
    setCurrentYearIndex((currentMonthIndex === 11 ? currentYearIndex+1 : currentYearIndex))
  };

  return (
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
  );
}
