import { privateAxios } from "../utils/customAxios.js";
import errorCode from "./errorCode.js";

export const alramConfirmAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  alarmId
) => {
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).patch(
      `/alarms/${alarmId}`
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = errorCode(err);
  }

  return response;
};

export const alramListAPI = async (accessToken, dispatch, autoLogin) => {
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
    alarmList: [], //알람 데이터
    listSize: 0, //알람 데이터 사이즈
  };

  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).get(
      `/alarms`
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
      response.alarmList = data.result.alarmList;
      response.listSize = data.result.listSize;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = errorCode(err);
  }

  return response;
};

export const alramDeleteAPI = async (accessToken, dispatch, autoLogin) => {
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  try {
    const { data } = await privateAxios(
      accessToken,
      dispatch,
      autoLogin
    ).delete(`/alarms`);
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = errorCode(err);
  }

  return response;
};
