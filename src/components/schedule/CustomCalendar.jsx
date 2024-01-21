import React from "react";
import styled from "styled-components";
//캘린더 컨테이너
const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  font-weight: 500;
`;

//캘린더 컨테이너 상단 헤더 부분
const CalendarTableHeader = styled.div`
  display: flex;
  align-items: center;
  width: 68.5rem;
  height: 3.4rem;
  background-color: #014171;
  border-radius: 0.8rem 0.8rem 0rem 0rem;
`;

//캘린더 컨테이너 상단 헤더 부분 텍스트
const CalendarTableHeaderText = styled.div`
  display: flex;
  width: 26rem;
  font-weight: 700;
  line-height: 150%;
  justify-content: center;
  align-items: center;
`;

const CalendarTableHeaderLine = styled.div`
  width: 0.1rem;
  height: 1.6rem;
  background-color: #fafafa;
`;

// 일별로 나뉠 때 사용되는 | 라인

//캘린더 바디부분
const CalendarTable = styled.div`
  display: flex;
  width: 68.6rem;
  width: 100%;
  margin-top: 0.7rem;
  flex-direction: column;
  border-radius: 0rem 0rem 0.8rem 0.8rem;
`;

//캘린더 바디 부분 내 작은 상자(변경 시 조정하기)
const CalendarTableBox = styled.div`
  display: flex;
  min-width: 9.6rem;
  height: 12rem;
  flex-direction: column;
  background-color: ${(props) => (props.isHighlighted ? "#E6F3FD" : "#fafafa")};
  border: ${(props) =>
    props.isHighlighted ? "0.1rem solid #359AE8" : "0.1rem solid #02010B"};
`;

//캘린더 바디 부분 내 작은 상자안에 날짜
const CalendarTableBoxDate = styled.div`
  display: flex;
  width: 2.4rem;
  height: 2.4rem;
  justify-content: center;
  align-items: center;
  margin: 0.6rem 0 0 0.5rem;
  border-radius: 4.6rem;
  color: #000000;
  font-size: 1.2rem;
  background-color: ${(props) => (props.todaydate ? "#0261AA" : "transparent")};
  color: ${(props) => {
    if (props.todaydate) return "#FFFFFF";
    if (props.othermonthstyle) return "#CECDD5"; // 이전 달의 첫,마지막 주
    return "#000000"; // 현재 달의 날짜
  }};
`;

//캘린더 바디 부분 내 작은 상자안에 디테일 박스
const CalendarTableBoxDetailBox = styled.div`
  display: flex;
  flex-direction: row;
`;

//캘린더 바디 부분 내 작은 상자안에 디테일 박스 안에 작은 닷
const CalendarTableBoxDetailDot = styled.div`
  display: flex;
  margin: 1.1rem 0 0 1.1rem;
`;

//캘린더 바디 부분 내 작은 상자안에 디테일 박스 안에 값
const CalendarTableBoxDetailValue = styled.div`
  display: flex;
  margin: 0.8rem 0 0 0.6rem;
  font-weight: 300;
  font-size: 1rem;
`;

// 해당 닷 스타일링
const StyledSVG = styled.svg`
  width: 0.6rem;
  height: 0.6rem;
`;

export default function CustomCalendar({
  currentMonthIndex,
  dummyData,
  formData,
}) {
  const dates = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; //월~일 설정
  const DateToday = new Date().getDate(); //오늘 당일 날짜
  const currentDate = new Date(); //현재 날짜
  const firstDayOfMonth = new Date( //달에 첫번째
    currentDate.getFullYear(),
    currentMonthIndex,
    1
  ).getDay();

  const daysInMonth = new Date( //달에 있는 날짜 계산
    currentDate.getFullYear(),
    currentMonthIndex + 1,
    0
  ).getDate();

  const prevMonthDays = new Date( //저번달 날 계산
    currentDate.getFullYear(),
    currentMonthIndex,
    0
  ).getDate();

  const days = [];

  // 이전 달의 마지막 주의 날짜들 추가
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    days.push(prevMonthDays - i);
  }

  // 현재 달의 날짜들 추가
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // 다음 달의 첫 주의 날짜들 추가
  const remainingDays = 7 - (days.length % 7);
  for (let i = 1; i <= remainingDays; i++) {
    days.push(i);
  }

  // 각 달의 날짜에 해당하는 셀 추가
  // todaydate를 통한 해당 날짜인 경우에 하이라이트 표시하기
  const columns = [];
  let cells = [];

  for (let i = 0; i < days.length; i++) {
    // 이전 달의 마지막 주의 날짜 스타일
    let isPrevMonthLastWeek = i < firstDayOfMonth;

    // 다음 달의 첫 주의 날짜 스타일
    let isNextMonthFirstWeek = i >= daysInMonth + firstDayOfMonth;
    if (isNextMonthFirstWeek && i % 7 === 0) {
      //다음 달이 마지막 7줄 다 차지하지 않도록 설정
      break;
    }

    //편집 설정 들어갔을 때 설정하기
    const isHighlightedAvailableEditCheck = dummyData.map((data) => {
      if (
        data.editOn && //scheduleEdit에서 추가한 editOn을 통해 해당 객체안에 editOn상태 여부 따짐으로 인해 색깔 여부 판단
        (((data.startmonth == currentMonthIndex + 1 ||
          (data.endmonth > data.startmonth &&
            data.endmonth == currentMonthIndex + 1)) &&
          ((data.endmonth == currentMonthIndex + 1 &&
            data.endmonth > data.startmonth) ||
            days[i] >= data.startday)) ||
          (data.endmonth > currentMonthIndex + 1 &&
            currentMonthIndex + 1 > data.startmonth)) &&
        (data.endmonth > currentMonthIndex + 1 || days[i] <= data.endday) &&
        !(i < firstDayOfMonth || i >= daysInMonth + firstDayOfMonth)
      ) {
        return true;
      } else {
        return false;
      }
    });

    //이렇게 해야 배열안에서 true값이 있으면 해당 값에 true를 리턴해줄 수 있다.
    const isHighlightedAvailableEdit = isHighlightedAvailableEditCheck.some(
      (value) => value
    );

    //추가 시 하이라이트 여부 확인
    const isHighlightedAvailableAdd =
      ((currentMonthIndex + 1 == formData.startmonth ||
        (formData.endmonth > formData.startmonth &&
          formData.endmonth == currentMonthIndex + 1)) &&
      ((formData.endmonth == currentMonthIndex + 1 &&
        formData.endmonth > formData.startmonth) ||
        days[i] >= formData.startday) &&
      (formData.endmonth > currentMonthIndex + 1 ||
        days[i] <= formData.endday) || (formData.endmonth > currentMonthIndex + 1 &&
          currentMonthIndex + 1 > formData.startmonth)) &&
      !(i < firstDayOfMonth || i >= daysInMonth + firstDayOfMonth); //다음 달이나 저번달 거 표시하지 않도록 설정

    cells.push(
      <CalendarTableBox
        key={i}
        isHighlighted={isHighlightedAvailableAdd || isHighlightedAvailableEdit}
      >
        <CalendarTableBoxDate
          todaydate={
            days[i] === DateToday &&
            currentMonthIndex === currentDate.getMonth()
          }
          othermonthstyle={isPrevMonthLastWeek || isNextMonthFirstWeek}
        >
          {days[i]}
        </CalendarTableBoxDate>
        {dummyData.map(
          (
            data,
            j //dummyData에 있는 값을 출력
          ) =>
            (((data.startmonth == currentMonthIndex + 1 ||
              (data.endmonth > data.startmonth &&
                data.endmonth == currentMonthIndex + 1)) &&
              ((data.endmonth == currentMonthIndex + 1 &&
                data.endmonth > data.startmonth) ||
                days[i] >= data.startday)) ||
              (data.endmonth > currentMonthIndex + 1 &&
                currentMonthIndex + 1 > data.startmonth)) &&
            (data.endmonth > currentMonthIndex + 1 || days[i] <= data.endday) &&
            !(i < firstDayOfMonth || i >= daysInMonth + firstDayOfMonth) ? ( //다음 달이나 저번달 거 표시하지 않도록 설정
              <CalendarTableBoxDetailBox key={j}>
                <CalendarTableBoxDetailDot>
                  <StyledSVG>
                    <circle cx="3" cy="3" r="3" fill={data.color} />
                  </StyledSVG>
                </CalendarTableBoxDetailDot>
                <CalendarTableBoxDetailValue style={{ color: "black" }}>
                  {data.title}
                </CalendarTableBoxDetailValue>
              </CalendarTableBoxDetailBox>
            ) : null
        )}
        {isHighlightedAvailableAdd ? ( //다음 달이나 저번달 거 표시하지 않도록 설정
          <CalendarTableBoxDetailBox>
            <CalendarTableBoxDetailDot>
              <StyledSVG>
                <circle cx="3" cy="3" r="3" fill={formData.color} />
              </StyledSVG>
            </CalendarTableBoxDetailDot>
            <CalendarTableBoxDetailValue style={{ color: "black" }}>
              {formData.title}
            </CalendarTableBoxDetailValue>
          </CalendarTableBoxDetailBox>
        ) : null}
      </CalendarTableBox>
    );

    // 한 열에 7개의 행이 모두 차면 새로운 열 시작
    if (cells.length == 7 || i === days.length - 1) {
      columns.push(
        <div
          key={`column-${columns.length}`}
          style={{ display: "flex", flexDirection: "row" }}
        >
          {cells.map((cell, index) => (
            <div key={`cell-${index}`}>{cell}</div>
          ))}
        </div>
      );
      cells = [];
    }
  }

  return (
    <CalendarContainer>
      <CalendarTableHeader>
        {dates.map((date, index) => (
          <React.Fragment key={index}>
            <CalendarTableHeaderText>{date}</CalendarTableHeaderText>
            {index < 6 ? <CalendarTableHeaderLine /> : <></>}
          </React.Fragment>
        ))}
      </CalendarTableHeader>
      <CalendarTable>{columns}</CalendarTable>
    </CalendarContainer>
  );
}
