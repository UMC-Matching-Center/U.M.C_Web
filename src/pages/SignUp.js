import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';

export default function Register() {
  const [regId, setRegId] =useState(''); //ID 세팅
  const [regPassword, setRegPassword] =useState(''); //비밀번호 세팅
  const [regPassword2, setRegPassword2] =useState(''); //비밀번호 확인용 세팅
  const [regIdAuth, setRegIdAuth] =useState(true); //ID Auth 확인
  const [regPwValid, setRegPwValid] =useState(true); //비밀번호 valid 확인
  const [regPwEqual, setRegPwEqual] =useState(true); //비밀번호 일치 확인
  const [adminLogin,setAdminLogin] = useState(false); //관리자 로그인 설정
  //const [isButtonEnabled, setIsButtonEnabled] = useState(false); //버튼 Enable 여부

  const navigate = useNavigate();
  
  //회원가입 제출 후 다음으로 이동
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!adminLogin) {
        navigate("/mode1");
        setRegIdAuth(false);
        setRegPwValid(false);
        setRegPwEqual(false);

    }
    else {
        navigate("/mode2");
    }
  }
  //이메일 인증여부

  //비밀번호 확인여부


  //비밀번호 일치여부


  //관리자 로그인 설정 및 상태를 반전시켜 업데이트
  const handleAdminLogin = ()=>{
    setAdminLogin(true);
  }

  return (
    <div className="Container">
      <div className="MainBox">
        <div className="CoverBox">
          UMC<br />Matching<br />Center
        </div>
        <div className="FormBox">
          <div className="FormSelect">
            <span className="FormBtn">회원가입</span>
          </div>
          <div className="FormLogin">
            <div>
                <input className="StyledInput" type="email" placeholder="이메일(아이디)" value={regId} onChange={(e) => setRegId(e.target.value)} style={{width : "25rem"}}/>
                <button className="AuthButton">인증</button>
            </div>
            <p className="ValidText" style={{ visibility: regIdAuth ? 'hidden' : 'visible' }}>
              이메일을 인증해 주세요.
            </p>

            <div className="PasswordInput">
              <input className="StyledInput" type='password' placeholder="비밀번호" value={regPassword}  onChange={(e) => setRegPassword(e.target.value)}/>
            </div>
            <p className="ValidText" style={{ visibility: regPwValid ? 'hidden' : 'visible' }}>
              올바른 비밀번호를 입력해주세요
            </p>

            <div className="PasswordInput">
              <input className="StyledInput" type='password' placeholder="비밀번호 확인" value={regPassword2}  onChange={(e) => setRegPassword2(e.target.value)}/>
            </div>
            <p className="ValidText" style={{ visibility: regPwEqual ? 'hidden' : 'visible' }}>
              비밀번호가 일치하지 않습니다.
            </p>

            <div className="FormCheckBox">
              <input className="StyledCheckbox" type="checkbox" checked={adminLogin} onChange={handleAdminLogin} />
              <p>관리자 회원가입</p>
            </div>
          </div>
          <div className="FormSubmit">
            <button className="FormSubmitBox"
              type="submit" onClick={handleSubmit}
              >다음</button>
            </div>
          </div>
        </div>
      </div>
  );
}