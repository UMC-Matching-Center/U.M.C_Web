import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

/*
    아직 덜 처리한 부분(AdminSignup과 동일)
    1.select 화살표 색상 변경
    2.select 값 왼쪽으로 정렬
*/

export default function UserSignup() {
  const [regName,setRegName] =useState(''); //이름
  const [regNickname,setRegNickname] =useState(''); //닉네임
  const [regBtn, setRegBtn] = useState(true); //회원가입 버튼
  const [regNumber,setRegNumber] = useState(''); //전화번호
  const [regPortfolio,setRegPortfolio] = useState(''); //포트폴리오 링크

  const navigate = useNavigate();
  //학교 option들 정의
  const SchoolOptions = [
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
  //핸들러 모음
  const handleSubmit = (e) => {
    e.preventDefault();
    setRegBtn(false);
    navigate("/registerComplete");
  };
  return (
    <div className="Container">
      <div className="MainBox">
        <div className="CoverBox">
          UMC
          <br />
          Matching
          <br />
          Center
        </div>
        <div className="FormBox">
          <div className="FormSelect">
            <span className="FormBtn">회원가입</span>
          </div>
          <div className="FormLogin" style={{marginTop:"6.3rem"}}>
          <input
                className="StyledInput32" type='text' name="phoneNumber" style={{marginTop:"0rem"}}
                placeholder="이름" value={regName}  onChange={(e) => setRegName(e.target.value)}
            ></input>
                        <input
                className="StyledInput32" type='text' name="phoneNumber"
                placeholder="닉네임" value={regNickname}  onChange={(e) => setRegNickname(e.target.value)}
            ></input>
            <div>
                <select className="StyledSelect" style={{marginTop:"3.2rem"}}>
                    <option className="StyledOption">학교</option>
                    <option className="StyledOption" disabled>------</option>
                  {SchoolOptions.map((option) => (
                    <option className="StyledOption" key={option.value} value={option.value} >
                      {option.name}
                    </option>
                  ))}
                </select>
              <select className="StyledSelect" style={{marginLeft:"2.2rem"}}>
                <option className="StyledOption">파트</option>
                <option className="StyledOption" disabled>------</option>
                  {Parts.map((option) => (
                    <option  className="StyledOption" key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
            </div>
            <input
                className="StyledInput32" type='tel' name="phoneNumber"
                placeholder="전화번호" value={regNumber}  onChange={(e) => setRegNumber(e.target.value)}
            ></input>
            <input
                className="StyledInput32" type='text' name="PortfolioLink"
                placeholder="포트폴리오" value={regPortfolio}  onChange={(e) => setRegPortfolio(e.target.value)}
            ></input>
          </div>
          <div className="FormSubmit">
            <button
              className={regBtn ? "FormSubmitBox" : "UnableSubmitBox"}
              type="submit"
              onClick={handleSubmit}
              disabled={!regBtn}
            >
              회원가입
            </button>
            <div className="FormRegister">
              이미 계정이 있으신가요?
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  color: "#014171",
                  marginLeft: "0.5rem",
                }}
              >
                로그인
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
