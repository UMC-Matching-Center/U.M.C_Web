import axios from "axios";
import { getCookieToken } from "../utils/cookies";
import { SET_LOCAL_TOKEN } from "../modules/localToken";
import { SET_SESSION_TOKEN } from "../modules/sessionToken";
import { USER_AUTO_LOGIN } from "../modules/userInfo";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ADDRESS = process.env.REACT_APP_API_ADDRESS;

const createPublicAxios = () => {
  return axios.create({
    baseURL: `${ADDRESS}`,
  });
};
const publicAxios = createPublicAxios();

const createRefreshAxios = () => {
  const refreshToken = getCookieToken();
  return axios.create({
    baseURL: `${ADDRESS}/members/renewal/accessToken`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  });
};
const refreshAxios = createRefreshAxios();

const createPrivateAxios = (accessToken, dispatch) => {
  const privateInstance = axios.create({
    baseURL: `${ADDRESS}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  privateInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      console.log("error", error);

      // 토큰 없거나 만료일 경우 토큰 재발급
      if (
        error &&
        (error.response.data.code === "JWT4002" || // 자격증명이 유효하지 않을 때 (토큰이 없을 때)
          error.response.data.code === "JWT4003" || // 만료된 jwt 토큰일 때
          error.response.data.code === "JWT4004") // 잘못된 jwt 서명일 때 (토큰이 변조되었을 때)
      ) {
        //   error
        // ) {
        const originRequest = error.config; // 원래 요청 정보
        const requestResponse = await refreshAxios.post(); // 토큰 재발급 요청
        if (requestResponse.data.code === "COMMON200") {
          // 토큰 재발급 성공 시 토큰 저장
          const accessToken = requestResponse.data.result.accessToken;
          dispatch(
            USER_AUTO_LOGIN({
              role: requestResponse.data.result.memberRole,
              part: requestResponse.data.result.part,
            })
          );
          useSelector((state) => state.userInfo.autoLogin) === "true"
            ? dispatch(SET_LOCAL_TOKEN(accessToken))
            : dispatch(SET_SESSION_TOKEN(accessToken));
          //진행중이던 요청 이어서하기
          originRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originRequest);
        } else {
          Link("/register");
        }
      } else if (error.response.data.code === "JWT4001") {
        // 권한이 존재하지 않을 때
        alert("권한이 존재하지 않습니다.");
      } else {
        Link("/register");
      }
      return error;
    }
  );

  return privateInstance;
};

const privateAxios = (accessToken, dispatch) =>
  createPrivateAxios(accessToken, dispatch);

export { publicAxios, refreshAxios, privateAxios };
