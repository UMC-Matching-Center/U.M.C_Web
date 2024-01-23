import { setRefreshToken } from "../utils/cookies";
import { USER_LOGIN, USER_AUTO_LOGIN } from "../modules/userInfo";
import { SET_TOKEN } from "../modules/accessToken";
import { publicAxios, refreshAxios } from "../utils/customAxios.js";

export const loginAPI = async (id, pw, auto, dispatch) => {
  //서버로 보낼 데이터
  const body = {
    memberName: id,
    password: pw,
  };

  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  //서버로 로그인 요청
  try {
    const { data } = await publicAxios.post("/members/login", body);
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
      dispatch(
        USER_LOGIN({
          role: data.result.memberRole,
          name: data.result.memberName,
          autoLogin: auto,
        })
      );
      dispatch(SET_TOKEN(data.result.accessToken));
      setRefreshToken(data.result.refreshToken);
    }
  } catch (err) {
    response.isSuccess = false;
    if (
      err.response &&
      (err.response.data.code === "MEMBER4001" ||
        err.response.data.code === "MEMBER4002")
    ) {
      response.message = err.response.data.message;
    } else {
      alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }

  return response;
};

export const autoLoginAPI = async (dispatch) => {
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  //서버로 로그인 요청
  try {
    const { data } = await refreshAxios.post("members/renewal/accessToken");
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
      dispatch(
        USER_AUTO_LOGIN({
          role: data.result.memberRole,
          name: data.result.memberName,
        })
      );
    }
  } catch (err) {
    response.isSuccess = false;
    if (
      err.response &&
      (err.response.data.code === "JWT4001" ||
        err.response.data.code === "JWT4005")
    ) {
      response.message = err.response.data.message;
    } else {
      alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }

  return response;
};
