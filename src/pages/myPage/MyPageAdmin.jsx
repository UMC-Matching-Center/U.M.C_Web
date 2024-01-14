import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { IconPhotoPlus, IconPencil } from "@tabler/icons-react";

import styled from "styled-components";

const FormArea = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.bottom && props.bottom};
  & * {
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
  width: 20rem;
  border-bottom: 0.1rem solid #6b6880;
  background: transparent;
`;

{
  /*드롭박스 커스텀*/
}
const SelectBox = styled.div`
  z-index: 1;
  position: relative;
  min-width: 20rem;
  border-bottom: 0.1rem solid #6b6880;
  align-self: center;
  cursor: pointer;
  &::before {
    content: ${(props) =>
      props.show
        ? `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-up" width="15" height="15" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 15l6 -6l6 6" /></svg>')`
        : `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-down" width="15" height="15" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg>')`};
    position: absolute;
    top: 0;
    right: 0;
  }
`;
const Label = styled.label`
  font-size: 1.2rem;
  text-align: center;
`;
const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  left: 0;
  top: 0.45rem;
  width: 20rem;
  height: 12rem;
  padding: 0;
  border-left: 0.1rem solid #6b6880;
  border-right: 0.1rem solid #6b6880;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  max-height: ${(props) => (props.show ? "none" : "0")};
  background-color: #fafafa;

  color: #010004;
  font-family: KBO-Dia-Gothic;

  display: flex;
  flex-direction: column;
`;
const Option = styled.li`
  position: relative;
  font-size: 1rem;
  padding: 0.5rem 0.4rem;
  border-bottom: 0.1rem solid #6b6880;
  &:hover {
    background-color: #e7e6ea;
  }
  &::after {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    content: ${(props) =>
      props.check === "true" &&
      `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="10" height="10" viewBox="0 0 20 20" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>')`};
  }
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
  const [isShowOptions, setIsShowOptions] = useState(false); // 옵션 리스트 오픈 여부
  const [office, setOffice] = useState(location.state?.office); // 선택된 옵션 표시
  const [isCheck, setIsCheck] = useState("GACI"); //선택 옵션 체크
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

  /* ---- 지부 선택 관련 ----- */
  const handleOnChangeOption = (value, name) => {
    setIsCheck(value);
    setOffice(name);
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
            <FormArea bottom="3.2rem">
              <div className="form-label" style={{ marginRight: "3.7rem" }}>
                대표 번호
              </div>
              <MyPageInput
                value={phoneNumber}
                onChange={handlePhoneNumber}
                type="number"
                placeholder="숫자만 입력해주세요"
              />
            </FormArea>
            <FormArea bottom="8.1rem">
              <div className="form-label" style={{ marginRight: "3.7rem" }}>
                지부 선택
              </div>
              <SelectBox
                className="app__main-filter-content"
                onClick={() => setIsShowOptions((pre) => !pre)}
                show={isShowOptions}
              >
                <Label>{office}</Label>
                <SelectOptions show={isShowOptions}>
                  {OfficeOptionsDummy.map((option, i) => (
                    <Option
                      onClick={() =>
                        handleOnChangeOption(option.value, option.name)
                      }
                      key={i}
                      check={isCheck === option.value ? "true" : "false"}
                    >
                      {option.name}
                    </Option>
                  ))}
                </SelectOptions>
              </SelectBox>
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
            <FormArea bottom="3.2rem">
              <div className="form-label" style={{ marginRight: "3.7rem" }}>
                대표 번호
              </div>
              <MyPageInput value={phoneNumber} type="num" disabled />
            </FormArea>
            <FormArea bottom="9.2rem">
              <div className="form-label" style={{ marginRight: "3.7rem" }}>
                지부 선택
              </div>
              <SelectBox className="app__main-filter-content">
                <Label>{office}</Label>
              </SelectBox>
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
