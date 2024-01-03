import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./Register.css";

// input간 간격
const InputGap = styled.div`
  margin-top: 3.2rem;
`;

const SchoolAndBranchArea = styled.div`
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

export default function AdminSignup() {
  const [school, setSchool] = useState("학교"); //학교
  const [branch, setBranch] = useState("지부"); //지부
  const [phoneNumber, setPhoneNumber] = useState(""); //전화번호
  const [ableBtn, setAbleBtn] = useState(false); //회원가입 버튼
  const navigate = useNavigate();

  //학교 option들 정의
  const SchoolOptionsDummy = [
    { value: "Catholic", name: "가톨릭대" },
    { value: "Gachon", name: "가천대" },
    { value: "Azu", name: "아주대" },
    { value: "Inha", name: "인하대" },
  ];

  //지부 option들 정의
  const BranchOptionsDummy = [{ value: "GACI", name: "GACI" }];

  useEffect(() => {
    //이름, 닉네임, 전화번호, 학교, 파트가 모두 입력•선택되었을 때 버튼 활성화
    setAbleBtn(phoneNumber !== "" && school !== "학교" && branch !== "지부");
  }, [phoneNumber, school, branch]);

  //회원가입 제출 후 다음으로 이동
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/registerComplete");
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

          {/* 관리자 회원가입 폼 */}
          <div className="FormDetail">
            <div style={{ width: "100%" }}>
              <div className="FormLogin">
                {/* 학교, 파트 부분 */}
                <SchoolAndBranchArea>
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

                  {/* 지부 */}
                  <DropDownArea>
                    <DropDownSelect
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                    >
                      <DropDownOption disabled selected>
                        파트
                      </DropDownOption>
                      <DropDownOption disabled>------</DropDownOption>
                      {BranchOptionsDummy.map((option) => (
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
                </SchoolAndBranchArea>
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
                      navigate("/register");
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
    </div>
  );
}
