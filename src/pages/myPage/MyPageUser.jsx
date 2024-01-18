import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { IconPhotoPlus, IconPencil } from "@tabler/icons-react";

import styled from "styled-components";

const FormArea = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 3.2rem;
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

const UserModify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileImage, setProfileImage] = useState(null); // 실제 파일 저장
  const [profileImageURL, setProfileImageURL] = useState(null); // 이미지 데이터 URL 저장
  const [school, setSchool] = useState(location.state?.school); // 학교
  const [year, setYear] = useState(location.state?.year); // 기수
  const [part, setPart] = useState(location.state?.part); // 파트
  const [phoneNumber, setPhoneNumber] = useState(
    location.state?.phoneNumber
      ? location.state.phoneNumber.replace(/[^0-9]/g, "")
      : ""
  ); //전화번호 입력 값
  const [phoneValid, setPhoneValid] = useState(false); //전화번호 유효성 점검
  const [portfolio, setPortfolio] = useState(location.state?.portfolio); // 포트폴리오
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
  const handlePhoneNumber = (e) => {
    const phone = e.target.value;

    setPhoneNumber(phone);
    setPhoneValid(validPhone(phone));
  };

  const validPhone = (phone) => {
    var regExp = /^010\d{8}$/;
    return regExp.test(phone) ? 1 : 0; // 정규식에 부합하다면 1 반환
  };

  /*클릭 이벤트*/
  const handleSubmit = (e) => {
    /*API : 변경된 유저 정보 전송*/
    e.preventDefault();
    navigate("..", {
      state: {
        school: school,
        year: year,
        part: part,
        phoneNumber: phoneNumber,
        portfolio: portfolio,
        url: profileImageURL,
      },
    });
  };

  useEffect(() => {
    //이름, 닉네임, 전화번호, 학교, 파트가 모두 입력•선택되었을 때 버튼 활성화
    setAbleBtn(
      school !== "" &&
        year !== "" &&
        part !== "" &&
        phoneNumber !== "" &&
        phoneValid &&
        portfolio !== ""
    );
  }, [school, year, part, phoneNumber, portfolio, phoneValid]);

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
              <div className="profile-name">루나/고지민</div>
              <div className="profile-email">gachonumc@gmail.com</div>
            </div>
          </div>
        </div>
        <div className="infoBox">
          <div className="boxForm">
            <FormArea>
              <div className="form-label" style={{ marginRight: "4.1rem" }}>
                학교
              </div>
              <MyPageInput
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
            </FormArea>
            <FormArea>
              <div className="form-label" style={{ marginRight: "4.1rem" }}>
                기수
              </div>
              <MyPageInput
                value={year}
                onChange={(e) => setYear(e.target.value)}
                width="5.2rem"
              />
              <div
                className="form-label"
                style={{ marginLeft: "2.2rem", marginRight: "0.9rem" }}
              >
                파트
              </div>
              <MyPageInput
                value={part}
                onChange={(e) => setPart(e.target.value)}
                width="10rem"
              />
            </FormArea>
            <FormArea>
              <div className="form-label" style={{ marginRight: "2rem" }}>
                전화번호
              </div>
              <MyPageInput
                value={phoneNumber}
                type="num"
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
  );
};

const UserInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [school] = useState(location.state?.school); // 학교
  const [year] = useState(location.state?.year); // 기수
  const [part] = useState(location.state?.part); // 파트
  const [phoneNumber] = useState(
    location.state?.phoneNumber.replace(
      /^(\d{2,3})(\d{3,4})(\d{4})$/,
      `$1-$2-$3`
    )
  ); // 전화 입력 값
  const [portfolio] = useState(location.state?.portfolio); // 포트폴리오

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
                  state: {
                    year: year,
                    school: school,
                    part: part,
                    phoneNumber: phoneNumber,
                    portfolio: portfolio,
                  },
                });
              }}
            />
            <div className="profileBox-content">
              <div className="profile-name">루나/고지민</div>
              <div className="profile-email">gachonumc@gmail.com</div>
            </div>
          </div>
        </div>
        <div className="infoBox">
          <div className="boxForm">
            <FormArea>
              <div className="form-label" style={{ marginRight: "4.1rem" }}>
                학교
              </div>
              <MyPageInput value={school} disabled />
            </FormArea>
            <FormArea>
              <div className="form-label" style={{ marginRight: "4.1rem" }}>
                기수
              </div>
              <MyPageInput value={year} disabled width="5.2rem" />
              <div
                className="form-label"
                style={{ marginLeft: "2.2rem", marginRight: "0.9rem" }}
              >
                파트
              </div>
              <MyPageInput value={part} disabled width="10rem" />
            </FormArea>
            <FormArea>
              <div className="form-label" style={{ marginRight: "2rem" }}>
                전화번호
              </div>
              <MyPageInput value={phoneNumber} type="num" disabled />
            </FormArea>
            <FormArea style={{ marginBottom: "4.3rem" }}>
              <div className="form-label" style={{ marginRight: "1rem" }}>
                포트폴리오
              </div>
              <MyPageInput value={portfolio} disabled />
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
