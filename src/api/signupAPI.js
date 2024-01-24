import { publicAxios } from "../utils/customAxios.js";

// ID 중복 체크 API
export const idCheckAPI = async (id) => {
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  //서버로 로그인 요청
  try {
    const { data } = await publicAxios.post(
      `/members/duplication?memberName=${id}`
    );
    if (data.code === "MEMBER301") {
      response.isSuccess = true;
      response.message = data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    if (err.response.data.code == "MEMBER4004") {
      response.message = err.response.data.message;
    } else {
      alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }

  return response;
};

//  email 인증 요청
export const emailRequestAPI = async (email) => {
  //서버로 보낼 데이터
  const body = {
    email: email,
  };

  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
    email: "",
  };

  //서버로 로그인 요청
  try {
    const { data } = await publicAxios.post("/emails/auth-code", body);
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
      response.email = data.result.email;
    }
  } catch (err) {
    response.isSuccess = false;
    alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
  }

  return response;
};

// email 인증 코드 확인
export const emailCodeCheckAPI = async (email, authCode) => {
  //서버로 보낼 데이터
  const body = {
    email: email,
    authCode: authCode,
  };

  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  //서버로 로그인 요청
  try {
    const { data } = await publicAxios.post(
      `/emails/auth-code/certification`,
      body
    );
    if (
      data.code === "COMMON200" &&
      data.result.emailCertificationResult === "SUCCESS"
    ) {
      response.isSuccess = true;
      response.message = data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    if (err.response && err.response.data.code === "EMAIL4002") {
      response.message = err.response.data.message;
    } else {
      alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }

  return response;
};

export const signupAPI = async (
  id,
  pw,
  email,
  name,
  nickname,
  universityId,
  generation,
  part,
  phoneNumber,
  portfolio
) => {
  //서버로 보낼 데이터
  const body = {
    email: email, // 이메일
    memberName: id, // 아이디
    password: pw, // 비밀번호
    nameNickname: `${nickname}/${name}`, // 닉네임_이름
    part: part,
    universityId: universityId,
    phoneNumber: phoneNumber.replace(/[^0-9]/g, ""),
    generation: generation,
    portfolio: portfolio,
  };

  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  //서버로 로그인 요청
  try {
    const res = await publicAxios.post("/members", body);
    if (res.data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = res.data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
  }

  return response;
};
