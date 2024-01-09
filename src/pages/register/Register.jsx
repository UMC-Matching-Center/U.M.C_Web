import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./Register.css";
import {
  IconEyeOff,
  IconEye,
  IconSquare,
  IconSquareCheckFilled,
} from "@tabler/icons-react";
import Signup from "./Signup";
import SignupDetail from "./SignupDetail";
import SignupSuccess from "./SignupSuccess";

// input간 간격
const InputGap = styled.div`
  margin-top: 3.2rem;
`;

const PwArea = styled.div`
  display: flex;
  align-items: center;
`;

function Login() {
  const [id, setId] = useState(""); //ID 세팅
  const [pw, setPw] = useState(""); //비밀번호 세팅
  const [pwValid, setPwValid] = useState(true); //비밀번호 valid 확인
  const [pwVisible, setPwVisible] = useState(false); //비밀번호 노출 여부
  const [autoLogin, setAutoLogin] = useState(false); //자동 로그인 설정
  const [ableBtn, setAbleBtn] = useState(false); //버튼 Enable 여부
  const navigate = useNavigate();

  //로그인 정보 일치 확인 여부
  const handleLogin = (e) => {
    e.preventDefault();
    if (id === "exampleUser") {
      if (pw === "examplePassword") {
        navigate("/Home");
      } else {
        setPwValid(false);
      }
    } else {
      setPwValid(false);
    }
  };

  //자동 로그인 설정 및 상태를 반전시켜 업데이트
  const handleAutoLogin = () => {
    setAutoLogin(!autoLogin);
  };

  //비밀번호 노출 여부
  const toggleVisible = () => {
    setPwVisible(!pwVisible);
  };

  useEffect(() => {
    //ID와 PW가 모두 입력되었을 때 버튼 활성화
    setAbleBtn(id !== "" && pw !== "");
  }, [id, pw]);

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

        {/* 우측 로그인 부분 */}
        <div className="FormBox">
          {/* 제목 */}
          <div className="FormTitle">로그인</div>

          {/* 로그인 폼 */}
          <div className="FormDetail">
            <div style={{ width: "100%" }}>
              {/* 이메일(아이디) 관련 */}
              <input
                className="FormInput"
                type="email"
                placeholder="이메일(아이디)"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <div className="FormInputUnderline" />
              <InputGap />

              {/* 비밀번호 관련 */}
              <PwArea>
                <input
                  className="FormInput"
                  type={pwVisible ? "text" : "password"}
                  placeholder="비밀번호"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
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

              {/* 해당부분은 기획에 따라 변경됨 */}
              <p
                className="ValidText"
                style={{ display: pwValid ? "none" : "block" }}
              >
                올바른 비밀번호를 입력해주세요
              </p>
              {/* --------------------- */}

              {/* 자동 로그인 관련 */}
              <div className="FormCheckArea">
                <input
                  id="autoLogin"
                  type="checkbox"
                  checked={autoLogin}
                  onChange={handleAutoLogin}
                />
                <label htmlFor="autoLogin" className="FormCheckCustom">
                  {autoLogin ? (
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
                <span style={{ marginRight: "4.3rem" }}>자동 로그인</span>
              </div>

              {/* 로그인 버튼 관련 */}
              <button
                className="FormSubmitBtn"
                type="submit"
                onClick={handleLogin}
                style={{
                  marginTop: "3.9rem",
                  backgroundColor: ableBtn ? "#014171" : "#01417180",
                }}
                disabled={!ableBtn}
              >
                로그인
              </button>

              {/* 해당 페이지 기능 이외 기능 관련 */}
              <div className="FormOtherArea">
                <span>계정이 없으신가요?</span>
                <span
                  onClick={() => {
                    navigate("./signup");
                  }}
                >
                  회원가입
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Register() {
  return (
    <div style={{ position: "absolute" }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/detail" element={<SignupDetail />} />
        <Route path="/complete" element={<SignupSuccess />} />
      </Routes>
    </div>
  );
}
export default Register;
