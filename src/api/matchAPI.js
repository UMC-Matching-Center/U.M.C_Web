import { privateAxios } from "../utils/customAxios.js";

export const matchListAPI = async (accessToken, dispatch, autoLogin, page) => {
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
    projectList: [],
  };

  //서버로 현재 매칭 프로젝트 조회 요청
  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).get(
      `/matchings?page=${page}`
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
      response.projectList = data.result.projectList;
    }
  } catch (err) {
    response.isSuccess = false;
    if (
      err.response &&
      (err.response.data.code === "AUTH006" ||
        err.response.data.code === "AUTH004" ||
        err.response.data.code === "AUTH003")
    ) {
      response.message = err.response.data.message;
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};

export const matchDetailAPI = async (accessToken, dispatch, autoLogin, id) => {
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
    project: {},
  };

  //서버로 현재 매칭 프로젝트 조회 요청
  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).get(
      `/matchings/${id}`
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
      response.project = data.result;
    }
  } catch (err) {
    response.isSuccess = false;
    if (
      err.response &&
      (err.response.data.code === "AUTH006" ||
        err.response.data.code === "AUTH004" ||
        err.response.data.code === "AUTH003")
    ) {
      response.message = err.response.data.message;
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};

// 이미지 업로드
export const matchImageUploadAPI = async (
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

// 지원하기
export const matchApplyAPI = async (accessToken, dispatch, autoLogin, id) => {
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지,
  };

  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).post(
      `/apply/${id}`
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    if (
      err.response &&
      (err.response.data.code === "APPLY4002" ||
        err.response.data.code === "APPLY4001")
    ) {
      response.message = err.response.data.message;
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }
  return response;
};

// 생성
export const matchPostUploadAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  postData
) => {
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지,
    title: "",
  };

  //서버로 현재 매칭 프로젝트 조회 요청
  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).post(
      `/matchings/projects`,
      postData
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
      response.title = data.result.name;
    }
  } catch (err) {
    response.isSuccess = false;
    if (
      err.response &&
      (err.response.data.code === "AUTH003" ||
        err.response.data.code === "AUTH004" ||
        err.response.data.code === "AUTH006")
    ) {
      response.message = err.response.data.message;
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};

// 수정
export const matchPostModifyAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  projectId,
  postData
) => {
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지,
  };

  //서버로 현재 매칭 프로젝트 조회 요청
  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).patch(
      `/matchings/projects/${projectId}`,
      postData
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    if (
      err.response &&
      (err.response.data.code === "AUTH003" ||
        err.response.data.code === "AUTH004" ||
        err.response.data.code === "AUTH006")
    ) {
      response.message = err.response.data.message;
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};

/*----- Q&A 관련 -----*/
export const matchQAListAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  projectId
) => {
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
    qnaList: [],
  };

  //서버로 현재 매칭 프로젝트 조회 요청
  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).get(
      `/qna/${projectId}`
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
      response.qnaList = data.result.qnaList;
    }
  } catch (err) {
    response.isSuccess = false;
    if (
      err.response &&
      (err.response.data.code === "JWT4001" ||
        err.response.data.code === "MEMBER4001" ||
        err.response.data.code === "JWT4002")
    ) {
      response.message = err.response.data.message;
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};

export const matchQuestionUploadAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  projectId,
  question
) => {
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
    questionId: 0,
  };

  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).post(
      `/qna/${projectId}`,
      { question: question }
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
      response.questionId = data.result.questionId;
    }
  } catch (err) {
    response.isSuccess = false;
    if (
      err.response &&
      (err.response.data.code === "JWT4001" ||
        err.response.data.code === "MEMBER4001" ||
        err.response.data.code === "JWT4002")
    ) {
      response.message = err.response.data.message;
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};

export const matchQADeleteAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  questionId
) => {
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
    qnaList: [],
  };

  //서버로 현재 매칭 프로젝트 조회 요청
  try {
    const { data } = await privateAxios(
      accessToken,
      dispatch,
      autoLogin
    ).delete(`/qna/${questionId}`);
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    if (
      err.response &&
      (err.response.data.code === "JWT4001" ||
        err.response.data.code === "MEMBER4001" ||
        err.response.data.code === "JWT4002")
    ) {
      response.message = err.response.data.message;
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};

export const matchAnswerUploadAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  questionId,
  answer
) => {
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).patch(
      `/qna/${questionId}`,
      { answer: answer }
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
        err.response.data.code === "MEMBER4001" ||
        err.response.data.code === "JWT4002")
    ) {
      response.message = err.response.data.message;
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};
