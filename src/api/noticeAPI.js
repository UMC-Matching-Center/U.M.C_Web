import { privateAxios } from "../utils/customAxios.js";

export const noticeListAPI = async (accessToken, dispatch, autoLogin) => {
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
    noticeList: [],
  };

  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).get(
      `/notices`
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
      response.noticeList = data.result.noticeList;
    }
  } catch (err) {
    response.isSuccess = false;
    if (err.response && err.response.data.code === "NOTICE4001") {
      response.message = err.response.data.message;
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};

export const noticeDetailAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  noticeId
) => {
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
    notice: {},
  };

  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).get(
      `/notices/${noticeId}`
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
      response.notice = data.result;
    }
  } catch (err) {
    response.isSuccess = false;
    if (err.response && err.response.data.code === "NOTICE4001") {
      response.message = err.response.data.message;
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};

export const noticeUploadAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  formData
) => {
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).post(
      `/notices`,
      formData
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    if (err.response) {
      response.message = err.response.data.message;
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};

export const noticeModifyAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  noticeId,
  formData
) => {
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).patch(
      `/notices/${noticeId}`,
      formData
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    if (err.response && err.response.data.code === "NOTICE4001") {
      response.message = err.response.data.message;
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};
