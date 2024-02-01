import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { IconPhotoPlus, IconPencil } from "@tabler/icons-react";
import {
  SelectBox,
  SelectOptions,
  Option,
} from "../../common/Selectbox/RectangleSelectBox";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { myPageDataAPI, adminModifyAPI } from "../../api";
import useGetAccessToken from "../../utils/getAccessToken";
import Modal from "react-modal";
import { Logout } from "../../components/Modal";
import { removeCookieToken } from "../../utils/cookies";
import { persistor } from "../../index";

const FormArea = styled.div`
  display: flex;
  width: 28.2rem;
  align-items: center;
  cursor: default;
`;

const MyPageInput = styled.input`
  outline: none;
  border: none;
  padding: 0 0.5rem;
  width: 100%;
  background: transparent;
  font-size: 1.2rem;
  font-weight: 300;
  font-family: "KBO-Dia-Gothic";
  color: #6b6880;
`;

const FormInputUnderline = styled.div`
  min-height: 0.4rem;
  box-sizing: border-box;
  border-bottom: 1px solid #6b6880;
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

// 지부 option들 정의
const OfficeOptionsDummy = [
  { key: "GACI", name: "GACI 지부" },
  { key: "KSSS", name: "KSSS 지부" },
  { key: "W", name: "W 지부" },
  { key: "NEPTUNE", name: "NEPTUNE 지부" },
  { key: "SQUARE", name: "SQUARE 지부" },
  { key: "CHEMI", name: "CHEMI 지부" },
];

const AdminModify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const accessToken = location.state?.accessToken;

  const [profileImage, setProfileImage] = useState(null); // 이미지 데이터
  const [profileImageURL, setProfileImageURL] = useState(
    location.state.profileImage
  ); // 이미지 데이터 URL 저장
  const nicknameName = location.state.nicknameName; // 닉네임/이름
  const email = location.state.email; // 이메일
  const [phoneNumber, setPhoneNumber] = useState(location.state.phoneNumber); // 전화 입력 값
  const [office, setOffice] = useState([
    location.state.office,
    `${location.state.office} 지부`,
  ]); //지부
  const [officeOptionVisible, setOfficeOptionVisible] = useState(false); //지부 option 보이기 여부
  const officeSelectRef = useRef(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    /* API : 변경된 유저 정보 전송 */
    adminModifyAPI(
      accessToken,
      dispatch,
      profileImage,
      phoneNumber,
      office[0]
    ).then((response) => {
      if (response.isSuccess) {
        navigate(-1, { replace: true });
      } else {
        alert(response.message);
      }
    });
  };

  useEffect(() => {
    const phoneExp = /^010-\d{4}-\d{4}$/; //전화번호 정규식
    setAbleBtn(phoneNumber !== "" && phoneExp.test(phoneNumber));
  }, [phoneNumber]);

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
      handleOutsideClick(event, officeSelectRef, setOfficeOptionVisible);
    });

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [officeSelectRef]);

  return (
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
                  <IconPhotoPlus size={36} strokeWidth={1} color={"#E7E6EA"} />
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
            <FormArea style={{ marginBottom: "3.2rem" }}>
              <div className="form-label" style={{ flexGrow: 1 }}>
                대표 번호
              </div>
              <div style={{ width: "20rem" }}>
                <MyPageInput
                  type="tel"
                  placeholder="숫자만 입력해주세요"
                  value={phoneNumber}
                  onChange={(e) => handlePhoneNumber(e)}
                  maxLength={13}
                />
                <FormInputUnderline />
              </div>
            </FormArea>

            {/* 지부 부분 */}
            <FormArea style={{ marginBottom: "9.2rem" }}>
              <div className="form-label" style={{ flexGrow: 1 }}>
                지부 선택
              </div>
              <div style={{ width: "20rem", position: "relative" }}>
                <SelectBox
                  onClick={() => setOfficeOptionVisible(!officeOptionVisible)}
                  ref={officeSelectRef}
                >
                  <label style={{ cursor: "pointer" }}>{office[1]}</label>
                  <SelectOptions $visible={officeOptionVisible}>
                    {OfficeOptionsDummy.map((option) => (
                      <Option
                        onClick={() => setOffice([option.key, option.name])}
                        key={option.key}
                        className={option.key === office[0] ? "selected" : ""}
                      >
                        {option.name}
                      </Option>
                    ))}
                  </SelectOptions>
                </SelectBox>
                <FormInputUnderline />
              </div>
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
  );
};

const AdminInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useGetAccessToken();

  const [profileImageURL, setProfileImageURL] = useState(""); // 이미지 데이터 URL 저장
  const [nicknameName, setNicknameName] = useState(""); // 닉네임/이름
  const [email, setEmail] = useState(""); // 이메일
  const [office, setOffice] = useState(""); // 지부
  const [phoneNumber, setPhoneNumber] = useState(""); // 대표전화

  const [logout, setLogout] = useState(false);
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

  // 첫 실행시 API 호출
  useEffect(() => {
    if (accessToken !== "") {
      myPageDataAPI(accessToken, dispatch).then((response) => {
        if (response.isSuccess) {
          setProfileImageURL(response.profileImage);
          setNicknameName(response.nicknameName);
          setEmail(response.email);
          setOffice(response.office);
          setPhoneNumber(
            response.phoneNumber.replace(
              /^(\d{2,3})(\d{3,4})(\d{4})$/,
              `$1-$2-$3`
            )
          );
        } else {
          alert(response.message);
        }
      });
    } else {
      navigate("/register", { replace: true }); // 메인 페이지로 이동
    }
  }, []);

  return (
    <>
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
                {profileImageURL ? null : (
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
                      office: office,
                      phoneNumber: phoneNumber,
                      accessToken: accessToken,
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
              <FormArea style={{ marginBottom: "3.2rem" }}>
                <div className="form-label" style={{ flexGrow: 1 }}>
                  대표 번호
                </div>
                <div style={{ width: "20rem" }}>
                  <MyPageInput value={phoneNumber || ""} type="num" disabled />
                  <FormInputUnderline />
                </div>
              </FormArea>

              {/* 지부 부분 */}
              <FormArea style={{ marginBottom: "9.2rem" }}>
                <div className="form-label" style={{ flexGrow: 1 }}>
                  지부 선택
                </div>
                <div style={{ width: "20rem", position: "relative" }}>
                  <MyPageInput value={office || ""} type="num" disabled />
                  <FormInputUnderline />
                </div>
              </FormArea>
              <div className="boxForm-button-wrap">
                <div className="boxForm-button" onClick={() => setLogout(true)}>
                  로그아웃
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function MyPageAdmin() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminInfo />} />
        <Route path="/modify" element={<AdminModify />} />
      </Routes>
    </>
  );
}

export default MyPageAdmin;
