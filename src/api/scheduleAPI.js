import { privateAxios } from "../utils/customAxios.js";

//일정 수정 API
export const scheduleEditAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  scheduleId,
  editSchedule
) => {
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  //매칭 일정
  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).put(
      `/schedules/manage/${scheduleId}`,
      editSchedule
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    if (err.response && err.response.data.code === "MEMBER4001") {
      response.message = err.response.data.message;
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};

//일정 삭제 API
export const scheduleDeleteAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  scheduleId
) => {
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  //매칭 일정
  try {
    const { data } = await privateAxios(
      accessToken,
      dispatch,
      autoLogin
    ).delete(`/schedules/manage/${scheduleId}`);
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    if (err.response && err.response.data.code === "MEMBER4001") {
      response.message = err.response.data.message;
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};

//일정 생성 API
export const scheduleAddAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  newSchedule
) => {
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  //서버로 스케줄 일정 생성
  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).post(
      "/schedules/manage",
      newSchedule
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    if (err.response && err.response.data.code === "MEMBER4001") {
      response.message = err.response.data.message;
    } else {
      response.message =
        "알 수 없는 오류가 발생했습니다. 다시 시도해주세요. 일정 생성 실패";
    }
  }

  return response;
};

//일정 조회 API
export const scheduleDataAPI = async (accessToken, dispatch, autoLogin) => {
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
    scheduleList: [],
  };

  //서버로 스케줄 일정 요청
  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).get(
      "/schedules"
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
      response.scheduleList = data.result.scheduleList;
    }
  } catch (err) {
    response.isSuccess = false;
    if (err.response && err.response.data.code === "MEMBER4001") {
      response.message = err.response.data.message;
    } else {
      response.message =
        "알 수 없는 오류가 발생했습니다. 다시 시도해주세요. 일정 조회 실패";
    }
  }

  return response;
};
