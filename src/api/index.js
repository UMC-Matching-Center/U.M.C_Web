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
import {
  matchListAPI,
  matchDetailAPI,
  matchImageUploadAPI,
  matchPostUploadAPI,
  matchPostModifyAPI,
  matchQAListAPI,
  matchQuestionUploadAPI,
  matchQADeleteAPI,
  matchAnswerUploadAPI,
} from "./matchAPI.js";

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
  matchListAPI, // 매칭 프로젝트 리스트 정보
  matchDetailAPI, // 매칭 프로젝트 상세 정보
  matchImageUploadAPI, // 매칭 이미지 업로드
  matchPostUploadAPI, // 매칭 프로젝트 업로드
  matchPostModifyAPI, // 매칭 프로젝트 수정
  matchQAListAPI, // 매칭 프로젝트 Q&A 리스트
  matchQuestionUploadAPI, // Q&A 새로운 질문 업로드
  matchQADeleteAPI, // Q&A 삭제
  matchAnswerUploadAPI, // Q&A 새로운 답변 등록
};
