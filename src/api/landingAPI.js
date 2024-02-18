import { privateAxios } from "../utils/customAxios.js";
import errorCode from "./errorCode.js";

export const landingWriteAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  postData
) => {
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).post(
      `/myProject/landingpage`,
      postData
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    if (err.response) {
      response.message = errorCode(err);
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};

export const landingModifyAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  landingPageId,
  postData
) => {
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };
  console.log(postData);
  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).patch(
      `/myProject/landingpage/${landingPageId}`,
      postData
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    if (err.response) {
      response.message = errorCode(err);
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};

// 랜딩페이지 조회
export const landingDetailAPI = async (accessToken, dispatch, autoLogin) => {
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
    project: {},
  };

  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).get(
      `/myProject/landingpage`
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
      response.project = data.result;
    }
  } catch (err) {
    response.isSuccess = false;
    if (err.response && err.response.data.code === "MYPROJECT4003") {
      response.message = errorCode(err);
      response.project = null;
    } else if (err.response && err.response.data.code === "PROJECT4001") {
      response.message = errorCode(err);
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};

// 이미지 업로드
export const landingImageUploadAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  image
) => {
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지,
    imageId: 0, // 이미지 아이디
    s3Image: "", // 이미지 URL
  };

  let formData = new FormData();
  formData.append("file", image);

  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).post(
      `/upload`,
      formData
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
      response.imageId = data.result.imageId;
      response.s3Image = data.result.s3Image;
    }
  } catch (err) {
    response.isSuccess = false;
    if (err.response) {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};
