import { privateAxios } from "../utils/customAxios.js";
import errorCode from "./errorCode.js";

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
    response.message = errorCode(err);
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
    response.message = errorCode(err);
  }

  return response;
};
