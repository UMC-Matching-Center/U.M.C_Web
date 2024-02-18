import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./Register.css";
import { IconEyeOff, IconEye, IconCheck } from "@tabler/icons-react";
import { idCheckAPI } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { SINGUP_DURING, SIGNUP_RESET } from "../../modules/signupState";

// input간 간격
const InputGap = styled.div`
  margin-top: 2.4rem;
`;

const IDArea = styled.div`
  display: flex;
  flex-direction: row;
`;

// ID input 태그 관련 영역
const IDInputArea = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

// ID 중복 확인 버튼
const IDAuth = styled.button`
  border: 1px solid #6b6880;
  background-color: #fafafa00;
  font-family: "KBO-Dia-Gothic";
  font-size: 1.2rem;
  font-weight: 300;
  color: #6b6880;
  box-sizing: border-box;
  padding: 0.3rem;
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
  style={{ cursor: "pointer" }}

  svg {
    width: 1.2rem;
    height: 1.2rem;
    stroke-width: 0.1rem;
  }

  span {
    font-size: 1rem;
    margin: 0.2rem 0.5rem 0 0;
  }
`;

export default function Signup() {
  const [id, setId] = useState(""); //ID 세팅
  const [idValid, setIdValid] = useState(-1); //ID 유효 (-1: 초기 설정, 0: 비인증, 1: 인증(중복), 2: 인증(중복 X))

  const [pw, setPw] = useState(""); //비밀번호 세팅
  const [pwVisible, setPwVisible] = useState(false); //비밀번호 노출 여부
  const [pwEnglish, setPwEnglish] = useState(false); //비밀번호 영문 여부
  const [pwNumber, setPwNumber] = useState(false); //비밀번호 숫자 여부
  const [pwLength, setPwLength] = useState(false); //비밀번호 길이 여부
  const [pwSpecial, setPwSpecial] = useState(false); //비밀번호 특수 문자 여부

  const [pwEqual, setpwEqual] = useState(-1); //비밀번호 일치 확인 (-1: 초기 설정, 0: 중복 확인 필요, 1: 아이디 중복, 2: 중복 확인 완료)
  const [pwEqualVisible, setpwEqualVisible] = useState(false); //비밀번호 확인 노출 여부

  const [ableBtn, setAbleBtn] = useState(true); //버튼 Enable 여부

  const navigate = useNavigate();
  const dispatch = useDispatch(); // action을 reducer한테 보내서 state를 update시키는 함수

  /*--- Redux 관련 ---*/
  const { signupID, access } = useSelector((state) => state.signupState);
  useEffect(() => {
    // register/detail 페이지에서 뒤로 돌아온 경우
    if (access) {
      setId(signupID);
      dispatch(SIGNUP_RESET());
    }
  }, []);

  /* ---- ID 관련 ----- */
  const handleChangeId = (e) => {
    const idRegulation = /^[A-Za-z0-9+]*$/; //ID 정규식 (영문, 숫자))
    const inputId = e.target.value;
    if (!idRegulation.test(inputId)) return; //ID 정규식에 맞지 않으면 return
    else {
      if (idValid === -1) setIdValid(0); //ID 중복확인 여부 확인 시작
      else if (idValid === 2) setIdValid(0); //ID 중복 확인 기록 삭제
      setId(inputId);
    }
  };

  //ID 인증 여부
  const onClickAuth = () => {
    idCheckAPI(id).then((response) => {
      if (response.isSuccess) {
        setIdValid(2); // (2: 인증(중복 X))
      } else {
        setIdValid(1); // (1: 인증(중복))
      }
    });
  };

  /* ---- PW 관련 ----- */
  const handleChangePw = (e) => {
    //PW Valid 여부 확인
    const inputPw = e.target.value;
    const pwEnglishReg = /[a-zA-Z]+/;
    const pwNumberReg = /[0-9]+/;
    const pwLengtReg = /^.{8,16}$/;
    const pwSpecialReg = /[!@#$%^&*?_]/;
    setPw(inputPw);
    pwEqual === -1 ? null : setpwEqual(0); //PW Equal 초기화
    setPwEnglish(pwEnglishReg.test(inputPw)); //영문 여부
    setPwNumber(pwNumberReg.test(inputPw)); //숫자 여부
    setPwLength(pwLengtReg.test(inputPw)); //길이 여부
    setPwSpecial(pwSpecialReg.test(inputPw)); //특수문자 여부
  };

  //비밀번호 노출 여부
  const pwVisibleToggle = () => {
    setPwVisible(!pwVisible);
  };

  //비밀번호 일치 여부
  const handleChangePwEqual = (e) => {
    const inputPwCheck = e.target.value;
    if (pwEqual === -1) setpwEqual(0); //PWEqual 검사 시작
    else if (inputPwCheck === "") setpwEqual(-1); // 값이 없을 때 PWEqual 초기화
    else setpwEqual(pw.localeCompare(inputPwCheck) === 0 ? 1 : 0); //Equal 여부
  };

  //비밀번호 확인 노출 여부
  const pwEqaulVisibleToggle = () => {
    setpwEqualVisible(!pwEqualVisible);
  };

  useEffect(() => {
    //버튼 여부
    setAbleBtn(
      idValid == 2 &&
        pwEnglish &&
        pwNumber &&
        pwLength &&
        pwSpecial &&
        pwEqual === 1
    ); //나중에 인증기능 추가시 && idAuth 추가
  }, [idValid, pwEnglish, pwNumber, pwLength, pwSpecial, pwEqual]); // 동일하게 ", idAuth" 추가

  //회원가입 제출 후 다음으로 이동
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SINGUP_DURING({ id: id, pw: pw, access: true }));
    navigate("../detail");
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
              <IDArea>
                <IDInputArea>
                  <input
                    className="FormInput"
                    type="email"
                    placeholder="아이디"
                    value={id}
                    onChange={handleChangeId}
                  />
                  <div className="FormInputUnderline" />
                </IDInputArea>
                <IDAuth onClick={onClickAuth} disabled={idValid === -1}>
                  중복 확인
                </IDAuth>
              </IDArea>
              <div
                className="ValidText"
                style={{
                  visibility: idValid === -1 ? "hidden" : "visible",
                  color: idValid === 2 ? "#014171" : "#d62117",
                }}
              >
                {idValid == 2
                  ? "사용 가능한 아이디입니다."
                  : idValid == 1
                    ? "이미 사용 중인 아이디입니다."
                    : ""}
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
                  <IconEyeOff
                    className="PasswordEye"
                    onClick={pwVisibleToggle}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <IconEye
                    className="PasswordEye"
                    onClick={pwVisibleToggle}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </PwArea>
              <div
                className="FormInputUnderline"
                style={{ minHeight: "0.2rem" }}
              />

              {/* 비밀번호 조건 관련 */}
              <PwConditionArea>
                <PwCondition
                  style={{ color: pwEnglish ? "#014171" : "#9C9AAB" }}
                >
                  <IconCheck /> <span>영문</span>
                </PwCondition>
                <PwCondition
                  style={{ color: pwNumber ? "#014171" : "#9C9AAB" }}
                >
                  <IconCheck /> <span>숫자</span>
                </PwCondition>
                <PwCondition
                  style={{ color: pwLength ? "#014171" : "#9C9AAB" }}
                >
                  <IconCheck /> <span>8~16자</span>
                </PwCondition>
                <PwCondition
                  style={{ color: pwSpecial ? "#014171" : "#9C9AAB" }}
                >
                  <IconCheck /> <span>특수 문자</span>
                </PwCondition>
              </PwConditionArea>
              <InputGap />

              {/* 비밀번호 확인 관련 */}
              <PwArea>
                <input
                  className="FormInput"
                  type={pwEqualVisible ? "text" : "password"}
                  placeholder="비밀번호 확인"
                  onInput={handleChangePwEqual}
                />
                {!pwEqualVisible ? (
                  <IconEyeOff
                    className="PasswordEye"
                    onClick={pwEqaulVisibleToggle}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <IconEye
                    className="PasswordEye"
                    onClick={pwEqaulVisibleToggle}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </PwArea>
              <div
                className="FormInputUnderline"
                style={{ minHeight: "0.2rem" }}
              />
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

              {/* 다음 버튼 */}
              <button
                className="FormSubmitBtn"
                type="submit"
                onClick={handleSubmit}
                style={{
                  marginTop: "3.2rem",
                  backgroundColor: ableBtn ? "#014171" : "#01417180",
                  cursor: !ableBtn && "default"
                }}
                disabled={!ableBtn}
              >
                다음
              </button>

              {/* 해당 페이지 기능 이외 기능 관련 */}
              <div className="FormOtherArea">
                <span style={{ cursor: "default" }}>
                  이미 계정이 있으신가요?
                </span>
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
