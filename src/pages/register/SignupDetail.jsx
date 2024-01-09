import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./Register.css";

// input간 간격
const InputGap = styled.div`
  margin-top: 3.2rem;
`;

// email 부분 layout
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
  padding: 0;
  margin-left: 0.6rem;
`;

const SchoolAndPartArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DropDownArea = styled.div`
  min-width: 13rem;
`;

const DropDownArrow = btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
    <path d="M1 1L5 5L9 1" stroke="#6B6880" stroke-linecap="round"/>
  </svg>`);

const DropDownSelect = styled.select`
  border: none;
  outline: none;
  font-family: KBO-Dia-Gothic;
  font-weight: 300;
  font-size: 1.2rem;
  color: #6b6880;
  background-color: #fafafa00;
  font-style: normal;
  text-align: left;
  width: 100%;
  padding: 0 0.5rem;
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url("data:image/svg+xml;base64, ${DropDownArrow}") no-repeat right
    0.5rem center/0.8rem 0.6rem;
`;

const DropDownOption = styled.option`
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  padding: 0;
`;

export default function UserSignup() {
  const [email, setEmail] = useState(""); //Email 세팅
  const [emailValid, setEmailValid] = useState(-1); //Email 유효 (-1: 초기 설정 / 0:[형식 X •인증 X] / 1:[형식 O•인증 X] / 2:[형식 O•인증 O])
  const [emailAuth, setEmailAuth] = useState(false); //ID Auth 확인
  const [name, setName] = useState(""); //이름
  const [nickname, setNickname] = useState(""); //닉네임
  const [year, setYear] = useState("기수"); //기수
  const [part, setPart] = useState("파트"); //파트
  const [phoneNumber, setPhoneNumber] = useState(""); //전화번호
  const [portfolio, setPortfolio] = useState(""); //포트폴리오 링크
  const [ableBtn, setAbleBtn] = useState(false); //회원가입 버튼
  const navigate = useNavigate();

  /* ---- Email 관련 ----- */
  const handleChangeId = (e) => {
    if (emailValid === -1) setEmailValid(0); //Email Valid 검사 시작
    const inputId = e.target.value;
    setEmail(inputId);
    setEmailAuth(false); //Email 작성 시 인증 여부 초기화
    setEmailValid(validatEmail(inputId)); //Email 형식 여부
    //setEmailAuth(AuthatEmail(inputId)); //Email 인증 여부
  };

  //Email 형식 조건
  const validatEmail = (e) => {
    //Email Valid 여부
    const emailtest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailtest.test(e) ? 1 : 0; // (0: 형식 X •인증 X, 1: 형식 O•인증 X)
  };

  //Email 인증 여부
  const onClickAuth = () => {
    //API 연동 필요!!!
    setEmailAuth(!emailAuth);
    if (emailValid === 1 && emailAuth) setEmailValid(2); // (2: 형식 일치•인증)
    else setEmailValid(1); // (1: 형식 일치•비인증)
  };

  //기수 option들 정의
  const YearDummy = [
    { value: "1st", name: "1기" },
    { value: "2nd", name: "2기" },
    { value: "3rd", name: "3기" },
    { value: "4th", name: "4기" },
    { value: "5th", name: "5기" },
  ];

  //파트들 정의
  const Parts = [
    { value: "Android", name: "Android" },
    { value: "IOS", name: "IOS" },
    { value: "Web", name: "Web(React)" },
    { value: "ServerNode", name: "Server(Node)" },
    { value: "ServerSpring", name: "Server(Spring)" },
    { value: "Design", name: "Design" },
    { value: "Plan", name: "Plan" },
  ];

  useEffect(() => {
    //이메일, 이름, 닉네임, 전화번호, 기수, 파트가 모두 정상일 때 버튼 활성화
    setAbleBtn(
      emailValid === 2 &&
        name !== "" &&
        nickname !== "" &&
        phoneNumber !== "" &&
        year !== "기수" &&
        part !== "파트"
    );
  }, [emailValid, name, nickname, phoneNumber, year, part]);

  //회원가입 제출 후 다음으로 이동
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("../complete");
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

          {/* 일반 유저 회원가입 폼 */}
          <div className="FormDetail">
            <div style={{ width: "100%" }}>
              {/* 이메일(아이디) 관련 */}
              <EmailArea>
                <EmailInputArea>
                  <input
                    className="FormInput"
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={handleChangeId}
                  />
                  <div className="FormInputUnderline" />
                </EmailInputArea>
                <EmailAuth onClick={onClickAuth} disabled={emailValid !== 1}>
                  인증
                </EmailAuth>
              </EmailArea>
              <div
                className="ValidText"
                style={{
                  visibility: emailValid === -1 ? "hidden" : "visible",
                  color: emailValid === 2 ? "#014171" : "#d62117",
                }}
              >
                {emailValid == 2
                  ? "이메일이 인증되었습니다."
                  : emailValid == 1
                    ? "이메일이 인증되지 않았습니다."
                    : "이메일 형식이 정확하지 않습니다."}
              </div>
              <InputGap style={{ marginTop: "2.3rem" }} />

              {/* 이름 부분 */}
              <input
                className="FormInput"
                type="text"
                name="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="FormInputUnderline" />
              <InputGap />

              {/* 닉네임 부분 */}
              <input
                className="FormInput"
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <div className="FormInputUnderline" />
              <InputGap />

              {/* 기수, 파트 부분 */}
              <SchoolAndPartArea>
                <DropDownArea>
                  {/* 기수 */}
                  <DropDownSelect
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <DropDownOption disabled selected>
                      기수
                    </DropDownOption>
                    <DropDownOption disabled>------</DropDownOption>
                    {YearDummy.map((option) => (
                      <DropDownOption key={option.value} value={option.value}>
                        {option.name}
                      </DropDownOption>
                    ))}
                  </DropDownSelect>
                  <div
                    className="FormInputUnderline"
                    style={{ minHeight: "0" }}
                  />
                </DropDownArea>

                {/* 파트 */}
                <DropDownArea>
                  <DropDownSelect
                    value={part}
                    onChange={(e) => setPart(e.target.value)}
                  >
                    <DropDownOption disabled selected>
                      파트
                    </DropDownOption>
                    <DropDownOption disabled>------</DropDownOption>
                    {Parts.map((option) => (
                      <DropDownOption key={option.value} value={option.value}>
                        {option.name}
                      </DropDownOption>
                    ))}
                  </DropDownSelect>
                  <div
                    className="FormInputUnderline"
                    style={{ minHeight: "0" }}
                  />
                </DropDownArea>
              </SchoolAndPartArea>
              <InputGap />

              {/* 전화번호 부분 */}
              <input
                className="FormInput"
                type="tel"
                placeholder="전화번호"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <div className="FormInputUnderline" />
              <InputGap />

              {/* 포트폴리오 부분 */}
              <input
                className="FormInput"
                type="text"
                placeholder="포트폴리오"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
              />
              <div className="FormInputUnderline" />

              {/* 회원가입 버튼 */}
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
                회원가입
              </button>

              {/* 해당 페이지 기능 이외 기능 관련 */}
              <div className="FormOtherArea">
                <span>계정이 있으신가요?</span>
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
