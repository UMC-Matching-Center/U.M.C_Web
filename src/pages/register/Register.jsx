import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconEyeOff } from '@tabler/icons-react';
import './Register.css';
/*
    아직 덜 처리한 부분
    1.눈 위치
    2.기능이 처리가 확실X -> 아이디 비번 둘 중에 하나만 틀려도 두개 다 보이게 해야할 지 헷갈림
*/
export default function Register() {
  const [id, setId] =useState(''); //ID 세팅
  const [pw, setPw] =useState(''); //비밀번호 세팅
  const [idValid, setIdValid] =useState(true); //ID valid 확인
  const [pwValid, setPwValid] =useState(true); //비밀번호 valid 확인
  const [autoLogin,setAutoLogin] = useState(false); //자동 로그인 설정
  const [adminLogin,setAdminLogin] = useState(false); //관리자 로그인 설정
  const [showPassword,setShowPassword] = useState(false); //비밀번호 보여주는 여부
  const navigate = useNavigate();
  
  //로그인 정보 일치 확인 여부
  const handleLogin = (e) => {
    e.preventDefault();
    if(id==='exampleUser'){
      if(pw==='examplePassword'){
        navigate("/Home");
      }
      else{
        setIdValid(true);
        setPwValid(false);
      }
    }
    else{
      setIdValid(false);
      setPwValid(false);
      }
  }
  //자동 로그인 설정 및 상태를 반전시켜 업데이트
  const handleAutoLogin = ()=>{
    setAutoLogin(!autoLogin);
  }  
  //관리자 로그인 설정 및 상태를 반전시켜 업데이트
  const handleAdminLogin = ()=>{
    setAdminLogin(!adminLogin);
  }

  //비밀번호 보이는 여부
  const togglePasswordVisibility =() => {
    setShowPassword(!showPassword);
  }
  return (
    <div className="Container">
      <div className="MainBox">
        <div className="CoverBox">
          UMC<br />Matching<br />Center
        </div>
        <div className="FormBox">
          <div className="FormSelect">
            <span className="FormBtn">로그인</span>
          </div>
          <div className="FormLogin">
            <input className="StyledInput32" type="email" placeholder="이메일(아이디)" value={id} style={{marginTop:"0rem"}} onChange={(e) => setId(e.target.value)}/>
            <p className="ValidText" style={{ visibility: idValid ? 'hidden' : 'visible' }}>
              올바른 이메일(아이디)을 입력해주세요
            </p>
            <div className="PasswordInput">
              <input
                className="StyledInput32" type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호" value={pw}  onChange={(e) => setPw(e.target.value)}
              ></input>
              <IconEyeOff 
                onClick={togglePasswordVisibility}
                style={{width: "1.8rem",height:"1.8rem",cursor: "pointer"}}
              ></IconEyeOff>
            </div>
            <p className="ValidText" style={{ visibility: pwValid ? 'hidden' : 'visible' }}>
              올바른 비밀번호를 입력해주세요
            </p>
            <div className="FormCheckBox">
              <input className="StyledCheckbox" type="checkbox" checked={autoLogin} onChange={handleAutoLogin} />
              <p style={{ marginRight: '4.3rem' }}>자동 로그인</p>
              <input className="StyledCheckbox" type="checkbox" checked={adminLogin} onChange={handleAdminLogin} />
              <p>관리자 로그인</p>
            </div>
          </div>
          <div className="FormSubmit">
            <button
              type="submit" onClick={handleLogin}
              style={{backgroundColor: '#014171', color: 'white', fontSize: '1.2rem',border :"#014171",
                borderRadius: '5rem', height: '3rem', width: '28.2rem', cursor: 'pointer',}}>로그인</button>
            <div className="FormRegister">
              계정이 없으신가요?  <Link to="/register/signup" style={{ textDecoration: 'none', color: '#014171', marginLeft:"0.5rem" }}>
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}