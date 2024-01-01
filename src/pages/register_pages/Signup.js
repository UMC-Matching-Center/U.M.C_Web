import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Register.css';

/*
    아직 덜 처리한 부분
    1. 인증을 통해 넘기는 부분 (API 연동)
    2. 맞을 시에만 visible이 발동되며 틀릴시에는 애초에 hidden으로 되어 나타나지 않음
    3. 비밀번호 일치하는 부분에서 이상하게 똑같이 입력 후 하나를 지우거나 추가하면 일치하다고 나타나는 현상
*/
export default function Signup() {
  const [regId, setRegId] =useState(''); //ID 세팅
  //const [regIdAuth, setRegIdAuth] =useState(false); //ID Auth 확인
  const [regIdValid, setRegIdValid] =useState(false); //ID Email 형식 확인
  const [regPw, setRegPw] =useState(''); //비밀번호 세팅
  const [regPw2, setRegPw2] =useState(''); //비밀번호 확인용 세팅
  const [regPwValid, setRegPwValid] =useState(false); //비밀번호 valid 확인
  const [regPwEqual, setRegPwEqual] =useState(false); //비밀번호 일치 확인
  const [adminLogin,setAdminLogin] = useState(false); //관리자 로그인 설정
  const [nextBtn, setNextBtn] = useState(false); //버튼 Enable 여부

  const navigate = useNavigate();

  //ID Valid 여부 확인
  const handleChangeId =(e)=> {
    const inputId = e.target.value;
    setRegId(inputId);
    setRegIdValid(validatEmail(inputId)); //valid 여부
    //setRegIdAuth(AuthatEmail(inputId)); //이메일 인증 여부
  }
  const handleChangePw =(e)=> { //PW Valid 여부 확인
    const inputPw = e.target.value;
    setRegPw(inputPw);
    setRegPwValid(validatPw(inputPw)); //valid 여부
  }
  const handleChangePw2 =(e)=> { //PW Equal 여부 확인
    const inputPw2 = e.target.value;
    setRegPw2(inputPw2);
    setRegPwEqual(equalatPw(inputPw2)) //Equal 여부
  }

  //여부 확인서
  const validatEmail = (e) => {  //이메일 Valid 여부
    const emailtest= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailtest.test(e);
  }
  /*
  const AuthatEmail = (e) => { //이메일 인증 여부
    
  }*/

  const validatPw = (e) => {   //비밀번호 Valid 여부
    const pwtest = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,16}$/;
    return pwtest.test(e);
  }

  const equalatPw = () => {  //비밀번호 일치여부
    if(regPw==regPw2)
    return(true);
  }

  useEffect(() => {  //버튼 여부
    setNextBtn(regIdValid && regPwValid && regPwEqual); //나중에 인증기능 추가시 && regIdAuth 추가
  }, [regIdValid, regPwValid, regPwEqual]); // 동일하게 ", regIdAuth" 추가

  //관리자 로그인 설정 및 상태를 반전시켜 업데이트
  const handleAdminLogin = ()=>{
    setAdminLogin(!adminLogin);
  }

  //회원가입 제출 후 다음으로 이동
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!adminLogin) {
        navigate("./mode1");
      }
    else {
        navigate("./mode2");
    }
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
                <input className="StyledInput24" type="email" placeholder="이메일(아이디)" value={regId} style={{width : "25rem", marginTop: "0rem"}} onChange={handleChangeId}/>
                <button className="AuthButton">인증</button>
            </div>
            <p className="ValidText" style={{ visibility: regIdValid ? 'visible' : 'hidden', color: regIdValid ? '#014171' : "#d62117" }}>
              이메일을 인증해주세요.
            </p>

            <div className="PasswordInput">
              <input className="StyledInput24" type='password' placeholder="비밀번호" value={regPw}  onChange={handleChangePw}/>
            </div>
            <p className="ValidText" style={{ visibility: regPwValid ? 'visible' : 'hidden', color: regPwValid ? '#014171' : "#d62117" }}>
              {regPwValid ? "비밀번호가 올바릅니다" : "비밀번호가 올바른 형식이 아닙니다.."}
            </p>

            <div className="PasswordInput">
              <input className="StyledInput24" type='password' placeholder="비밀번호 확인" value={regPw2}  onChange={handleChangePw2}/>
            </div>
            <p className="ValidText" style={{ visibility: regPwEqual ? 'visible' : 'hidden', color: regPwEqual ? '#014171' : "#d62117"}}>
              {regPwEqual ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다."}
            </p>

            <div className="FormCheckBox">
              <input className="StyledCheckbox" type="checkbox" checked={adminLogin} onChange={handleAdminLogin} />
              <p>관리자 회원가입</p>
            </div>
          </div>
          <div className="FormSubmit">
            <button className={nextBtn ? "FormSubmitBox" :"UnableSubmitBox"} type="submit" onClick={handleSubmit} disabled={!nextBtn}>
              다음</button>
            <div className="FormRegister">이미 계정이 있으신가요?  
              <Link to="/register" style={{ textDecoration: 'none', color: '#014171', marginLeft:"0.5rem" }}>
              로그인
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}