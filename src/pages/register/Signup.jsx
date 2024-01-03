import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./Register.css";
import {
  IconEyeOff,
  IconEye,
  IconCheck,
  IconSquare,
  IconSquareCheckFilled,
} from "@tabler/icons-react";

// input간 간격
const InputGap = styled.div`
  margin-top: 2.4rem;
`;

const EmailArea = styled.div`
  display: flex;
  flex-direction: row;
`;

// 이메일 input 태그 관련 영역
const EmailInputArea = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

// 이메일 인증 버튼
const EmailAuth = styled.button`
  border: 1px solid #6b6880;
  background-color: #fafafa00;
  font-size: 1rem;
  color: #6b6880;
  box-sizing: border-box;
  width: 2.6rem;
  height: 100%;
  padding: 0;
  margin-left: 0.6rem;
`;

// 비밀번호 영역
const PwArea = styled.div`
  display: flex;
  align-items: center;
`;

// 비밀번호 조건들을 포함한 영역
const PwConditionArea = styled.div`
  display: flex;
  flex-direction: row;
`;

// 비밀번호 각 조건 영역
const PwCondition = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 1rem;
    height: 1rem;
    stroke-width: 0.1rem;
  }

  span {
    font-size: 0.6rem;
    margin-right: 0.5rem;
  }
`;

export default function Signup() {
  const [id, setId] = useState(""); //ID 세팅
  const [idValid, setIdValid] = useState(-1); //ID Email 유효 (-1: 초기 설정, 0: 형식 불일치•비인증, 1: 형식 일치•비인증, 2: 형식 일치•인증)
  const [idAuth, setIdAuth] = useState(false); //ID Auth 확인

  const [pw, setPw] = useState(""); //비밀번호 세팅
  const [pwVisible, setPwVisible] = useState(false); //비밀번호 노출 여부
  const [pwEnglish, setPwEnglish] = useState(false); //비밀번호 영문 여부
  const [pwNumber, setPwNumber] = useState(false); //비밀번호 숫자 여부
  const [pwLength, setPwLength] = useState(false); //비밀번호 길이 여부

  const [pwEqual, setpwEqual] = useState(-1); //비밀번호 일치 확인 (-1: 초기 설정, 0: 불일치, 1: 일치)

  const [adminLogin, setAdminLogin] = useState(false); //관리자 로그인 설정
  const [ableBtn, setAbleBtn] = useState(true); //버튼 Enable 여부
  const navigate = useNavigate();

  /* ---- ID 관련 ----- */
  const handleChangeId = (e) => {
    if (idValid === -1) setIdValid(0); //ID Valid 검사 시작
    const inputId = e.target.value;
    setId(inputId);
    setIdAuth(false); //ID 작성 시 인증 여부 초기화
    setIdValid(validatEmail(inputId)); //ID 형식 여부
    //setIdAuth(AuthatEmail(inputId)); //이메일 인증 여부
  };

  //ID 형식 조건
  const validatEmail = (e) => {
    //이메일 Valid 여부
    const emailtest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailtest.test(e) ? 1 : 0; // (0: 형식 불일치•비인증, 1: 형식 일치•비인증)
  };

  //ID 인증 여부
  const onClickAuth = () => {
    //API 연동 필요!!!
    setIdAuth(!idAuth);
    if (idValid === 1 && idAuth) setIdValid(2); // (2: 형식 일치•인증)
    else setIdValid(1); // (1: 형식 일치•비인증)
  };

  /* ---- PW 관련 ----- */
  const handleChangePw = (e) => {
    //PW Valid 여부 확인
    const inputPw = e.target.value;
    const pwEnglishReg = /[a-zA-Z]+/;
    const pwNumberReg = /[0-9]+/;
    const pwLengtReg = /^.{8,16}$/;
    setPw(inputPw);
    pwEqual === -1 ? null : setpwEqual(0); //PW Equal 초기화
    setPwEnglish(pwEnglishReg.test(inputPw)); //영문 여부
    setPwNumber(pwNumberReg.test(inputPw)); //숫자 여부
    setPwLength(pwLengtReg.test(inputPw)); //길이 여부
  };

  //비밀번호 노출 여부
  const toggleVisible = () => {
    setPwVisible(!pwVisible);
  };

  //비밀번호 일치 여부
  const handleChangePwEqual = (e) => {
    if (pwEqual === -1) setpwEqual(0); //PW Equal 검사 시작
    const inputPwCheck = e.target.value;
    setpwEqual(pw.localeCompare(inputPwCheck) === 0 ? 1 : 0); //Equal 여부
  };

  useEffect(() => {
    //버튼 여부
    setAbleBtn(
      idValid == 2 && pwEnglish && pwNumber && pwLength && pwEqual === 1
    ); //나중에 인증기능 추가시 && idAuth 추가
  }, [idValid, pwEnglish, pwNumber, pwLength, pwEqual]); // 동일하게 ", idAuth" 추가

  //관리자 로그인 설정 및 상태를 반전시켜 업데이트
  const handleAdminLogin = () => {
    setAdminLogin(!adminLogin);
  };

  //회원가입 제출 후 다음으로 이동
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("../detail", { state: { id: id, pw: pw } });
  };

  return (
    <div className="Container">
      <div className="MainBox">
        {/* 좌측 로고 부분 */}
        <div className="CoverBox">
          UMC
          <br />
          Matching
          <br />
          Center
        </div>

        {/* 우측 회원가입 부분 */}
        <div className="FormBox">
          {/* 제목 */}
          <div className="FormTitle">회원가입</div>

          {/* 공통 회원가입 폼 */}
          <div className="FormDetail">
            <div style={{ width: "100%" }}>
              {/* 이메일(아이디) 관련 */}
              <EmailArea>
                <EmailInputArea>
                  <input
                    className="FormInput"
                    type="email"
                    placeholder="이메일(아이디)"
                    value={id}
                    onChange={handleChangeId}
                  />
                  <div className="FormInputUnderline" />
                </EmailInputArea>
                <EmailAuth onClick={onClickAuth} disabled={idValid !== 1}>
                  인증
                </EmailAuth>
              </EmailArea>
              <div
                className="ValidText"
                style={{
                  visibility: idValid === -1 ? "hidden" : "visible",
                  color: idValid === 2 ? "#014171" : "#d62117",
                }}
              >
                {idValid == 2
                  ? "이메일이 인증되었습니다."
                  : idValid == 1
                    ? "이메일이 인증되지 않았습니다."
                    : "이메일 형식이 정확하지 않습니다."}
              </div>
              <InputGap />

              {/* 비밀번호 관련 */}
              <PwArea>
                <input
                  className="FormInput"
                  type={pwVisible ? "text" : "password"}
                  placeholder="비밀번호"
                  value={pw}
                  onChange={handleChangePw}
                />
                {!pwVisible ? (
                  <IconEyeOff className="PasswordEye" onClick={toggleVisible} />
                ) : (
                  <IconEye className="PasswordEye" onClick={toggleVisible} />
                )}
              </PwArea>
              <div
                className="FormInputUnderline"
                style={{ minHeight: "0.2rem" }}
              />

              {/* 비밀번호 조건 관련 */}
              <PwConditionArea>
                <PwCondition
                  style={{ color: pwEnglish ? "#014171" : "#d62117" }}
                >
                  <IconCheck /> <span>영문</span>
                </PwCondition>
                <PwCondition
                  style={{ color: pwNumber ? "#014171" : "#d62117" }}
                >
                  <IconCheck /> <span>숫자</span>
                </PwCondition>
                <PwCondition
                  style={{ color: pwLength ? "#014171" : "#d62117" }}
                >
                  <IconCheck /> <span>8~16자</span>
                </PwCondition>
              </PwConditionArea>
              <InputGap />

              {/* 비밀번호 확인 관련 */}
              <input
                className="FormInput"
                type="password"
                placeholder="비밀번호 확인"
                onInput={handleChangePwEqual}
              />
              <div className="FormInputUnderline" />
              <div
                className="ValidText"
                style={{
                  visibility: pwEqual === -1 ? "hidden" : "visible",
                  color: pwEqual === 1 ? "#014171" : "#d62117",
                }}
              >
                {pwEqual === 1
                  ? "비밀번호가 일치합니다."
                  : "비밀번호가 일치하지 않습니다."}
              </div>

              {/* 관리자 회원가입 여부 */}
              <div className="FormCheckArea">
                <input
                  id="adminLogin"
                  type="checkbox"
                  checked={adminLogin}
                  onChange={handleAdminLogin}
                />
                <label htmlFor="adminLogin" className="FormCheckCustom">
                  {adminLogin ? (
                    <IconSquareCheckFilled
                      htmlFor="autoLogin"
                      className="FormCheckCustom"
                    />
                  ) : (
                    <IconSquare
                      htmlFor="autoLogin"
                      className="FormCheckCustom"
                    />
                  )}
                </label>
                <span>관리자 회원가입</span>
              </div>

              {/* 다음 버튼 */}
              <button
                className="FormSubmitBtn"
                type="submit"
                onClick={handleSubmit}
                style={{
                  marginTop: "3.2rem",
                  backgroundColor: ableBtn ? "#014171" : "#01417180",
                }}
                disabled={!ableBtn}
              >
                다음
              </button>

              {/* 해당 페이지 기능 이외 기능 관련 */}
              <div className="FormOtherArea">
                <span>이미 계정이 있으신가요?</span>
                <span
                  onClick={() => {
                    navigate("..");
                  }}
                >
                  로그인
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
