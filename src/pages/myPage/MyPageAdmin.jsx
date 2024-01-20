import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { IconPhotoPlus, IconPencil } from "@tabler/icons-react";
import {
  SelectBox,
  SelectOptions,
  Option,
} from "../../common/Selectbox/RectangleSelectBox";

import styled from "styled-components";

const FormArea = styled.div`
  display: flex;
  width: 28.2rem;
  align-items: center;
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

// 지부 option들 정의
const OfficeOptionsDummy = [
  { value: "GACI", name: "GACI 지부" },
  { value: "KSSS", name: "KSSS 지부" },
  { value: "W", name: "W 지부" },
  { value: "NEPTUNE", name: "NEPTUNE 지부" },
  { value: "SQUARE", name: "SQUARE 지부" },
  { value: "CHEMI", name: "CHEMI 지부" },
];

const AdminModify = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [profileImage, setProfileImage] = useState(null); // 실제 파일 저장
  const [profileImageURL, setProfileImageURL] = useState(null); // 이미지 데이터 URL 저장

  const [phoneNumber, setPhoneNumber] = useState(
    location.state?.phoneNumber
      ? location.state.phoneNumber.replace(/[^0-9]/g, "")
      : ""
  ); // 대표전화 입력 값
  const [phoneValid, setPhoneValid] = useState(false); //전화번호 유효성 점검

  const [office, setOfiice] = useState(["GACI 지부", 0]); //지부
  const [officeOptionVisible, setOfficeOptionVisible] = useState(false); //지부 option 보이기 여부
  const officeSelectRef = useRef(null);

  const [ableBtn, setAbleBtn] = useState(false); //버튼 Enable 여부

  /* ---- 이미지 파일 관련 ----- */
  const handleProfileImageChange = (e) => {
    handleUploadImage();
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

  const handleUploadImage = () => {
    // 이미지 전송 API 추가
    console.log("Uploading image:", profileImage);
  };

  /* ---- 전화번호 관련 ----- */
  const validTelephone = (e) => {
    const tmpNumber = e.target.value;
    setPhoneNumber(
      tmpNumber
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, "$1-$2-$3")
        .replace(/(-{1,2})$/, "")
    );

    let phoneExp = /^010-\d{4}-\d{4}$/;
    setPhoneValid(phoneExp.test(tmpNumber) ? 1 : 0);
  };

  const handleSubmit = (e) => {
    /*API : 변경된 유저 정보 전송*/
    e.preventDefault();
    navigate("..", {
      state: { phoneNumber: phoneNumber, office: office, url: profileImageURL },
    });
  };

  useEffect(() => {
    //버튼 여부
    setAbleBtn(phoneValid);
  }, [phoneValid]);

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
              <div className="profile-name">가천대학교</div>
              <div className="profile-email">gachonumc@gmail.com</div>
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
                  onChange={(e) => validTelephone(e)}
                  maxLength={13}
                />
                <FormInputUnderline />
              </div>
            </FormArea>

            {/* 지부 부분 */}
            <FormArea style={{ marginBottom: "8.1rem" }}>
              <div className="form-label" style={{ flexGrow: 1 }}>
                지부 선택
              </div>
              <div style={{ width: "20rem", position: "relative" }}>
                <SelectBox
                  onClick={() => setOfficeOptionVisible(!officeOptionVisible)}
                  ref={officeSelectRef}
                >
                  <label>{office[0]}</label>
                  <SelectOptions $visible={officeOptionVisible} style={{}}>
                    {OfficeOptionsDummy.map((option, i) => (
                      <Option
                        onClick={() => setOfiice([option.name, i])}
                        key={option.value}
                        className={i === office[1] ? "selected" : ""}
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
  const location = useLocation();
  const [phoneNumber] = useState(
    location.state?.phoneNumber.replace(
      /^(\d{2,3})(\d{3,4})(\d{4})$/,
      `$1-$2-$3`
    )
  ); // 대표전화 입력 값
  const [office] = useState("GACI 지부");

  return (
    <div className="container">
      <div className="boxWrapper">
        <div className="profileBox-wrapper">
          <div className="profile_circle-bg">
            <div
              className="profile_circle"
              style={{
                backgroundImage: `url(${location.state?.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            >
              {location.state?.url ? null : (
                <IconPhotoPlus size={36} strokeWidth={1} color={"#E7E6EA"} />
              )}
            </div>
          </div>
          <div className="profileBox">
            <IconPencil
              size={20}
              strokeWidth={1}
              color={"#6B6880"}
              onClick={() => {
                navigate("/mypage/modify", {
                  state: { phoneNumber: phoneNumber, office: office },
                });
              }}
            />
            <div className="profileBox-content">
              <div className="profile-name">가천대학교</div>
              <div className="profile-email">gachonumc@gmail.com</div>
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
                <MyPageInput value={phoneNumber} type="num" disabled />
                <FormInputUnderline />
              </div>
            </FormArea>

            {/* 지부 부분 */}
            <FormArea style={{ marginBottom: "9.2rem" }}>
              <div className="form-label" style={{ flexGrow: 1 }}>
                지부 선택
              </div>
              <div style={{ width: "20rem", position: "relative" }}>
                <MyPageInput value={office} type="num" disabled />
                <FormInputUnderline />
              </div>
            </FormArea>
            <div className="boxForm-button-wrap">
              <div className="boxForm-button" onClick={() => navigate("/")}>
                로그아웃
              </div>
              <div className="boxForm-button">탈퇴하기</div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
