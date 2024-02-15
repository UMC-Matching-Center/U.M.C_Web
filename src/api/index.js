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
import {
  scheduleEditAPI,
  scheduleDeleteAPI,
  scheduleAddAPI,
  scheduleDataAPI,
} from "./scheduleAPI.js";
import {
  reviewAppAPI,
  reviewSaveAPI,
} from "./reviewAPI.js"
import { viewAppAPI, appPassAPI, appFailAPI } from "./viewstatusAPI.js";
import {
  matchListAPI,
  matchDetailAPI,
  matchImageUploadAPI,
  matchApplyAPI,
  matchPostUploadAPI,
  matchPostModifyAPI,
  matchQAListAPI,
  matchQuestionUploadAPI,
  matchQADeleteAPI,
  matchAnswerUploadAPI,
} from "./matchAPI.js";
import { obProjectListAPI, obProjectDetailAPI } from "./obProjectAPI.js";

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
  scheduleEditAPI, //일정 수정 API
  scheduleDeleteAPI, // 일정 삭제 API
  scheduleAddAPI, ///일정 추가 API
  scheduleDataAPI, //일정 조회 API
  reviewAppAPI, //팀원 상호평가 조회 API
  reviewSaveAPI, //팀원 상호평가 저장 API
  viewAppAPI, //지원 현황보기 API
  appPassAPI, //지원자 합격 API
  appFailAPI, //지원자 불합격 API
  matchListAPI, // 매칭 프로젝트 리스트 정보
  matchDetailAPI, // 매칭 프로젝트 상세 정보
  matchImageUploadAPI, // 매칭 이미지 업로드
  matchApplyAPI, // 매칭 프로젝트 지원하기
  matchPostUploadAPI, // 매칭 프로젝트 업로드
  matchPostModifyAPI, // 매칭 프로젝트 수정
  matchQAListAPI, // 매칭 프로젝트 Q&A 리스트
  matchQuestionUploadAPI, // Q&A 새로운 질문 업로드
  matchQADeleteAPI, // Q&A 삭제
  matchAnswerUploadAPI, // Q&A 새로운 답변 등록
  obProjectListAPI, // OB 프로젝트 리스트 조회
  obProjectDetailAPI, // OB 프로젝트 상세 조회
};
