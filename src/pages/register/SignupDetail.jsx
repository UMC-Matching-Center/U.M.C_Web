import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./Register.css";

// input간 간격
const InputGap = styled.div`
  margin-top: 3.2rem;
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

/*
    아직 덜 처리한 부분(AdminSignup과 동일)
    2.select 값 왼쪽으로 정렬
*/

export default function UserSignup() {
  const [name, setName] = useState(""); //이름
  const [nickname, setNickname] = useState(""); //닉네임
  const [school, setSchool] = useState("학교"); //학교
  const [part, setPart] = useState("파트"); //파트
  const [phoneNumber, setPhoneNumber] = useState(""); //전화번호
  const [portfolio, setPortfolio] = useState(""); //포트폴리오 링크
  const [ableBtn, setAbleBtn] = useState(false); //회원가입 버튼
  const navigate = useNavigate();

  //학교 option들 정의
  const SchoolOptionsDummy = [
    { value: "Catholic", name: "가톨릭대" },
    { value: "Gachon", name: "가천대" },
    { value: "Azu", name: "아주대" },
    { value: "Inha", name: "인하대" },
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
    //이름, 닉네임, 전화번호, 학교, 파트가 모두 입력•선택되었을 때 버튼 활성화
    setAbleBtn(
      name !== "" &&
        nickname !== "" &&
        phoneNumber !== "" &&
        school !== "학교" &&
        part !== "파트"
    );
  }, [name, nickname, phoneNumber, school, part]);

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

              {/* 학교, 파트 부분 */}
              <SchoolAndPartArea>
                <DropDownArea>
                  {/* 학교 */}
                  <DropDownSelect
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                  >
                    <DropDownOption disabled selected>
                      학교
                    </DropDownOption>
                    <DropDownOption disabled>------</DropDownOption>
                    {SchoolOptionsDummy.map((option) => (
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
