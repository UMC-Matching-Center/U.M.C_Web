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
  evaluateAppAPI,
  evaluateSaveAPI,
  myEvaluationAPI,
} from "./evaluateAPI.js";
import { viewAppAPI, appPassAPI, appFailAPI } from "./applyStatusAPI.js";
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
import {
  landingWriteAPI,
  landingModifyAPI,
  landingImageUploadAPI,
  landingDetailAPI,
} from "./landingAPI.js";
import {
  noticeListAPI,
  noticeDetailAPI,
  noticeUploadAPI,
  noticeModifyAPI,
} from "./noticeAPI.js";
import { alramConfirmAPI, alramListAPI, alramDeleteAPI } from "./alramAPI.js";

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
  evaluateAppAPI, //팀원 상호평가 조회 API
  evaluateSaveAPI, //팀원 상호평가 저장 API
  myEvaluationAPI, //내 평가 보기 API
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
  landingWriteAPI, // 랜딩 페이지 작성
  landingModifyAPI, // 랜딩 페이지 수정
  landingImageUploadAPI, // 랜딩 페이지 이미지 업로드
  landingDetailAPI, // 랜딩 페이지 조회
  noticeListAPI, // 공지사항 리스트 조회
  noticeDetailAPI, // 공지사항 상세 조회
  noticeUploadAPI, // 공지사항 업로드
  noticeModifyAPI, // 공지사항 수정
  alramConfirmAPI, // 알람 확인
  alramListAPI, // 알람 리스트 조회
  alramDeleteAPI, // 알람 삭제
};
