import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { IconPin, IconBell, IconUser } from "@tabler/icons-react";

import Logo from "../../images/logo_crop.svg";
import { AlarmContainer } from "../Alarm/AlarmModal";
import "./Navbar.css";

const AlarmDummy = [
  {
    type: "match",
    content: "00 챌린저의 매칭이 완료되었습니다.",
    date: "2023년 12월 12일",
    is_confirm: false,
  },
  {
    type: "match",
    content: "새로운 챌린저의 가입신청이 등록되었습니다.",
    date: "2023년 12월 12일",
    is_confirm: false,
  },
  {
    type: "join",
    content: "00 챌린저의 매칭이 완료되었습니다.",
    date: "2023년 12월 12일",
    is_confirm: true,
  },
  {
    type: "match",
    content: "00 챌린저의 매칭이 완료되었습니다.",
    date: "2023년 12월 12일",
    is_confirm: true,
  },
  {
    type: "join",
    content: "새로운 챌린저의 가입신청이 등록되었습니다.",
    date: "2023년 12월 12일",
    is_confirm: true,
  },
  {
    type: "match",
    content: "00 챌린저의 매칭이 완료되었습니다.",
    date: "2023년 12월 12일",
    is_confirm: true,
  },
];

const UserNavMenuItem = styled.div`
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
    text-align: center;
    font-family: KBO-Dia-Gothic;
    font-size: 2.4rem;
    font-weight: 300;
    color: #cecdd5;

    &:hover {
      font-weight: 500;
    }

    &::after {
      content: attr(title);
      display: block;
      font-weight: 500;
      height: 0px;
      visibility: hidden;
    }
  }
`;

const SubMenuWrapper = styled.div`
  padding-top: 1.8rem;
  position: absolute;
  top: 9rem;
  display: none;
  flex-direction: column;
  z-index: 1;

  ${UserNavMenuItem}:hover & {
    display: flex;
  }
`;

const SubMenuItem = styled(UserNavMenuItem)`
  width: 13.5rem;
  margin-bottom: 0.2rem;
  > a {
    color: #cecdd5;
    font-weigth: 300;
    font-size: 1.8rem;

    &:hover {
      font-weight: 500;
      color: #e7e6ea;
    }
  }
`;

const AdminNavbar = () => {
  const navigate = useNavigate();

  /*읽지 않은 알람이 존재하는 지 여부*/
  const [aliveAlarm, setAliveAlarm] = useState(true);
  /*알림창 토글*/
  const [isViewModal, setIsViewModal] = useState(false);
  /*각 알림을 읽었는지를 나타내는 bluecircle 표시 = is_confirmed*/
  const [alarmContent, setAlarmContent] = useState(AlarmDummy);

  /*선택된 메뉴 표시*/
  const [selectIndex, setSelectIndex] = useState(0);
  const handleNavIndex = (idx) => {
    setIsViewModal(false);
    setSelectIndex(idx);
  };

  /*알림창 클릭 이벤트*/
  const handleIconBellClick = () => {
    setIsViewModal((pre) => !pre);
    // Toggle alarm modal red circle
    if (aliveAlarm) setAliveAlarm((pre) => !pre);
    // If the modal is closing, reset BlueCircleVisibility
    if (isViewModal) {
      const updatedVisibility = [...alarmContent].map((alarm) => ({
        ...alarm,
        is_confirm: alarm.is_confirm === false ? true : alarm.is_confirm,
      }));
      setAlarmContent(updatedVisibility);
    }
  };

  /*알림창 삭제 이벤트*/
  const deleteAlarm = () => {
    if (alarmContent.length > 0) {
      const updatedArr = [...alarmContent].filter(
        (arr) => arr.is_confirm === false
      );
      setAlarmContent(updatedArr);
    }
  };

  return (
    <>
      <div className="app__nav">
        <div className="nav_area">
          <div className="nav_logo">
            <Link to="/challenger/manage">
              <img
                src={Logo}
                onClick={() => {
                  handleNavIndex(0);
                }}
              />
            </Link>
          </div>
          <ul className="nav_center">
            <UserNavMenuItem className={`${selectIndex === 0 && "active"}`}>
              <Link
                to="/challenger/manage"
                onClick={() => {
                  handleNavIndex(0);
                }}
                title="Challenger"
              >
                Challenger
              </Link>
              <SubMenuWrapper>
                <SubMenuItem>
                  <Link
                    to="/challenger/manage"
                    onClick={() => {
                      handleNavIndex(0);
                    }}
                  >
                    챌린저 관리
                  </Link>
                </SubMenuItem>
                <SubMenuItem>
                  <Link
                    to="/challenger/new"
                    onClick={() => {
                      handleNavIndex(0);
                    }}
                  >
                    신규 챌린저
                  </Link>
                </SubMenuItem>
              </SubMenuWrapper>
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
                title="Schedule"
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
                title="Matching"
              >
                Matching
              </Link>
            </UserNavMenuItem>
          </ul>
          <div className="nav_right">
            <div
              className="icon-bg"
              style={{
                background: selectIndex === 3 && "#0261AA",
              }}
            >
              <IconPin
                strokeWidth={selectIndex === 3 ? 1.5 : 1}
                color={"#cecdd5"}
                size={36}
                onClick={() => {
                  navigate("/notice");
                  handleNavIndex(3);
                }}
              />
            </div>
            <div
              style={{
                position: "relative",
                margin: "0 2.4rem",
              }}
            >
              <IconBell
                strokeWidth={1}
                color={"#cecdd5"}
                size={36}
                style={{ display: "block" }}
                onClick={() => {
                  handleIconBellClick();
                }}
              />
              <AlarmContainer
                aliveAlarm={aliveAlarm}
                isViewModal={isViewModal}
                deleteAlarm={deleteAlarm}
                alarmContent={alarmContent}
                handleNavIndex={handleNavIndex}
                handleIconBellClick={handleIconBellClick}
              />
            </div>
            <div
              className="icon-bg"
              style={{
                background: selectIndex === 5 && "#0261AA",
              }}
            >
              <IconUser
                strokeWidth={selectIndex === 5 ? 1.5 : 1}
                color={"#cecdd5"}
                size={36}
                onClick={() => {
                  navigate("/mypage"), handleNavIndex(5);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default AdminNavbar;
