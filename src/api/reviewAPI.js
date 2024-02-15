import { privateAxios } from "../utils/customAxios.js";

//내 프로젝트 인원들 보기
export const reviewAppAPI = async (accessToken, dispatch, autoLogin) => {
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
    reviewDataList: [], //데이터리스트
  };

  //매칭 일정
  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).get(
      "/evaluation/getTeammates"
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
      response.reviewDataList = data.result;
    }
  } catch (err) {
    response.isSuccess = false;
    if (
      err.response &&
      (err.response.data.code === "EVALUATION4003" ||
        err.response.data.code === "EVALUATION4002" ||
        err.response.data.code === "EVALUATION4001")
    ) {
      response.message = err.response.data.message;
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return response;
};

//상호평가 저장
export const reviewSaveAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  memberId,
  memeberData
) => {
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).post(
      `/evaluation/save/${memberId}`,
      memeberData
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    if (
      err.response &&
      (err.response.data.code === "EVALUATION4003" ||
        err.response.data.code === "EVALUATION4002" ||
        err.response.data.code === "EVALUATION4001")
    ) {
      response.message = err.response.data.message;
    } else {
      response.message =
        "알 수 없는 오류가 발생했습니다. 다시 시도해주세요. 상호평가 저장 실패 ";
    }
  }

  return response;
};
