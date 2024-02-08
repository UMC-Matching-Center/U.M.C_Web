import { privateAxios } from "../utils/customAxios.js";

export const myPageDataAPI = async (accessToken, dispatch, autoLogin) => {
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
    profileImage: null,
    nicknameName: "",
    email: "",
    university: "",
    generation: "",
    part: "",
    office: "",
    phoneNumber: "",
    portfolio: "",
  };

  //서버로 내 정보 조회 요청
  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).get(
      "/members/mypage"
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
      response.profileImage = data.result.profileImage || null;
      response.nicknameName = data.result.name || "닉네임/이름";
      response.email = data.result.email || "test@gmail.com";
      response.university = `${data.result.universityName}학교`;
      response.generation = `${data.result.generation || "-"}기`;
      response.part = data.result.part;
      response.office = data.result.branch;
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

export const challengerWithdrawAPI = async (
  accessToken,
  dispatch,
  autoLogin
) => {
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  //서버로 내 정보 조회 요청
  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).patch(
      "/members/depart"
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
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

export const challengerModifyAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  profileImage,
  portfolio,
  phoneNumber
) => {
  let formData = new FormData();

  // UpdateMyInfoDTO에 대한 필드 추가
  formData.append(
    "updateMyInfoDTO",
    new Blob(
      [
        JSON.stringify({
          // UpdateMyInfoDTO의 필드 값들을 추가
          portfolio: portfolio === "https://" ? "" : portfolio,
          phoneNumber: phoneNumber.replace(/[^0-9]/g, ""),
        }),
      ],
      { type: "application/json" }
    )
  );

  formData.append("image", profileImage || null);

  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  //서버로 내 정보 수정 요청 (포트폴리오, 전화번호)
  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).patch(
      "/members/mypage",
      formData
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    if (
      err.response &&
      (err.response.data.code === "MEMBER4001" ||
        err.response.data.code === "MEMBER4005")
    ) {
      response.message = err.response.data.message;
    } else if (err.response && err.response?.status === 415) {
      response.message = "Unsupported Media Type";
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
    return response;
  }

  return response;
};

export const adminModifyAPI = async (
  accessToken,
  dispatch,
  autoLogin,
  profileImage,
  office,
  phoneNumber
) => {
  let formData = new FormData();

  // UpdateMyInfoDTO에 대한 필드 추가
  formData.append(
    "updateAdminInfoDTO",
    new Blob(
      [
        JSON.stringify({
          // updateAdminInfoDTO의 필드 값들을 추가
          branch: office,
          phoneNumber: phoneNumber.replace(/[^0-9]/g, ""),
        }),
      ],
      { type: "application/json" }
    )
  );

  formData.append("image", profileImage || null);

  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  //서버로 내 정보 수정 요청 (포트폴리오, 전화번호)
  try {
    const { data } = await privateAxios(accessToken, dispatch, autoLogin).patch(
      "/manage/info",
      formData
    );
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    if (
      err.response &&
      (err.response.data.code === "MEMBER4001" ||
        err.response.data.code === "MEMBER4005")
    ) {
      response.message = err.response.data.message;
    } else if (err.response && err.response?.status === 415) {
      response.message = "Unsupported Media Type";
    } else {
      response.message = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
    return response;
  }

  return response;
};
