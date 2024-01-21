import React, { useEffect, useState } from "react";
import "./ScheduleDetail.css";
import styled from "styled-components";
import DotAddOptions from "./dotoptions/DotAddOptions";
//Add 컴포넌트 총 컨테이너
const AddContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 300;
  font-size: 1.6rem;
  line-height: 150%;
`;

//제목 컨테이너(일정)
const AddTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 3.2rem;
`;

//제목 텍스트(일정)
const AddColorTitleText = styled.div`
  font-weight: 300;
  font-size: 1.6rem;
`;

const AddColorDot = styled.div`
  display: flex;
  margin-left: 2rem;
`;
//제목 입력칸(일정)
const AddTitleInput = styled.input`
  width: 22.7rem;
  background-color: #02010b;
  border: none;
  border-bottom: 0.1rem solid #dcdeee;
  margin-left: 2.3rem;

  font-size: 1.6rem;
  font-weight: 500;
  color: #fafafa;
  font-family: KBO-Dia-Gothic;
`;

//일정 컨테이너(시작,종료)
const AddDateContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1.4rem;
`;

//일정 텍스트(시작,종료)
const AddDateText = styled.div`
  font-weight: 300;
  font-size: 1.6rem;
`;

//일정 입력칸(시작,종료)
const AddDateInput = styled.input`
  width: 13rem;
  background-color: #02010b;
  border: none;
  border-bottom: 0.1rem solid #dcdeee;
  margin-left: 3.7rem;

  font-size: 1.6rem;
  font-weight: 500;
  color: #fafafa;
  font-family: KBO-Dia-Gothic;
`;

//메모 텍스트
const AddMemoText = styled.div`
  margin: 1.4rem 0 1rem 0;
`;

//메모 입력칸 박스
const AddMemoInputBox = styled.textarea`
  width: 40.2rem; //40.8-0.6을 해야 padding+border값 3씩 더해서 0.6인 상태라, 정확히 40.8의 크기가 된다.
  height: 10.1rem;
  background-color: #02010b;
  border: 0.1rem solid #dcdeee;

  font-size: 1.4rem;
  font-weight: 300;
  color: #fafafa;
  font-family: KBO-Dia-Gothic;
  line-height: 150%;

  resize: none;
`;

export default function ScheduleEdit({
  handleScheduleAdd,
  handlemoveScheduleAdd,
  colorOptionList,
  formData,
  setFormData,
}) {
  const [isTitleFilled, setIsTitleFilled] = useState(false); //타이틀이 입력된 상태인지
  const [isStartDateFilled, setIsStartDateFilled] = useState(false); // 시작 날짜가 입력된 상태인지
  const [isEndDateFilled, setIsEndDateFilled] = useState(false); // 종료 날짜가 입력된 상태인지
  const [ableBtn, setAbleBtn] = useState(false); // 추가버튼 able 여부
  
  //제목 세팅
  const handleTitleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
    if (e.target.value !== "") setIsTitleFilled(true); //해당 값이 입력되면
    else {
      setIsTitleFilled(false);
    }
  };

  //컬러 세팅
  const handleColorChange = (color) => {
    setFormData({ ...formData, color: color });
  };

  //시작 날짜 세팅
  const handleStartDateChange = (e) => {
    const inputValue = e.target.value;

    // 입력된 날짜에서 연도, 월과 일 추출
    const match = inputValue.match(/(\d{1,2})년\s*(\d{1,2})월\s*(\d{1,2})일/);

    if (match) {
      const startyear = match[1];
      const startmonth = match[2];
      const startday = match[3];

      // formData 업데이트
      setFormData({
        ...formData,
        startyear: startyear,
        startmonth: startmonth,
        startday: startday,
      });
      setIsStartDateFilled(true);
    } else {
      // 패턴이 일치하지 않을 경우 처리
      setIsStartDateFilled(false);
    }
  };

  //종료 날짜 세팅
  const handleEndDateChange = (e) => {
    const inputValue = e.target.value;

    // 입력된 날짜에서 연도, 월과 일 추출
    const match = inputValue.match(/(\d{1,2})년\s*(\d{1,2})월\s*(\d{1,2})일/);

    if (match) {
      const endyear = match[1];
      const endmonth = match[2];
      const endday = match[3];

      // formData 업데이트
      setFormData({
        ...formData,
        endyear: endyear,
        endmonth: endmonth,
        endday: endday,
      });
      setIsEndDateFilled(true);
    } else {
      // 패턴이 일치하지 않을 경우 처리
      setIsEndDateFilled(false);
    }
  };

  //메모 설정
  const handleMemoChange = (e) => {
    setFormData({ ...formData, memo: e.target.value });
  };

  // 제목, 시작,종료일이 채워지면 버튼 클릭 여부 키기
  useEffect(() => {
    setAbleBtn(isTitleFilled && isStartDateFilled && isEndDateFilled); 
  }, [isTitleFilled, isStartDateFilled, isEndDateFilled]); 

  return (
    <div className="schedulecontainer">
      <AddContainer>
        <AddTitleContainer>
          <AddColorTitleText>일정 색상</AddColorTitleText>
          <AddColorDot>
            <DotAddOptions
              colorOptionList={colorOptionList}
              handleColorChange={handleColorChange}
              formData={formData}
            />
          </AddColorDot>
        </AddTitleContainer>
        <AddTitleContainer>
          <AddColorTitleText>일정 제목</AddColorTitleText>
          <AddTitleInput onChange={handleTitleChange}></AddTitleInput>
        </AddTitleContainer>
        <AddDateContainer>
          <AddDateText>시작일</AddDateText>
          <AddDateInput
            onChange={handleStartDateChange}
            placeholder="00년 00월 00일"
          ></AddDateInput>
        </AddDateContainer>
        <AddDateContainer>
          <AddDateText>종료일</AddDateText>
          <AddDateInput
            onChange={handleEndDateChange}
            placeholder="00년 00월 00일"
          ></AddDateInput>
        </AddDateContainer>
        <AddMemoText>메모</AddMemoText>
        <AddMemoInputBox
          onChange={handleMemoChange}
          placeholder="(선택) 내용 추가가 필요한 경우, 이곳에 작성해주세요."
        ></AddMemoInputBox>
        <div className="schedulebuttoncontainer">
          <div className="schedulebutton" onClick={handlemoveScheduleAdd}>
            취소하기
          </div>
          <div
            className="schedulebutton"
            style={
              ableBtn ? {} : { pointerEvents: "none", opacity: 0.5 } //해당 값이 없을 시 추가버튼 누르기 불가능
            }
            onClick={handleScheduleAdd}
          >
            추가하기
          </div>
        </div>
      </AddContainer>
    </div>
  );
}
