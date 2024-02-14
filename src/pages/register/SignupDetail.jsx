import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import styled from "styled-components";
import "./Register.css";
import {
  SelectBox,
  SelectOptions,
  Option,
} from "../../common/Selectbox/RectangleSelectBox";
import { useDispatch, useSelector } from "react-redux";
import { SIGNUP_COMPLETE } from "../../modules/signupState";
import { emailRequestAPI, emailCodeCheckAPI, signupAPI } from "../../api";
import { EmailRequestModal } from "../../components/modal";

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
  font-family: "KBO-Dia-Gothic";
  font-size: 1rem;
  font-weight: 300;
  color: #6b6880;
  box-sizing: border-box;
  padding: 0.3rem;
  margin-left: 0.6rem;
  cursor: pointer;
`;

const LineWithTwoAreasArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
// 1 internal area in the line
const InnerAreaOfLineArea = styled.div`
  position: relative;
  width: 13rem;
`;

const ModalStyles = {
  overlay: { width: "100vw", background: "rgba(2, 1, 11, 0.5)" },
  content: {
    width: "56.5rem",
    height: "35rem",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    background: "none",
    border: "none",
  },
};

export default function UserSignup() {
  const [email, setEmail] = useState(""); //Email 세팅
  const [emailAuthCode, setEmailAuthCode] = useState(""); //Email 인증 코드
  const [emailValid, setEmailValid] = useState(-1); //Email 형식 확인 여부 (-1: 초기 설정 / 0: 형식 X / 1: 형식 O)
  const [emailRequest, setEmailRequest] = useState(0); //Email 인증 요청 여부 (-1: 인증 미요청 / 0: 인증 실패 / 1: 인증 요청 api 대기 / 2: 인증 성공)
  const [emailAuth, setEmailAuth] = useState(-1); //Email 인증 코드 확인 여부 (-1: 초기 설정 / 0: 인증 실패 / 1: 인증 확인 api 대기 / 2: 인증 성공)
  const [requestModal, setRequestModal] = useState(false); //Email 인증 요청 모달 오픈 여부

  const [name, setName] = useState(""); //이름
  const [nickname, setNickname] = useState(""); //닉네임

  const [university, setUniversity] = useState(["학교", -1, -1]); //학교
  const [universityOptionVisible, setuniversityOptionVisible] = useState(false); //학교 option 보이기 여부
  const universitySelectRef = useRef(null);

  const [generation, setgeneration] = useState(["기수", -1, -1]); //기수
  const [generationOptionVisible, setgenerationOptionVisible] = useState(false); //학교 option 보이기 여부
  const generationSelectRef = useRef(null);

  const [part, setPart] = useState(["파트", -1]); //파트
  const [partOptionVisible, setPartOptionVisible] = useState(false); //학교 option 보이기 여부
  const partSelectRef = useRef(null);

  const [phoneNumber, setPhoneNumber] = useState(""); //전화번호
  const [portfolio, setPortfolio] = useState(""); //포트폴리오 링크
  const [ableBtn, setAbleBtn] = useState(false); //회원가입 버튼

  const navigate = useNavigate();
  const dispatch = useDispatch(); // action을 reducer한테 보내서 state를 update시키는 함수

  Modal.setAppElement("#root");

  /*--- Redux 관련 ---*/
  const { signupID, signupPW, access } = useSelector(
    (state) => state.signupState
  );

  useEffect(() => {
    // 앞 단계 (id, pw)를 입력하지 않고 넘어온 경우 또는 새로고침된 경우 /register/signup 페이지로 이동
    if (!access) navigate("../signup", { replace: true });
  }, []);

  /* ---- Email 관련 ----- */
  const handleChangeEmail = (e) => {
    if (emailValid === -1) setEmailValid(0); //Email Valid 검사 시작
    const inputId = e.target.value;
    setEmail(inputId);
    setEmailValid(validatEmail(inputId)); //Email 형식 여부
    setEmailRequest(-1); //Email 작성 시 인증 여부 초기화
    setEmailAuth(-1); //Email 작성 시 인증 여부 초기화
  };

  //Email 형식 조건
  const validatEmail = (e) => {
    //Email Valid 여부
    const emailtest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailtest.test(e) ? 1 : 0; // (0: 형식 X •인증 X, 1: 형식 O•인증 X)
  };

  //Email 인증 요청 이벤트
  const onClickRequest = () => {
    setEmailRequest(1); //인증 요청 api 대기 상태로 변환
    emailRequestAPI(email).then((response) => {
      if (response.isSuccess && emailValid === 1) {
        // 인증 요청 성공
        setRequestModal(true);
        setEmailRequest(2);
        setEmailAuth(-1);
      } else {
        // 인증 요청 실패
        setRequestModal(false);
        setEmailRequest(0);
        setEmailAuth(-1);
      }
    });
  };

  //Email 인증 코드 요청 영역 안내 문구
  const emailInfoText = () => {
    if (emailValid === 0) return "올바르지 않은 이메일 형식입니다.";
    else if (emailValid === 1 && emailRequest === -1)
      return "이메일 인증을 요청해주세요.";
    else if (emailRequest === 0) return "이메일 인증에 실패했습니다.";
    else if (emailRequest === 1) return "이메일 인증을 요청 중입니다.";
    else if (emailRequest === 2) return "이메일 인증에 성공했습니다.";
    else return "";
  };

  //Email 인증 코드 입력 이벤트
  const handleChangeEmailAuthCode = (e) => {
    setEmailAuthCode(e.target.value);
  };

  //Email 인증 코드 확인 이벤트
  const onClickAuth = () => {
    setEmailAuth(1); //인증 확인 api 대기 상태로 변환
    emailCodeCheckAPI(email, emailAuthCode).then((response) => {
      if (response.isSuccess) {
        // 인증 확인 성공
        setEmailAuth(2);
      } else {
        // 인증 확인 실패
        setEmailAuth(0);
      }
    });
  };

  //Email 인증 코드 요청 영역 안내 문구
  const authoInfoText = () => {
    if (emailAuth === 2) return "이메일이 인증되었습니다.";
    else if (emailAuth === 1) return "인증 코드를 확인 중입니다.";
    else if (emailAuth === 0) return "잘못된 인증 코드 입니다.";
    else return "";
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
      handleOutsideClick(
        event,
        universitySelectRef,
        setuniversityOptionVisible
      );
      handleOutsideClick(
        event,
        generationSelectRef,
        setgenerationOptionVisible
      );
      handleOutsideClick(event, partSelectRef, setPartOptionVisible);
    });

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [universitySelectRef, generationSelectRef, partSelectRef]);

  // 학교 option들 정의
  const UniversityDummy = [
    { key: "Gachon", name: "가천대학교", numCode: 1 },
    { key: "Catholic", name: "가톨릭대학교", numCode: 2 },
    { key: "Ajou", name: "아주대학교", numCode: 3 },
    { key: "Inha", name: "인하대학교", numCode: 4 },
  ];

  //기수 option들 정의
  const generationDummy = [
    { key: "1st", name: "1기", numCode: 1 },
    { key: "2nd", name: "2기", numCode: 2 },
    { key: "3rd", name: "3기", numCode: 3 },
    { key: "4th", name: "4기", numCode: 4 },
    { key: "5th", name: "5기", numCode: 5 },
  ];

  //파트들 정의
  const PartsDummy = [
    { key: "ANDROID", name: "Android" },
    { key: "IOS", name: "IOS" },
    { key: "WEB", name: "Web(React)" },
    { key: "NODEJS", name: "Server(Node)" },
    { key: "SPRINGBOOT", name: "Server(Spring)" },
    { key: "DESIGN", name: "Design" },
    { key: "PLAN", name: "Plan" },
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
    let phoneExp = /^010-\d{4}-\d{4}$/; //전화번호 정규식
    //이메일, 이름, 닉네임, 전화번호, 기수, 파트가 모두 정상일 때 버튼 활성화
    setAbleBtn(
      emailValid === 1 &&
        emailRequest === 2 &&
        emailAuth === 2 &&
        name !== "" &&
        nickname !== "" &&
        phoneNumber !== "" &&
        phoneExp.test(phoneNumber) &&
        generation[0] !== "기수" &&
        part[0] !== "파트"
    );
  }, [
    emailValid,
    emailRequest,
    emailAuth,
    name,
    nickname,
    phoneNumber,
    generation,
    part,
  ]);

  //회원가입 제출 후 홈으로 이동
  const handleSubmit = (e) => {
    e.preventDefault();
    signupAPI(
      signupID,
      signupPW,
      email,
      name,
      nickname,
      university[2],
      generation[2],
      part[2],
      phoneNumber,
      portfolio
    ).then((response) => {
      console.log("response: ", response);
      if (response.isSuccess) {
        dispatch(SIGNUP_COMPLETE({ open: true }));
        navigate("../../", { replace: true });
      } else {
        console.log("회원가입 실패");
        //
      }
    });
  };

  return (
    <div>
      <Modal
        isOpen={requestModal}
        onRequestClose={() => setRequestModal(false)}
        style={ModalStyles}
      >
        <EmailRequestModal
          request={onClickRequest}
          isClose={() => setRequestModal(false)}
        />
      </Modal>
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
                {/* 이메일 관련 */}
                <EmailArea>
                  <EmailInputArea>
                    <input
                      className="FormInput"
                      type="email"
                      placeholder="이메일"
                      value={email}
                      onChange={handleChangeEmail}
                    />
                    <div className="FormInputUnderline" />
                  </EmailInputArea>
                  <EmailAuth
                    onClick={onClickRequest}
                    disabled={emailValid !== 1 || emailRequest === 1}
                  >
                    인증 요청
                  </EmailAuth>
                </EmailArea>
                <div
                  className="ValidText"
                  style={{
                    visibility: emailValid === -1 ? "hidden" : "visible",
                    color: emailRequest === 2 ? "#014171" : "#d62117",
                  }}
                >
                  {emailInfoText()}
                </div>
                <InputGap style={{ marginTop: "2.3rem" }} />

                {/* 인증 코드 관련 */}
                <EmailArea>
                  <EmailInputArea>
                    <input
                      className="FormInput"
                      type="text"
                      placeholder="인증 코드"
                      value={emailAuthCode}
                      onChange={handleChangeEmailAuthCode}
                    />
                    <div className="FormInputUnderline" />
                  </EmailInputArea>
                  <EmailAuth
                    onClick={onClickAuth}
                    disabled={emailAuthCode === "" || emailAuth === 1}
                  >
                    코드 확인
                  </EmailAuth>
                </EmailArea>
                <div
                  className="ValidText"
                  style={{
                    visibility: emailAuth === -1 ? "hidden" : "visible",
                    color: emailAuth === 2 ? "#014171" : "#d62117",
                  }}
                >
                  {authoInfoText()}
                </div>
                <InputGap style={{ marginTop: "2.3rem" }} />

                {/* 이름, 닉네임 부분 */}
                <LineWithTwoAreasArea>
                  {/* 이름 부분 */}
                  <InnerAreaOfLineArea>
                    <input
                      className="FormInput"
                      type="text"
                      name="text"
                      placeholder="이름"
                      value={name}
                      onChange={(e) => KoreanValid(e.target.value, "name")}
                    />
                    <div className="FormInputUnderline" />
                  </InnerAreaOfLineArea>

                  {/* 닉네임 부분 */}
                  <InnerAreaOfLineArea>
                    <input
                      className="FormInput"
                      type="text"
                      placeholder="닉네임"
                      value={nickname}
                      onChange={(e) => KoreanValid(e.target.value, "nickname")}
                    />
                    <div className="FormInputUnderline" />
                  </InnerAreaOfLineArea>
                </LineWithTwoAreasArea>
                <InputGap />

                {/* 학교 부분 */}
                <SelectBox
                  onClick={() =>
                    setuniversityOptionVisible(!universityOptionVisible)
                  }
                  ref={universitySelectRef}
                >
                  <label>{university[0]}</label>
                  <SelectOptions $visible={universityOptionVisible}>
                    {UniversityDummy.map((option, i) => (
                      <Option
                        onClick={() =>
                          setUniversity([option.name, i, option.numCode])
                        }
                        key={option.key}
                        className={i === university[1] ? "selected" : ""}
                      >
                        {option.name}
                      </Option>
                    ))}
                  </SelectOptions>
                </SelectBox>
                <div className="FormInputUnderline" />
                <InputGap />

                {/* 기수, 파트 부분 */}
                <LineWithTwoAreasArea>
                  {/* 기수 */}
                  <InnerAreaOfLineArea>
                    <SelectBox
                      onClick={() =>
                        setgenerationOptionVisible(!generationOptionVisible)
                      }
                      ref={generationSelectRef}
                    >
                      <label>{generation[0]}</label>
                      <SelectOptions $visible={generationOptionVisible}>
                        {generationDummy.map((option, i) => (
                          <Option
                            onClick={() =>
                              setgeneration([option.name, i, option.numCode])
                            }
                            key={option.key}
                            className={i === generation[1] ? "selected" : ""}
                          >
                            {option.name}
                          </Option>
                        ))}
                      </SelectOptions>
                    </SelectBox>
                    <div className="FormInputUnderline" />
                  </InnerAreaOfLineArea>

                  {/* 파트 */}
                  <InnerAreaOfLineArea>
                    <SelectBox
                      onClick={() => setPartOptionVisible(!partOptionVisible)}
                      ref={partSelectRef}
                    >
                      <label>{part[0]}</label>
                      <SelectOptions $visible={partOptionVisible}>
                        {PartsDummy.map((option, i) => (
                          <Option
                            onClick={() =>
                              setPart([option.name, i, option.key])
                            }
                            key={option.key}
                            className={i === part[1] ? "selected" : ""}
                          >
                            {option.name}
                          </Option>
                        ))}
                      </SelectOptions>
                    </SelectBox>
                    <div className="FormInputUnderline" />
                  </InnerAreaOfLineArea>
                </LineWithTwoAreasArea>
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
    </div>
  );
}
