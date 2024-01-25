import React from "react";
import "./ScheduleDetail.css";
import styled from "styled-components";

const StyledSVG = styled.svg`
  margin: 0.5rem 0 0 0.4rem;
  width: 1.2rem;
  height: 1.2rem;
`;

export default function ScheduleDetail({
  handlemoveScheduleAdd,
  handleScheduleEdit,
  currentMonthIndex,
  colorOptionList,
  dummyData,
}) {
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
      infobox.startmonth == currentMonthIndex + 1 ||
      infobox.endmonth == currentMonthIndex + 1 ||
      (infobox.endmonth > currentMonthIndex + 1 &&
        currentMonthIndex + 1 > infobox.startmonth)
  );

  return (
    <div className="schedulecontainer">
      {isDataInMonth ? (
        dummyData.map((infobox) =>
          infobox.startmonth == currentMonthIndex + 1 ||
          infobox.endmonth == currentMonthIndex + 1 ||
          (infobox.endmonth > currentMonthIndex + 1 &&
            currentMonthIndex + 1 > infobox.startmonth) ? (
            <div className="schedulebox" key={infobox.id}>
              <div className="schduletitlecontainer">
                {
                  DotOptions.find((option) => option.value === infobox.color)
                    ?.content
                }
                <div className="scheduletitle">{infobox.title}</div>
              </div>
              <div className="scheduledate">
                {infobox.startyear}년 {infobox.startmonth}월 {infobox.startday}
                일 ~ {infobox.endyear}년 {infobox.endmonth}월 {infobox.endday}일
              </div>
              <div className="scheduletext">{infobox.text}</div>
            </div>
          ) : null
        )
      ) : (
        <div className="noschedulebox">등록된 일정이 없습니다.</div>
      )}
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
          <div className="schedulebuttonfinish" onClick={handlemoveScheduleAdd}>
            일정 추가하기
          </div>
        )}
      </div>
    </div>
  );
}