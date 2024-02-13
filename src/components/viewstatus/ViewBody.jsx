import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { ViewStatusModal } from "../modal";

//파트 컨테이너
const PartContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5.2rem;
  &:first-child {
    margin-top: 0rem;
  }
`;

//파트가 존재하지 않을 경우 박스
const NoPartContainer = styled.div`
  margin: 11rem 0 17rem 35.2rem;
  color: #fafafa;
  font-size: 1.8rem;
  font-weight: 300;
  line-height: 150%;
`;

//파트
const Part = styled.div`
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 150%;
`;

//해당 박스 리스트 우측으로 나열 시키기 위한 것
const AppBoxList = styled.div`
  display: flex;
  flex-direction: row;
`;

//해당 박스 총 컨테이너
const AppBoxContainer = styled.div`
  width: 20rem;
  height: 24.3rem;
  margin: 2rem 4rem 0 0;
`;

//프로필 하얀색 테두리 컨테이너
const AppProfileContainer = styled.div`
  width: 8.5rem;
  height: 8.5rem;
  background-color: #fafafa;
  border-radius: 42.5rem;
  position: absolute;
  margin-left: 5.6rem;
`;

//프로필 파란색 안쪽 박스
const AppProfileBox = styled.div`
  width: 7.65rem;
  height: 7.65rem;
  position: absolute;
  background-color: #014171;
  border-radius: 42.5rem;
  position: absolute;
  margin: 0.4rem;
`;

//프로필 이미지 위치 설정
const ProfileImg = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

//해당 기본 디펄트 이미지
const DefaultCardImg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="84"
    height="84"
    viewBox="0 0 84 84"
    fill="none"
  >
    <g clipPath="url(#clip0_2734_5309)">
      <path
        d="M14 74V65.6667C14 61.2464 15.9667 57.0072 19.4673 53.8816C22.968 50.756 27.716 49 32.6667 49H51.3333C56.284 49 61.032 50.756 64.5327 53.8816C68.0333 57.0072 70 61.2464 70 65.6667V74M28 24.5C28 28.213 29.475 31.774 32.1005 34.3995C34.726 37.025 38.287 38.5 42 38.5C45.713 38.5 49.274 37.025 51.8995 34.3995C54.525 31.774 56 28.213 56 24.5C56 20.787 54.525 17.226 51.8995 14.6005C49.274 11.975 45.713 10.5 42 10.5C38.287 10.5 34.726 11.975 32.1005 14.6005C29.475 17.226 28 20.787 28 24.5Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2734_5309">
        <rect width="84" height="84" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

//해당 아래 하얀색 박스
const AppBox = styled.div`
  margin-top: 4.3rem;
  display: flex;
  flex-direction: column;
  width: 20rem;
  height: 20rem;
  background-color: #fafafa;
  border-radius: 10px;
  align-items: center;
  line-height: 150%;
  font-size: 1.4rem;
  font-weight: 300;
  color: #131313;
`;

//이름 칸
const NameBox = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  margin-top: 4.65rem;
`;

//학교 칸
const SchoolBox = styled.div`
  margin-top: 0.6rem;
`;

//포트폴리오 칸
const PortBox = styled.div`
  color: #7d7d7d;
  display: flex;
  font-size: 1.2rem;
  flex-direction: column;
  margin: 2.4rem 1rem 0 0;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

//포트폴리오 화살표 SVG
const PortArrowSVG = styled.svg`
  position: absolute;
  margin: 0.5rem 0 0 0.4rem;
`;

//포토폴리오 화살표 사진
const PortArrow = () => (
  <PortArrowSVG
    xmlns="http://www.w3.org/2000/svg"
    width="6"
    height="10"
    viewBox="0 0 6 10"
    fill="none"
  >
    <path
      d="M1 9L5 5L1 1"
      stroke="#7D7D7D"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </PortArrowSVG>
);

//버튼 컨테이너
const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1.4rem;
  font-weight: 500;
`;

//체크 박스
const CheckBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d62117;
  width: 6.8rem;
  height: 3.2rem;
  border-radius: 1rem;
  color: #fafafa;
  cursor: pointer;
  &:first-child {
    margin-right: 1rem;
    background-color: #0281e2;
  }
  &:hover {
    opacity: 0.8;
  }
`;

//모달 스타일
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

//바디 부분을 위한 옵션 리스트
const OptionList = [
  { num: 1, content: "DESIGN", display: "Design" },
  { num: 2, content: "ANDROID", display: "Android" },
  { num: 3, content: "IOS", display: "iOS" },
  { num: 4, content: "WEB", display: "Web" },
  { num: 5, content: "SPRINGBOOT", display: "Spring Boot" },
  { num: 6, content: "NODEJS", display: "Node.js" },
];

export default function ViewBody({
  selectedOptionIndex,
  applicantInfoList,
  handlePassOrFail,
  showModal,
  setShowModal,
}) {
  const [modalType, setModalType] = useState(null); //합격,불합격 나누기 위한 것
  const [selectedAppName, setSelectedAppName] = useState(null); //AlertModal로 넘겨줄 name 생성
  const [selectedAppId, setSelectedAppId] = useState(null); //Alermodal로 넘겨줄 id 생성

  //합격 버튼 눌렀을 때,
  const handlePass = (name, memberId) => {
    setShowModal(true);
    setModalType("합격");
    setSelectedAppName(name);
    setSelectedAppId(memberId);
  };

  //불합격 버튼 눌렀을 때,
  const handleFail = (name, memberId) => {
    setShowModal(true);
    setModalType("불합격");
    setSelectedAppName(name);
    setSelectedAppId(memberId);
  };
  const someApps = applicantInfoList.some(
    (app) => app.memberMatchingStatus === "APPLY"
  );
  return (
    <>
      {OptionList.map((option, i) => {
        const filteredApps = applicantInfoList.filter(
          (app) =>
            app.memberPart === option.content &&
            app.memberMatchingStatus === "APPLY"
        );

        const shouldRenderPartContainer =
          filteredApps.length > 0 &&
          (selectedOptionIndex === option.display ||
            selectedOptionIndex === "전체보기");
        console.log(filteredApps);

        return shouldRenderPartContainer ? (
          <PartContainer key={option.num}>
            <Part>{option.display}</Part>
            <AppBoxList>
              {filteredApps.map((app) => (
                <AppBoxContainer key={app.memberId}>
                  <AppProfileContainer>
                    <AppProfileBox>
                      <ProfileImg
                        style={{
                          backgroundImage: `url(${app.profileImage})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center center",
                        }}
                      >
                        {app.profileImage ? null : <DefaultCardImg />}
                      </ProfileImg>
                    </AppProfileBox>
                  </AppProfileContainer>
                  <AppBox>
                    <NameBox>
                      {app.nameNickname.split("/")[0].trim()} /{" "}
                      {app.nameNickname.split("/")[1].trim()}
                    </NameBox>
                    <SchoolBox>{app.university}</SchoolBox>
                    <PhoneNumBox>{app.phoneNum}</PhoneNumBox>
                    <PortBox>
                      <a href={app.portFolio}>
                        포트폴리오 보러가기
                        <PortArrow />
                      </a>
                    </PortBox>
                    <BtnContainer>
                      <CheckBtn
                        onClick={() =>
                          handlePass(
                            app.nameNickname.split("/")[0].trim(),
                            app.memberId
                          )
                        }
                      >
                        합격
                      </CheckBtn>
                      <CheckBtn
                        onClick={() =>
                          handleFail(
                            app.nameNickname.split("/")[0].trim(),
                            app.memberId
                          )
                        }
                      >
                        불합격
                      </CheckBtn>
                    </BtnContainer>
                  </AppBox>
                </AppBoxContainer>
              ))}
            </AppBoxList>
          </PartContainer>
        ) : (
          filteredApps.length === 0 &&
            (selectedOptionIndex === option.display ||
              (selectedOptionIndex === "전체보기" && !someApps && i == 0)) && (
              <NoPartContainer key={option.num}>
                해당 파트에 지원한 사람이 없습니다.
              </NoPartContainer>
            )
        );
      })}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={ModalStyles}
      >
        <ViewStatusModal
          setShowModal={setShowModal}
          modalType={modalType}
          selectedAppName={selectedAppName}
          handlePassOrFail={handlePassOrFail}
          selectedAppId={selectedAppId}
        />
      </Modal>
    </>
  );
}
