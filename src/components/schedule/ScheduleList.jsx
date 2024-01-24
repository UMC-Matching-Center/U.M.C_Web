import React, { useState } from "react";
import ScheduleDetail from "./schedulelist/ScheduleDetail";
import ScheduleEdit from "./schedulelist/ScheduleEdit";
import ScheduleAdd from "./schedulelist/ScheduleAdd";

export default function ScheduleList({
  currentMonthIndex,
  colorOptionList,
  dummyData,
  setDummyData,
  formData,
  setFormData,
  setAbleEdit
}) {
  const [scheduleAdd, setScheduleAdd] = useState(false);
  const [scheduleEdit, setScheduleEdit] = useState(false);

  const handleScheduleEdit = () => {
    setScheduleEdit(true);
  };

  const handleScheduleEditFinish = () => {
    setDummyData((prevInfoboxData) => {
      const updatedProjectDummy = prevInfoboxData.map((infobox) =>
        infobox.editOn ? { ...infobox, editOn: false } : infobox
      );
      return updatedProjectDummy;
    });
    setScheduleEdit(false);
  };
  const handleScheduleAdd = () => {
    // 추출된 값을 사용하여 새 일정 객체 생성
    const newSchedule = {
      id: dummyData.length + 1,
      title: formData.title,
      color: formData.color,
      startyear : formData.startyear,
      startmonth: formData.startmonth, 
      startday: formData.startday, 
      endyear: formData.endyear,
      endmonth: formData.endmonth, 
      endday: formData.endday,
      text: formData.memo,
    };

    setDummyData((prevDummyData) => [...prevDummyData, newSchedule]);

    // 새로운 스케줄 추가 후 폼 초기화
    setFormData({
      title: "",
      color: "#DCDEEE",
      startyear : "",
      startmonth: "",
      startday: "",
      endyear : "",
      endmonth: "",
      endday: "",
      memo: "",
    });
    setScheduleAdd(!scheduleAdd);
  };
  //추가하기 누를 시 컴포넌트 이동 및 취소하기 누를 시 다시 돌아가게끔 설정 및 데이터 초기화
  const handlemoveScheduleAdd = () => {
    setFormData({
      title: "",
      color: "#DCDEEE",
      startyear : "",
      startmonth: "",
      startday: "",
      endyear : "",
      endmonth: "",
      endday: "",
      memo: "",
    });
    setScheduleAdd(!scheduleAdd);
  };
  return (
    <>
      {scheduleAdd ? (
        <ScheduleAdd
          handleScheduleAdd={handleScheduleAdd}
          handlemoveScheduleAdd={handlemoveScheduleAdd}
          colorOptionList={colorOptionList}
          formData={formData}
          setFormData={setFormData}
        />
      ) : scheduleEdit ? (
        <ScheduleEdit
          handleScheduleEditFinish={handleScheduleEditFinish}
          currentMonthIndex={currentMonthIndex}
          colorOptionList={colorOptionList}
          dummyData={dummyData}
          setDummyData={setDummyData}
          setAbleEdit={setAbleEdit}
        />
      ) : (
        <ScheduleDetail
          handlemoveScheduleAdd={handlemoveScheduleAdd}
          handleScheduleEdit={handleScheduleEdit}
          currentMonthIndex={currentMonthIndex}
          colorOptionList={colorOptionList}
          dummyData={dummyData}
        />
      )}
    </>
  );
}
