import { privateAxios } from "../utils/customAxios.js";

/* --- 챌린저 관리 --- */
export const challengerListAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  matchingStatus,
  page
) => {
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
    list: [],
  };

  //서버로 내 정보 조회 요청
  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).get(
      matchingStatus === ""
        ? `/manage/challenger?page=${page}`
        : `manage/challenger?matchingStatus=${matchingStatus}&page=${page}`
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
      response.list = data.result;
    }
  } catch (err) {
    response.isSuccess = false;
    if (
      err.response &&
      (err.response.data.code === "JWT4001" ||
        err.response.data.code === "JWT4002")
    ) {
      response.message = err.response.data.message;
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};

export const challengerMatchingAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  memberName
) => {
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
    round: [],
  };

  //서버로 내 정보 조회 요청
  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).get(
      `/manage/challenger/${memberName}`
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
      response.round = data.result;
    }
  } catch (err) {
    response.isSuccess = false;
    if (
      err.response &&
      (err.response.data.code === "JWT4001" ||
        err.response.data.code === "JWT4002")
    ) {
      response.message = err.response.data.message;
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};

export const challengerExpelAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  memberName
) => {
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  //서버로 내 정보 조회 요청
  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).post(
      `/manage/challenger/depart/${memberName}`
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    if (
      err.response &&
      (err.response.data.code === "JWT4001" ||
        err.response.data.code === "JWT4002")
    ) {
      response.message = err.response.data.message;
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};

/* --- 신규 챌린저 --- */
export const signupListAPI = async (accessToken, dispatch, autoLogin, page) => {
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
    list: [],
  };

  //서버로 내 정보 조회 요청
  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).get(
      `/manage/challenger/signup-requests?page=${page}`
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
      response.list = data.result;
    }
  } catch (err) {
    response.isSuccess = false;
    if (
      err.response &&
      (err.response.data.code === "JWT4001" ||
        err.response.data.code === "JWT4002")
    ) {
      response.message = err.response.data.message;
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};

export const signupAcceptAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  memberID
) => {
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  //서버로 내 정보 조회 요청
  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).post(
      `/manage/challenger/signup-requests/${memberID}/accept`
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    if (
      err.response &&
      (err.response.data.code === "JWT4001" ||
        err.response.data.code === "JWT4002")
    ) {
      response.message = err.response.data.message;
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};

export const signupRejectAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  memberID
) => {
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  //서버로 내 정보 조회 요청
  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).post(
      `/manage/challenger/signup-requests/${memberID}/reject`
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    if (
      err.response &&
      (err.response.data.code === "JWT4001" ||
        err.response.data.code === "JWT4002")
    ) {
      response.message = err.response.data.message;
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};
