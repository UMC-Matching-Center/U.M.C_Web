import React, { useState } from "react";
import ScheduleDetail from "./schedulelist/ScheduleDetail";
import ScheduleEdit from "./schedulelist/ScheduleEdit";
import ScheduleAdd from "./schedulelist/ScheduleAdd";
import { scheduleAddAPI } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import useGetAccessToken from "../../utils/getAccessToken";

export default function ScheduleList({
  currentMonthIndex,
  currentYearIndex,
  colorOptionList,
  dummyData,
  setDummyData,
  formData,
  setFormData
}) {
  const dispatch = useDispatch();
  const accessToken = useGetAccessToken();
  const { autoLogin } = useSelector((state) => state.userInfo);
  currentYearIndex=currentYearIndex-2000; //해당 24년도로 변환해서 처리하기 위해
  const [scheduleAdd, setScheduleAdd] = useState(false);
  const [scheduleEdit, setScheduleEdit] = useState(false);
  const [editAble, setEditAble] = useState(true); //Edit 하나만 할 수 있도록 설정
  const handleScheduleEdit = () => {
    setScheduleEdit(true);
  };

  //편집 완료 버튼
  const handleScheduleEditFinish = () => {
    setDummyData((prevInfoboxData) => {
      const updatedProjectDummy = prevInfoboxData.map((infobox) =>
        infobox.editOn ? { ...infobox, editOn: false } : infobox
      );
      return updatedProjectDummy;
    });
    setEditAble(true);
    setScheduleEdit(false);
  };

  //추가하는 버튼
  const handleScheduleAdd = () => {
    // 추출된 값을 사용하여 새 일정 객체 생성
    const newSchedule = {
      scheduleId: dummyData.length + 1,
      title: formData.title,
      description: formData.description,
      scheduleColor: formData.scheduleColor,
      startYear: formData.startYear,
      startMonth: formData.startMonth,
      startDay: formData.startDay,
      endYear: formData.endYear,
      endMonth: formData.endMonth,
      endDay: formData.endDay,
    };
    console.log(newSchedule);
    scheduleAddAPI(
      accessToken,
      dispatch,
      autoLogin,
      newSchedule
    ).then((response) => {
      if (response.isSuccess) {
        console.log("추가 성공")
      } else {
        alert(response.message);
      }
    });
    // 새로운 스케줄 추가 후 폼 초기화
    setFormData({
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
    setScheduleAdd(!scheduleAdd);
  };

  //추가하기 누를 시 컴포넌트 이동 및 취소하기 누를 시 다시 돌아가게끔 설정 및 데이터 초기화
  const handlemoveScheduleAdd = () => {
    setFormData({
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
          currentYearIndex={currentYearIndex}
          colorOptionList={colorOptionList}
          dummyData={dummyData}
          setDummyData={setDummyData}
          editAble={editAble}
          setEditAble={setEditAble}
        />
      ) : (
        <ScheduleDetail
          handlemoveScheduleAdd={handlemoveScheduleAdd}
          handleScheduleEdit={handleScheduleEdit}
          currentMonthIndex={currentMonthIndex}
          currentYearIndex={currentYearIndex}
          colorOptionList={colorOptionList}
          dummyData={dummyData}
        />
      )}
    </>
  );
}
