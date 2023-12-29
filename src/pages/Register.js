import React from "react";
import styled from "styled-components";
import Login from "../components/register/Login";
import SignUp from "../components/register/SignUp";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 아이템들을 수직 가운데 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
  width: 100vw;
  height: 100vh;
`;

const MainBox = styled.div`
  display: flex;
  width: 100rem;
  height: 60vh;
`;

const CoverBox = styled.div`
  background-color: #014171;
  font-family: KBO-Dia-Gothic;
  font-weight: 700;
  font-size: 5rem;
  color: #fafafa;
  box-sizing: border-box; // 지정한 width와 height 값에 padding과 border가 포함되도록 지정
  border-radius: 1rem 0 0 1rem;
  padding: 9rem 0 0 8rem;
  width: 50%;
  height: 100%;
`;

const FormBox = styled.div`
  background-color: #fafafa;
  font-family: KBO-Dia-Gothic;
  font-weight: 300;
  font-size: 1.4rem;
  color: #6b6880;
  box-sizing: border-box; // 지정한 width와 height 값에 padding과 border가 포함되도록 지정
  border-radius: 0 1rem 1rem 0;
  width: 50%;
  height: 100%;
`;

const FormSelect = styled.div`
  display: flex;
  margin: 9rem 0 0 11rem;
`;

const FormBtn = styled.span`
  margin: 0 2.3rem 0 0;
  text-underline-offset: 0.4rem;
  text-decoration-thickness: 0.1rem;
`;

const FormContnet = styled.div``;

export default function Register() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [isSignUp, setIsSignUp] = React.useState(false);

  const handleIsLogin = () => {
    setIsLogin(true);
    setIsSignUp(false);
  };

  const handleIsSignUp = () => {
    setIsLogin(false);
    setIsSignUp(true);
  };

  return (
    <Container>
      <MainBox>
        <CoverBox>
          UMC
          <br />
          Matching
          <br />
          Center
        </CoverBox>
        <FormBox>
          <FormSelect>
            <FormBtn
              onClick={handleIsLogin}
              style={{
                textDecoration: isLogin ? "underline" : "none",
              }}
            >
              로그인
            </FormBtn>
            <FormBtn
              onClick={handleIsSignUp}
              style={{
                textDecoration: isSignUp ? "underline" : "none",
              }}
            >
              회원가입
            </FormBtn>
            <FormContnet>
              {isLogin === true && isSignUp === false ? <Login /> : <SignUp />}
            </FormContnet>
          </FormSelect>
        </FormBox>
      </MainBox>
    </Container>
  );
}
