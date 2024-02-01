import { loginAPI } from "./loginAPI.js";
import {
  signupAPI,
  idCheckAPI,
  emailRequestAPI,
  emailCodeCheckAPI,
} from "./signupAPI.js";
import {
  myPageDataAPI,
  challengerWithdrawalAPI,
  challengerModifyAPI,
  adminModifyAPI,
} from "./mypageAPI.js";

export {
  loginAPI, // 로그인
  signupAPI, // 회원가입
  idCheckAPI, // ID 중복 체크
  emailRequestAPI, // email 인증 요청
  emailCodeCheckAPI, // email 인증 코드 확인
  myPageDataAPI, // 내 정보 조회
  challengerWithdrawalAPI, // 챌린저 탈퇴 (자의)
  challengerModifyAPI, // 챌린저 정보 수정
  adminModifyAPI, // 관리자 정보 수정
};
