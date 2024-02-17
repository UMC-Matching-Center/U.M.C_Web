import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { IconPhotoPlus, IconPencil } from "@tabler/icons-react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  myPageDataAPI,
  challengerWithdrawAPI,
  challengerModifyAPI,
} from "../../api";
import useGetAccessToken from "../../utils/getAccessToken";
import Modal from "react-modal";
import { Logout, Withdraw } from "../../components/modal";
import { removeCookieToken } from "../../utils/cookies";
import { persistor } from "../../index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormArea = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 3.2rem;
  cursor: default;
  & * {
    display: flex;
    align-items: center;
    display: inline;
    color: #6b6880;
    font-family: KBO-Dia-Gothic;
    font-size: 1.2rem;
    font-weight: 300;
  }
`;

const MyPageInput = styled.input`
  outline: none;
  border: none;
  width: ${(props) => (props.width ? props.width : "20rem")};
  border-bottom: 0.1rem solid #6b6880;
  background: transparent;
`;

const ModalStyles = {
  overlay: { width: "100vw", background: "rgba(2, 1, 11, 0.5)", zIndex: "1" },
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

const UserModify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const accessToken = location.state?.accessToken;
  const autoLogin = location.state?.autoLogin;

  const [profileImage, setProfileImage] = useState(null); // 이미지 데이터
  const [profileImageURL, setProfileImageURL] = useState(
    location.state.profileImage
  ); // 이미지 데이터 URL 저장
  const nicknameName = location.state.nicknameName; // 닉네임/이름
  const email = location.state.email; // 이메일
  const university = location.state.university; // 학교
  const generation = location.state.generation; // 기수
  const part = location.state.part; // 파트
  const [phoneNumber, setPhoneNumber] = useState(location.state.phoneNumber); // 전화 입력 값
  const [portfolio, setPortfolio] = useState(location.state?.portfolio); // 포트폴리오

  const [ableBtn, setAbleBtn] = useState(false); //버튼 Enable 여부

  /* ---- 이미지 파일 관련 ----- */
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImageURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  /* ---- 전화번호 관련 ----- */
  const handlePhoneNumber = (e) => {
    setPhoneNumber(
      e.target.value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, "$1-$2-$3")
        .replace(/(-{1,2})$/, "")
    );
  };

  /*클릭 이벤트*/
  const handleSubmit = (e) => {
    e.preventDefault();
    /* API : 변경된 유저 정보 전송 */
    challengerModifyAPI(
      accessToken,
      dispatch,
      autoLogin,
      profileImage,
      portfolio,
      phoneNumber
    ).then((response) => {
      if (response.isSuccess) {
        navigate(-1, { replace: true, state: "마이페이지 수정 완료" });
      } else {
        toast.error(response.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };

  useEffect(() => {
    const phoneExp = /^010-\d{4}-\d{4}$/; //전화번호 정규식
    setAbleBtn(phoneNumber !== "" && phoneExp.test(phoneNumber));
  }, [phoneNumber]);

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="boxWrapper">
          <div className="profileBox-wrapper">
            <div className="profile_circle-bg">
              <label htmlFor="profileImageInput">
                <div
                  className="profile_circle"
                  style={{
                    backgroundImage: `url(${profileImageURL})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    cursor: "pointer",
                  }}
                >
                  {profileImageURL ? null : (
                    <IconPhotoPlus
                      size={36}
                      strokeWidth={1}
                      color={"#E7E6EA"}
                    />
                  )}
                </div>
              </label>
            </div>
            <input
              id="profileImageInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleProfileImageChange}
            />
            <div className="profileBox">
              <div className="profileBox-content">
                <div className="profile-name">{nicknameName}</div>
                <div className="profile-email">{email}</div>
              </div>
            </div>
          </div>
          <div className="infoBox">
            <div className="boxForm">
              <FormArea>
                <div className="form-label" style={{ marginRight: "4.1rem" }}>
                  학교
                </div>
                <MyPageInput value={university} disabled={true} />
              </FormArea>
              <FormArea>
                <div className="form-label" style={{ marginRight: "4.1rem" }}>
                  기수
                </div>
                <MyPageInput
                  value={generation}
                  disabled={true}
                  width="5.2rem"
                />
                <div
                  className="form-label"
                  style={{ marginLeft: "2.2rem", marginRight: "0.9rem" }}
                >
                  파트
                </div>
                <MyPageInput value={part} disabled={true} width="10rem" />
              </FormArea>
              <FormArea>
                <div className="form-label" style={{ marginRight: "2rem" }}>
                  전화번호
                </div>
                <MyPageInput
                  value={phoneNumber}
                  type="num"
                  maxLength={13}
                  onChange={handlePhoneNumber}
                />
              </FormArea>
              <FormArea>
                <div className="form-label" style={{ marginRight: "1rem" }}>
                  포트폴리오
                </div>
                <MyPageInput
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                />
              </FormArea>
              <button
                className="mypage-button"
                onClick={handleSubmit}
                style={{
                  backgroundColor: ableBtn ? "#014171" : "#01417180",
                }}
                disabled={!ableBtn}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const UserInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useGetAccessToken();
  const { autoLogin } = useSelector((state) => state.userInfo);

  const [profileImageURL, setProfileImageURL] = useState(""); // 이미지 데이터 URL 저장
  const [nicknameName, setNicknameName] = useState(""); // 닉네임/이름
  const [email, setEmail] = useState(""); // 이메일
  const [university, setUniversity] = useState(""); // 학교
  const [generation, setgeneration] = useState(""); // 기수
  const [part, setPart] = useState(""); // 파트
  const [phoneNumber, setPhoneNumber] = useState(""); // 전화 입력 값
  const [portfolio, setPortfolio] = useState(location.state?.portfolio); // 포트폴리오

  const [logout, setLogout] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  Modal.setAppElement("#root");

  //로그인 정보 초기화 하는 함수
  const purge = async () => {
    await persistor.purge();
    removeCookieToken();
  };

  // 로그아웃
  const handleLogout = async () => {
    setLogout(false); // 모달 닫기
    navigate("/", { replace: true }); // 메인 페이지로 이동
    await purge(); // 초기화 실행
  };

  // 탈퇴
  const handleWithdraw = async () => {
    // 탈퇴 API 후 성공일 때 아래 코드 실행
    challengerWithdrawAPI(accessToken, dispatch, autoLogin).then((response) => {
      if (response.isSuccess) {
        setWithdraw(false); // 모달 닫기
        // 탈퇴 API 후 성공일 때 아래 코드 실행
        navigate("/", { replace: true, state: "탈퇴가 완료되었습니다." }); // 메인 페이지로 이동
        purge(); // 초기화 실행
      } else {
        toast.error(response.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };

  // 첫 실행시 API 호출
  useEffect(() => {
    if (location.state) {
      toast.success(location.state, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    myPageDataAPI(accessToken, dispatch, autoLogin).then((response) => {
      if (response.isSuccess) {
        setProfileImageURL(response.profileImage);
        setNicknameName(`${response.nickname} / ${response.name}`);
        setEmail(response.email);
        setUniversity(response.university);
        setgeneration(response.generation);
        setPart(response.part);
        setPhoneNumber(
          response.phoneNumber.replace(
            /^(\d{2,3})(\d{3,4})(\d{4})$/,
            `$1-$2-$3`
          )
        );
        setPortfolio(response.portfolio);
      } else {
        toast.error(response.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <Modal
        isOpen={logout}
        onRequestClose={() => setLogout(false)}
        style={ModalStyles}
      >
        <Logout
          isClose={() => setLogout(false)}
          isLogout={() => handleLogout()}
        />
      </Modal>
      <Modal
        isOpen={withdraw}
        onRequestClose={() => setWithdraw(false)}
        style={ModalStyles}
      >
        <Withdraw
          isClose={() => setWithdraw(false)}
          isWithdraw={() => handleWithdraw()}
        />
      </Modal>
      <div className="container">
        <div className="boxWrapper">
          <div className="profileBox-wrapper">
            <div className="profile_circle-bg">
              <div
                className="profile_circle"
                style={{
                  backgroundImage: `url(${profileImageURL})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                }}
              >
                {profileImageURL !== "" ? null : (
                  <IconPhotoPlus size={36} strokeWidth={1} color={"#E7E6EA"} />
                )}
              </div>
            </div>
            <div className="profileBox">
              <IconPencil
                size={20}
                strokeWidth={1}
                color={"#6B6880"}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/mypage/modify", {
                    state: {
                      profileImage: profileImageURL,
                      nicknameName: nicknameName,
                      email: email,
                      university: university,
                      generation: generation,
                      part: part,
                      phoneNumber: phoneNumber,
                      portfolio: portfolio,
                      accessToken: accessToken,
                      autoLogin: autoLogin,
                    },
                  });
                }}
              />
              <div className="profileBox-content">
                <div className="profile-name">{nicknameName}</div>
                <div className="profile-email">{email}</div>
              </div>
            </div>
          </div>
          <div className="infoBox">
            <div className="boxForm">
              <FormArea>
                <div className="form-label" style={{ marginRight: "4.1rem" }}>
                  학교
                </div>
                <MyPageInput value={university || ""} disabled />
              </FormArea>
              <FormArea>
                <div className="form-label" style={{ marginRight: "4.1rem" }}>
                  기수
                </div>
                <MyPageInput value={generation || ""} disabled width="5.2rem" />
                <div
                  className="form-label"
                  style={{ marginLeft: "2.2rem", marginRight: "0.9rem" }}
                >
                  파트
                </div>
                <MyPageInput value={part || ""} disabled width="10rem" />
              </FormArea>
              <FormArea>
                <div className="form-label" style={{ marginRight: "2rem" }}>
                  전화번호
                </div>
                <MyPageInput value={phoneNumber || ""} type="num" disabled />
              </FormArea>
              <FormArea>
                <div className="form-label" style={{ marginRight: "1rem" }}>
                  포트폴리오
                </div>
                <MyPageInput value={portfolio || ""} disabled />
              </FormArea>
              <div className="boxForm-button-wrap">
                <div className="boxForm-button" onClick={() => setLogout(true)}>
                  로그아웃
                </div>
                <div
                  className="boxForm-button"
                  onClick={() => setWithdraw(true)}
                >
                  탈퇴하기
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function MyPageUser() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserInfo />} />
        <Route path="/modify" element={<UserModify />} />
      </Routes>
    </>
  );
}

export default MyPageUser;
