import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./Register.css";
import { useDispatch } from "react-redux";
import { signupCompleteOpen } from "../../modules/userInfo";

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
  font-family: "KBO Dia Gothic";
  font-size: 1rem;
  font-weight: 300;
  color: #6b6880;
  box-sizing: border-box;
  width: 2.6rem;
  padding: 0.3rem;
  margin-left: 0.6rem;
`;

const YearAndPartArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DropDownArea = styled.div`
  position: relative;
  min-width: 13rem;
`;

const DropDownArrow = btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
    <path d="M1 1L5 5L9 1" stroke="#6B6880" stroke-linecap="round"/>
  </svg>`);

const SelectArrow = btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <g clip-path="url(#clip0_1541_5859)">
      <path d="M2.91699 6.99998L5.83366 9.91665L11.667 4.08331" stroke="#0261AA" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_1541_5859">
        <rect width="14" height="14" fill="white"/>
      </clipPath>
    </defs>
  </svg>`);

const SelectBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;
  margin: 0;
  padding: 0 0.5rem;
  background: url("data:image/svg+xml;base64, ${DropDownArrow}") no-repeat right
    0.5rem center/0.8rem 0.6rem;
`;

const SelectOptions = styled.ul`
  z-index: 1;
  box-sizing: border-box;
  position: absolute;
  list-style: none;
  left: 0;
  width: 100%;
  max-height: 11.5rem;
  padding: 0;
  margin: 0.4rem 0 0 0;
  overflow-y: auto; /* 스크롤이 필요한 경우만 보이도록 설정 */
  background-color: #fafafa;
  border-width: 0.5px 1px 1px 1px;
  border-style: solid;
  border-color: #6b6880;
  display: ${(props) => (props.visible === "true" ? "block" : "none")};
`;

const Option = styled.li`
  font-size: 1rem;
  padding: 0.5rem;
  box-sizing: border-box;
  border-bottom: 0.5px solid #6b6880;
  &:last-child {
    // 마지막 옵션은 border-bottom 없애기
    border-bottom: none;
  }
  &:hover,
  &.selected:hover {
    // 마우스 올려뒀을때
    background-color: #e7e6ea;
  }
  &.selected {
    background: url("data:image/svg+xml;base64, ${SelectArrow}") no-repeat right
      0.5rem center;
  }
`;

export default function UserSignup() {
  const [email, setEmail] = useState(""); //Email 세팅
  const [emailValid, setEmailValid] = useState(-1); //Email 유효 (-1: 초기 설정 / 0:[형식 X •인증 X] / 1:[형식 O•인증 X] / 2:[형식 O•인증 O])
  const [emailAuth, setEmailAuth] = useState(false); //Email Auth 확인

  const [name, setName] = useState(""); //이름
  const [nickname, setNickname] = useState(""); //닉네임

  const [school, setSchool] = useState(["학교", -1]); //학교
  const [schoolOptionVisible, setSchoolOptionVisible] = useState(false); //학교 option 보이기 여부
  const schoolSelectRef = useRef(null);

  const [year, setYear] = useState(["기수", -1]); //기수
  const [yearOptionVisible, setYearOptionVisible] = useState(false); //학교 option 보이기 여부
  const yearSelectRef = useRef(null);

  const [part, setPart] = useState(["파트", -1]); //파트
  const [partOptionVisible, setPartOptionVisible] = useState(false); //학교 option 보이기 여부
  const partSelectRef = useRef(null);

  const [phoneNumber, setPhoneNumber] = useState(""); //전화번호
  const [portfolio, setPortfolio] = useState(""); //포트폴리오 링크
  const [ableBtn, setAbleBtn] = useState(false); //회원가입 버튼

  const navigate = useNavigate();
  const dispatch = useDispatch(); // action을 reducer한테 보내서 state를 update시키는 함수

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

  /* ---- 이름•닉네임 관련 ----- */
  const KoreanValid = (text, type) => {
    const koreanRegex = /^[가-힣ㄱ-하-ㅣ]*$/;
    if (!koreanRegex.test(text)) return;
    else {
      type == "name" ? setName(text) : setNickname(text);
    }
  };

  /* ---- select 관련 ----- */
  useEffect(() => {
    // 특정 영역 외 클릭 시 발생하는 이벤트
    const handleOutsideClick = (event, ref, setVisibility) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisibility(false);
      }
    };

    // 이벤트 리스너에 handleFocus 함수 등록
    document.addEventListener("mousedown", (event) => {
      handleOutsideClick(event, schoolSelectRef, setSchoolOptionVisible);
      handleOutsideClick(event, yearSelectRef, setYearOptionVisible);
      handleOutsideClick(event, partSelectRef, setPartOptionVisible);
    });

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [schoolSelectRef, yearSelectRef, partSelectRef]);

  // 학교 option들 정의
  const SchoolDummy = [
    { key: "Gachon", name: "가천대학교" },
    { key: "Ajou", name: "아주대학교" },
    { key: "Catholic", name: "가톨릭대학교" },
    { key: "Inha", name: "인하대학교" },
  ];

  //기수 option들 정의
  const YearDummy = [
    { key: "1st", name: "1기" },
    { key: "2nd", name: "2기" },
    { key: "3rd", name: "3기" },
    { key: "4th", name: "4기" },
    { key: "5th", name: "5기" },
  ];

  //파트들 정의
  const PartsDummy = [
    { key: "Android", name: "Android" },
    { key: "IOS", name: "IOS" },
    { key: "Web", name: "Web(React)" },
    { key: "ServerNode", name: "Server(Node)" },
    { key: "ServerSpring", name: "Server(Spring)" },
    { key: "Design", name: "Design" },
    { key: "Plan", name: "Plan" },
  ];

  //전화번호 정규식 및 '-' 자동 추가
  const validTelephone = (e) => {
    setPhoneNumber(
      e.target.value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, "$1-$2-$3")
        .replace(/(-{1,2})$/, "")
    );
  };

  /* ---- 회원가입 버튼 관련 ----- */
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

  //회원가입 제출 후 홈으로 이동
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupCompleteOpen(true));
    navigate("../../");
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
          <div className="FormDetail" style={{ marginTop: "5.3rem" }}>
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
                onChange={(e) => KoreanValid(e.target.value, "name")}
              />
              <div className="FormInputUnderline" />
              <InputGap />

              {/* 닉네임 부분 */}
              <input
                className="FormInput"
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => KoreanValid(e.target.value, "nickname")}
              />
              <div className="FormInputUnderline" />
              <InputGap />

              {/* 학교 부분 */}
              <SelectBox
                onClick={() => setSchoolOptionVisible(!schoolOptionVisible)}
                ref={schoolSelectRef}
              >
                <label>{school[0]}</label>
                <SelectOptions visible={schoolOptionVisible.toString()}>
                  {SchoolDummy.map((option, i) => (
                    <Option
                      onClick={() => setSchool([option.name, i])}
                      key={option.key}
                      className={i === school[1] ? "selected" : ""}
                    >
                      {option.name}
                    </Option>
                  ))}
                </SelectOptions>
              </SelectBox>
              <div className="FormInputUnderline" />
              <InputGap />

              {/* 기수, 파트 부분 */}
              <YearAndPartArea>
                {/* 기수 */}
                <DropDownArea>
                  <SelectBox
                    onClick={() => setYearOptionVisible(!yearOptionVisible)}
                    ref={yearSelectRef}
                  >
                    <label>{year[0]}</label>
                    <SelectOptions visible={yearOptionVisible.toString()}>
                      {YearDummy.map((option, i) => (
                        <Option
                          onClick={() => setYear([option.name, i])}
                          key={option.key}
                          className={i === year[1] ? "selected" : ""}
                        >
                          {option.name}
                        </Option>
                      ))}
                    </SelectOptions>
                  </SelectBox>
                  <div className="FormInputUnderline" />
                </DropDownArea>

                {/* 파트 */}
                <DropDownArea>
                  <SelectBox
                    onClick={() => setPartOptionVisible(!partOptionVisible)}
                    ref={partSelectRef}
                  >
                    <label>{part[0]}</label>
                    <SelectOptions visible={partOptionVisible.toString()}>
                      {PartsDummy.map((option, i) => (
                        <Option
                          onClick={() => setPart([option.name, i])}
                          key={option.key}
                          className={i === part[1] ? "selected" : ""}
                        >
                          {option.name}
                        </Option>
                      ))}
                    </SelectOptions>
                  </SelectBox>
                  <div className="FormInputUnderline" />
                </DropDownArea>
              </YearAndPartArea>
              <InputGap />

              {/* 전화번호 부분 */}
              <input
                className="FormInput"
                type="tel"
                placeholder="전화번호"
                value={phoneNumber}
                onChange={(e) => validTelephone(e)}
                maxLength={13}
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
