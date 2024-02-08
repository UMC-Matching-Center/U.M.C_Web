import React from "react";
import "./ScheduleDetail.css";
import styled from "styled-components";
import { useSelector } from "react-redux";

const StyledSVG = styled.svg`
  margin: 0.5rem 0 0 0.4rem;
  width: 1.2rem;
  height: 1.2rem;
`;

export default function ScheduleDetail({
  handlemoveScheduleAdd,
  handleScheduleEdit,
  currentMonthIndex,
  currentYearIndex,
  colorOptionList,
  dummyData,
}) {
  const { userType } = useSelector((state) => state.userInfo);
  // DotOptions 배열 구성
  const DotOptions = colorOptionList.map((option) => ({
    value: option.value,
    content: (
      <StyledSVG>
        <circle cx="6" cy="6" r="6" fill={option.value} />
      </StyledSVG>
    ),
  }));

  //해당 달력에 날짜가 있는지 처리
  const isDataInMonth = dummyData.some(
    (infobox) =>
      ((infobox.startYear == currentYearIndex &&
        infobox.startMonth == currentMonthIndex + 1) ||
        (infobox.endYear == currentYearIndex &&
          infobox.endMonth == currentMonthIndex + 1)) &&
      (infobox.startMonth == currentMonthIndex + 1 ||
        infobox.endMonth == currentMonthIndex + 1 ||
        (infobox.endMonth > currentMonthIndex + 1 &&
          currentMonthIndex + 1 > infobox.startMonth))
  );

  return (
    <div className="schedulecontainer">
      {isDataInMonth ? (
        dummyData.map((infobox) =>
          ((infobox.startYear == currentYearIndex &&
            infobox.startMonth == currentMonthIndex + 1) ||
            (infobox.endYear == currentYearIndex &&
              infobox.endMonth == currentMonthIndex + 1)) &&
          (infobox.startMonth == currentMonthIndex + 1 ||
            infobox.endMonth == currentMonthIndex + 1 ||
            (infobox.endMonth > currentMonthIndex + 1 &&
              currentMonthIndex + 1 > infobox.startMonth)) ? (
            <div className="schedulebox" key={infobox.scheduleId}>
              <div className="schduletitlecontainer">
                {
                  DotOptions.find(
                    (option) => option.value === infobox.scheduleColor
                  )?.content
                }
                <div className="scheduletitle">{infobox.title}</div>
              </div>
              <div className="scheduledate">
                {infobox.startYear}년 {infobox.startMonth}월 {infobox.startDay}
                일 ~ {infobox.endYear}년 {infobox.endMonth}월 {infobox.endDay}일
              </div>
              <div className="scheduletext">{infobox.description}</div>
            </div>
          ) : null
        )
      ) : (
        <div className="noschedulebox">등록된 일정이 없습니다.</div>
      )}
      {userType === "ROLE_ADMIN" && ( //해당 어드민일때만 일정 추가하기 기능 구현
        <div className="schedulebuttoncontainer">
          {isDataInMonth ? (
            <>
              <div className="schedulebutton" onClick={handlemoveScheduleAdd}>
                일정 추가하기
              </div>
              <div className="schedulebutton" onClick={handleScheduleEdit}>
                일정 편집하기
              </div>
            </>
          ) : (
            <div
              className="schedulebuttonfinish"
              onClick={handlemoveScheduleAdd}
            >
              일정 추가하기
            </div>
          )}
        </div>
      )}
    </div>
  );
}
