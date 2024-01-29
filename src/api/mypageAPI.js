import { privateAxios } from "../utils/customAxios.js";

export const challengerDataAPI = async (accessToken, dispatch) => {
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
    nicknameName: "",
    email: "",
    university: "",
    generation: "",
    part: "",
    phoneNumber: "",
    portfolio: "",
  };

  //서버로 내 정보 조회 요청
  try {
    const { data } = await privateAxios(accessToken, dispatch).get(
      "/members/mypage"
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
      response.nicknameName = data.result.nicknameName || "닉네임/이름";
      response.email = data.result.email || "test@gmail.com";
      response.university = `${data.result.universityName}학교`;
      response.generation = `${data.result.generation || "-"}기`;
      response.part = data.result.part;
      response.phoneNumber = data.result.phoneNumber;
      response.portfolio = data.result.portfolio || "https://";
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
