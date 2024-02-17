import { privateAxios } from "../utils/customAxios.js";
import errorCode from "./errorCode.js";

//내 프로젝트 내 지원자 현황 보기
export const viewAppAPI = async (accessToken, dispatch, autoLogin) => {
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
    totalMatchingData: {}, //전체 매칭 데이터
    partMatchingData: [], //파트 매칭 데이터
    competitionRate: "", //경쟁률
    appInfoList: [], //지원 리스트
  };

  //매칭 일정
  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).get(
      `/myProject`
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
      response.totalMatchingData = data.result.totalMatchingResponseDTO;
      response.partMatchingData = data.result.partMatchingDTO;
      response.competitionRate = data.result.competitionRate;
      response.appInfoList = data.result.applicantInfoList;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = errorCode(err);
  }

  return response;
};

//지원자 합격 API
export const appPassAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  memberId
) => {
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).post(
      `/myProject/pass/${memberId}`
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

//지원자 불합격 API
export const appFailAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  memberId
) => {
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).post(
      `/myProject/fail/${memberId}`
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
