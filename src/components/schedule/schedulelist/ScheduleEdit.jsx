import React, { useEffect, useState } from "react";
import "./ScheduleDetail.css";
import styled from "styled-components";
import DotEditOptions from "./dotoptions/DotEditOptions";

//편집 제목 박스
const EditTitleBox = styled.div`
  display: flex;
  flex-direction: row;
`;

//편집 제목
const EditTitle = styled.input`
  background-color: #02010b;
  color: #fafafa;
  width: 25.2rem;

  margin-left: 0.7rem;
  border: none;
  border-bottom: 0.1rem solid #dcdeee;

  font-weight: 700;
  font-size: 2.4rem;
`;

//편집 날짜 박스
const EditDateBox = styled.div`
  margin-top: 1.1rem;
`;

//편집 날짜
const EditDate = styled.input`
  background-color: #02010b;
  color: #fafafa;
  width: 12rem;
  height: 2.4rem;
  border: none;
  border-bottom: 0.1rem solid #dcdeee;

  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
`;

//편집 텍스트 박스
const EditText = styled.textarea`
  background-color: #02010b;
  color: #fafafa;
  width: 29.4rem;
  height: 6.5rem;
  margin-top: 1.5rem;

  border: 0.1rem solid #ffffff;

  font-size: 1rem;
  font-weight: 300;
  resize: none;
`;

// 해당 닷 스타일링
const StyledSVG = styled.svg`
  margin: 0.5rem 0 0 0.4rem;
  width: 1.2rem;
  height: 1.2rem;
`;

export default function ScheduleEdit({
  handleScheduleEditFinish,
  currentMonthIndex,
  colorOptionList,
  dummyData,
  setDummyData,
}) {
  const [selectedColor, setSelectedColor] = useState(colorOptionList);
  const [isTitleFilled, setIsTitleFilled] = useState(true); //타이틀이 입력된 상태인지
  const [isStartDateFilled, setIsStartDateFilled] = useState(true); // 시작 날짜가 입력된 상태인지
  const [isEndDateFilled, setIsEndDateFilled] = useState(true); // 종료 날짜가 입력된 상태인지
  const [ableBtn, setAbleBtn] = useState(false); // 저장버튼 able 여부

  //수정 버튼
  const handleEdit = (id) => {
    setDummyData((prevInfoboxData) =>
      prevInfoboxData.map((infobox) =>
        infobox.id === id ? { ...infobox, editOn: true } : infobox
      )
    );
  };

  //삭제 버튼
  const handleDelete = (index) => {
    setDummyData((prevInfoboxData) =>
      prevInfoboxData.filter((_, i) => i !== index)
    );
  };

  //저장 버튼
  const handleSave = () => {
    setDummyData((prevInfoboxData) => {
      const updatedProjectDummy = prevInfoboxData.map((infobox) =>
        infobox.editOn ? { ...infobox, editOn: false } : infobox
      );
      return updatedProjectDummy;
    });
  };

  // EditDot의 값을 정할 때 호출되는 함수
  const handleColorChange = (value) => {
    setSelectedColor(value);

    //infobox에 해당 컬러 값 추가
    setDummyData((prevInfoboxData) =>
      prevInfoboxData.map((infobox) =>
        infobox.editOn ? { ...infobox, color: value } : infobox
      )
    );
  };

  // EditTitle의 값이 변경될 때 호출되는 함수
  const handleTitleChange = (id, value) => {
    setDummyData((prevInfoboxData) =>
      prevInfoboxData.map((infobox) =>
        infobox.id === id ? { ...infobox, title: value } : infobox
      )
    );
    setIsTitleFilled(!!value); // 값이 비어 있지 않은 경우에만 isTitleFilled를 업데이트
    
  };

  //시작 날짜 세팅
  const handleStartMonthDayChange = (id, inputValue) => {
    // 입력된 날짜에서 월과 일 추출
    const match = inputValue.match(/(\d{1,2})년\s*(\d{1,2})월\s*(\d{1,2})일/);

    if (match) {
      const startyear = match[1];
      const startmonth = match[2];
      const startday = match[3];

      //DummyData에 저장
      setDummyData((prevInfoboxData) =>
        prevInfoboxData.map((infobox) =>
          infobox.id === id
            ? {
                ...infobox,
                startyear: startyear,
                startmonth: startmonth,
                startday: startday,
              }
            : infobox
        )
      );
      setIsStartDateFilled(true);
    } else {
      // 패턴이 일치하지 않을 경우 처리
      setIsStartDateFilled(false);
    }
  };

  //종료 날짜 세팅
  const handleEndMonthDayChange = (id, e) => {
    const inputValue = e;
    // 입력된 날짜에서 연도, 월과 일 추출
    const match = inputValue.match(/(\d{1,2})년\s*(\d{1,2})월\s*(\d{1,2})일/);
    if (match) {
      const endyear = match[1];
      const endmonth = match[2];
      const endday = match[3];

      //DummyData에 저장
      setDummyData((prevInfoboxData) =>
        prevInfoboxData.map((infobox) =>
          infobox.id === id
            ? {
                ...infobox,
                endyear: endyear,
                endmonth: endmonth,
                endday: endday,
              }
            : infobox
        )
      );
      setIsEndDateFilled(true);
    } else {
      // 패턴이 일치하지 않을 경우 처리
      setIsEndDateFilled(false);
    }
  };

  // EditText의 값이 변경될 때 호출되는 함수
  const handleTextChange = (id, value) => {
    setDummyData((prevInfoboxData) =>
      prevInfoboxData.map((infobox) =>
        infobox.id === id ? { ...infobox, text: value } : infobox
      )
    );
  };

  useEffect(() => {
    //버튼 여부
    setAbleBtn(isTitleFilled && isStartDateFilled && isEndDateFilled); // 제목, 시작,종료일이 채워지면 버튼 클릭 여부 키기
  }, [isTitleFilled, isStartDateFilled, isEndDateFilled]);

  return (
    <div className="schedulecontainer">
      {dummyData.map((infobox, index) =>
        infobox.editOn
          ? (infobox.startmonth == currentMonthIndex + 1 ||
            infobox.endmonth == currentMonthIndex + 1 ||
            (infobox.endmonth > currentMonthIndex + 1 &&
              currentMonthIndex + 1 > infobox.startmonth)) && (
              <div
                key={infobox.id}
                className="schedulebox"
                style={{ height: "22rem" }}
              >
                <EditTitleBox>
                  <DotEditOptions
                    infobox={infobox}
                    handleColorChange={handleColorChange}
                    colorOptionList={colorOptionList}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                  />
                  <EditTitle
                    value={infobox.title}
                    onChange={(e) =>
                      handleTitleChange(
                        infobox.id,
                        e.target.value
                      )
                    }
                  />
                  <span
                    className="scheduleedit"
                    onClick={handleSave}
                    style={{
                      marginLeft: "7rem",
                      ...(ableBtn //해당 btn이 false이 off하기
                        ? {}
                        : { pointerEvents: "none", opacity: 0.5 }),
                    }}
                  >
                    저장
                  </span>
                </EditTitleBox>
                <EditDateBox>
                  <EditDate
                    defaultValue={`${infobox.startyear}년 ${infobox.startmonth}월 ${infobox.startday}일`}
                    onChange={(e) =>
                      handleStartMonthDayChange(infobox.id, e.target.value)
                    }
                    style={{ marginRight: "0.8rem" }}
                  />
                  <span>~</span>
                  <EditDate
                    defaultValue={`${infobox.endyear}년 ${infobox.endmonth}월 ${infobox.endday}일`}
                    onChange={(e) =>
                      handleEndMonthDayChange(infobox.id, e.target.value)
                    }
                    style={{ marginLeft: "0.8rem" }}
                  />
                </EditDateBox>
                <EditText
                  placeholder="메모(선택)"
                  type="text"
                  value={infobox.text}
                  onChange={(e) => handleTextChange(infobox.id, e.target.value)}
                />
              </div>
            )
          : //수정하기 전 상태
            (infobox.startmonth == currentMonthIndex + 1 ||
              infobox.endmonth == currentMonthIndex + 1 ||
              (infobox.endmonth > currentMonthIndex + 1 &&
                currentMonthIndex + 1 > infobox.startmonth)) && (
              <div key={infobox.id} className="schedulebox">
                <div className="schduletitlecontainer">
                  <StyledSVG>
                    <circle cx="6" cy="6" r="6" fill={infobox.color} />
                  </StyledSVG>

                  <div className="scheduletitle">{infobox.title}</div>
                  <div className="scheduleeditbox">
                    <span
                      className="scheduleedit"
                      onClick={() => handleEdit(infobox.id)}
                    >
                      수정
                    </span>
                    <span> | </span>
                    <span
                      className="scheduleedit"
                      onClick={() => handleDelete(index)}
                    >
                      삭제
                    </span>
                  </div>
                </div>
                <div className="scheduledate">
                  {infobox.startyear}년 {infobox.startmonth}월{" "}
                  {infobox.startday}일 ~ {infobox.endyear}년 {infobox.endmonth}
                  월 {infobox.endday}일
                </div>
                <div className="scheduletext">{infobox.text}</div>
              </div>
            )
      )}
      <div className="schedulebuttoncontainer">
        <div
          className="schedulebuttonfinish"
          onClick={handleScheduleEditFinish}
        >
          편집 완료하기
        </div>
      </div>
    </div>
  );
}
