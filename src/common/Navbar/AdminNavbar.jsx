import React, { useState, useEffect } from "react";
import Logo from "../../images/logo_crop.png";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
  IconPin,
  IconBell,
  IconUser,
  IconUsers,
  IconUserPlus,
} from "@tabler/icons-react";
const AlarmDummy = [
  {
    type: "match",
    content: "00 챌린저의 매칭이 완료되었습니다.",
    date: "2023년 12월 12일",
  },
  {
    type: "match",
    content: "새로운 챌린저의 가입신청이 등록되었습니다.",
    date: "2023년 12월 12일",
  },
  {
    type: "join",
    content: "00 챌린저의 매칭이 완료되었습니다.",
    date: "2023년 12월 12일",
  },
  {
    type: "match",
    content: "00 챌린저의 매칭이 완료되었습니다.",
    date: "2023년 12월 12일",
  },
  {
    type: "join",
    content: "새로운 챌린저의 가입신청이 등록되었습니다.",
    date: "2023년 12월 12일",
  },
  {
    type: "match",
    content: "00 챌린저의 매칭이 완료되었습니다.",
    date: "2023년 12월 12일",
  },
];
const UserNavWrapper = styled.div`
  position: relative;
  min-width: 126.6rem;
`;
const UserNavItems = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;
const UserNavItem = styled.li`
  display: flex;
  position: relative;

  &:nth-child(2) {
    width: 42.2rem;
    height: 3.4rem;
  }
  &:nth-child(3) {
    width: 15.6rem;
    height: 3.6rem;
  }
`;
const UserNavMenuItem = styled.div`
  width: 14.5rem;
  height: 3.4rem;
  display: flex;
  justify-content: center;

  &.active {
    border-bottom: 0.1rem #cecdd5 solid;
    > a {
      font-weight: 500;
    }
  }

  > a {
    text-decoration: none;
    font-family: KBO-Dia-Gothic;
    font-size: 2.4rem;
    font-weight: 300;
    color: #cecdd5;
  }
`;
const RedCircleFilled = styled.div`
  display: ${(props) => !props.aliveAlarm && "none"};
  position: absolute;
  width: 0.8rem;
  height: 0.8rem;
  background-color: #d62117;
  border-radius: 1rem;
  top: 0.1rem;
  left: 8.8rem;
`;
const AlarmModal = styled.div`
  display: ${(props) => props.display && "none"};
  z-index: 2;
  position: absolute;
  left: 81rem;
  top: 11.6rem;
  width: 41rem;
  height: 62.6rem;
  border-radius: 1rem;
  background-color: #fafafa;

  &:before {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 0 1rem 2.6rem 1rem;
    border-color: #fafafa transparent;
    display: block;
    width: 0;
    z-index: 0;
    top: -2rem;
    left: 35.8rem;
  }
`;
const ModalContentBox = styled.div`
  padding: 2rem 0.6rem 2rem 2rem;
`;

const ContentBoxTitle = styled.div`
  margin-left: 1.4rem;
  color: #02010b;
  font-family: KBO-Dia-Gothic;
  font-size: 2rem;
  font-weight: 300;
`;

const ContentBoxSubTitle = styled.div`
  text-align: right;
  margin-top: 2rem;
  margin-right: 2.9rem;
  color: #9c9aab;
  font-family: KBO-Dia-Gothic;
  font-size: 1rem;
  font-weight: 300;
  &:hover {
    cursor: pointer;
  }
`;

const ModalContent = styled.div`
  overflow-y: scroll;
  height: 51.6rem;
  &::-webkit-scrollbar {
    width: 0.6rem;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%;
    border-radius: 5rem;
    background-color: #9c9aab;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const AlarmContent = styled.div`
  padding: 0;
  margin: 0;
  position: relative;
  width: 35.5rem;
  height: 11.7rem;
  &:hover {
    cursor: pointer;
  }
  display: flex;
  align-items: center;
`;

const AlarmContentDetail = styled.div`
  display: flex;
  margin: 0 0 0 1.4rem;
`;
const ContentDetailWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.1rem;
`;

const ContentDetailText = styled.div`
  color: ${(props) => props.color};
  font-family: KBO-Dia-Gothic;
  font-size: ${(props) => props.size};
  font-weight: 300;
  margin-top: ${(props) => props.margin};
`;
const BlueCircleFilled = styled.div`
  position: absolute;
  top: 5.8rem;
  right: 0;
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  background-color: #014171;
`;
const AlarmSeperateBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 34rem;
  height: 0.1rem;
  background-color: #cecdd5;
`;

const AdminNavbar = () => {
  const navigate = useNavigate();

  /*읽지 않은 알람이 존재하는 지 여부*/
  const [aliveAlarm, setAliveAlarm] = useState(true);
  /*알림창 토글*/
  const [isViewModal, setIsViewModal] = useState(false);
  /*각 알림을 읽었는지를 나타내는 bluecircle 표시*/
  const [blueCircleVisibility, setBlueCircleVisibility] = useState(
    Array(AlarmDummy.length).fill(true)
  );
  /*선택된 메뉴 표시*/
  const [selectIndex, setSelectIndex] = useState(0);
  const handleNavIndex = (idx) => {
    setSelectIndex(idx);
  };

  /*각 알림 클릭 시, 각 bluecircle 제거*/
  const toggleBlueCircleVisibility = (index) => {
    const updatedVisibility = [...blueCircleVisibility];
    if (updatedVisibility[index] == true) {
      updatedVisibility[index] = !updatedVisibility[index];
      setBlueCircleVisibility(updatedVisibility);
    }
  };

  useEffect(() => {
    const arr = blueCircleVisibility.filter((circle) => {
      if (circle === true) return true;
    });
    arr.length === 0 ? setAliveAlarm(false) : setAliveAlarm(true);
  }, [blueCircleVisibility]);

  return (
    <UserNavWrapper>
      <UserNavItems>
        <UserNavItem>
          <Link to="/">
            <img src={Logo} />
          </Link>
        </UserNavItem>
        <UserNavItem>
          <UserNavMenuItem className={`${selectIndex === 0 && "active"}`}>
            <Link
              to="/challenger"
              onClick={() => {
                handleNavIndex(0);
              }}
            >
              Challenger
            </Link>
          </UserNavMenuItem>
          <UserNavMenuItem
            className={`${selectIndex === 1 && "active"}`}
            style={{ margin: "0 3.1rem" }}
          >
            <Link
              to="/schedule"
              onClick={() => {
                handleNavIndex(1);
              }}
            >
              Schedule
            </Link>
          </UserNavMenuItem>
          <UserNavMenuItem className={`${selectIndex === 2 && "active"}`}>
            <Link
              to="/matching"
              onClick={() => {
                handleNavIndex(2);
              }}
            >
              Matching
            </Link>
          </UserNavMenuItem>
        </UserNavItem>
        <UserNavItem>
          <IconPin
            strokeWidth={1}
            color={"#cecdd5"}
            size={36}
            onClick={() => navigate("/")}
          />
          <IconBell
            strokeWidth={1}
            color={"#cecdd5"}
            size={36}
            style={{ margin: "0 2.4rem" }}
            onClick={() => setIsViewModal((pre) => !pre)}
          />
          <RedCircleFilled aliveAlarm={aliveAlarm} />
          <IconUser
            strokeWidth={1}
            color={"#cecdd5"}
            size={36}
            onClick={() => navigate("/mypage")}
          />
        </UserNavItem>
      </UserNavItems>
      <AlarmModal display={isViewModal}>
        <ModalContentBox>
          <ContentBoxTitle>알림</ContentBoxTitle>
          <ContentBoxSubTitle
            onClick={() => {
              /*클릭 시, 읽은 알림 삭제*/
            }}
          >
            읽은 알림 삭제
          </ContentBoxSubTitle>
          <ModalContent>
            {AlarmDummy.map((alarm, idx) => {
              return (
                <AlarmContent
                  key={idx}
                  onClick={() => toggleBlueCircleVisibility(idx)}
                >
                  <AlarmContentDetail>
                    {alarm.type === "match" ? (
                      <IconUsers color={"#131313"} size={24} strokeWidth={1} />
                    ) : (
                      <IconUserPlus
                        color={"#131313"}
                        size={24}
                        strokeWidth={1}
                      />
                    )}
                    <ContentDetailWrap>
                      <ContentDetailText
                        color="#02010b"
                        size="1.6rem"
                        margin="0.4rem"
                      >
                        {alarm.type === "match" ? "매칭" : "가입"}
                      </ContentDetailText>
                      <ContentDetailText
                        color="#6b6880"
                        size="1.4rem"
                        margin="1.4rem"
                      >
                        {alarm.content}
                      </ContentDetailText>
                      <ContentDetailText
                        color="#9c9aab"
                        size="1rem"
                        margin="1rem"
                      >
                        {alarm.date}
                      </ContentDetailText>
                    </ContentDetailWrap>
                  </AlarmContentDetail>
                  {blueCircleVisibility[idx] && <BlueCircleFilled />}
                  {AlarmDummy.length - 1 !== idx && <AlarmSeperateBar />}
                </AlarmContent>
              );
            })}
          </ModalContent>
        </ModalContentBox>
      </AlarmModal>
    </UserNavWrapper>
  );
};

export default AdminNavbar;
