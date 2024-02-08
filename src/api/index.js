import { loginAPI } from "./loginAPI.js";
import {
  signupAPI,
  idCheckAPI,
  emailRequestAPI,
  emailCodeCheckAPI,
} from "./signupAPI.js";
import {
  myPageDataAPI,
  challengerWithdrawAPI,
  challengerModifyAPI,
  adminModifyAPI,
} from "./mypageAPI.js";
import {
  challengerListAPI,
  challengerMatchingAPI,
  challengerExpelAPI,
  signupListAPI,
  signupAcceptAPI,
  signupRejectAPI,
} from "./challengerAPI.js";

export {
  loginAPI, // 로그인
  signupAPI, // 회원가입
  idCheckAPI, // ID 중복 체크
  emailRequestAPI, // email 인증 요청
  emailCodeCheckAPI, // email 인증 코드 확인
  myPageDataAPI, // 내 정보 조회
  challengerWithdrawAPI, // 챌린저 탈퇴 (자의)
  challengerModifyAPI, // 챌린저 정보 수정
  adminModifyAPI, // 관리자 정보 수정
  challengerListAPI, // 챌린저 리스트 조회
  challengerMatchingAPI, // 챌린저의 매칭
  challengerExpelAPI, // 챌린저 탈퇴 (관리자)
  signupListAPI, // 챌린저 신청 리스트 조회
  signupAcceptAPI, //챌린저 신청 승인
  signupRejectAPI, // 챌린저 신청 거절
};
