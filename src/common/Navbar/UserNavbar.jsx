import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { IconPin, IconBell, IconUser } from "@tabler/icons-react";
import { alramConfirmAPI, alramListAPI, alramDeleteAPI } from "../../api/";
import { useDispatch, useSelector } from "react-redux";
import useGetAccessToken from "../../utils/getAccessToken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Logo from "../../images/logo_crop.svg";
import { AlarmContainer } from "../Alarm/AlarmModal";
import "./Navbar.css";

const UserNavMenuItem = styled.div`
  height: 100%;
  line-height: 2;
  display: flex;
  justify-content: center;
  margin: 0 1.8rem;

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
  padding-top: 0.4rem;
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

const UserNavbar = () => {
  const dispatch = useDispatch();
  const accessToken = useGetAccessToken();
  const { autoLogin } = useSelector((state) => state.userInfo);

  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState("");

  /*알림창 로딩 여부*/
  const [alarmLoading, setAlarmLoading] = useState(false);
  /*읽지 않은 알람이 존재하는 지 여부*/
  const [aliveAlarm, setAliveAlarm] = useState(false);
  /*알림창 토글*/
  const [isViewModal, setIsViewModal] = useState(false);
  /*각 알림을 읽었는지를 나타내는 bluecircle 표시 = is_confirmed*/
  const [alarmContent, setAlarmContent] = useState([]);
  /* 알림창 외 클릭 시 알림창 닫기 */
  const alarmRef = useRef(null);

  /*알림창 클릭 이벤트*/
  const handleIconBellClick = (alarmId) => {
    alramConfirmAPI(accessToken, dispatch, autoLogin, alarmId).then(
      (response) => {
        if (response.isSuccess) {
          setIsViewModal(false);
          // 알람 확인 시 is_confirm 1로 변경
          const updatedAlarm = alarmContent.map((data) => {
            if (data.alarmId === alarmId) data.is_confirm = true;
            return data;
          });
          setAlarmContent(updatedAlarm);
          // 읽지 않은 알람이 존재하는 지 여부
          setAliveAlarm(
            updatedAlarm.filter((item) => item.is_confirm === false).length > 0
              ? true
              : false
          );
        } else {
          if (!toast.isActive("alramConfirmAPI", "UserNavbar")) {
            toast.error(response.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              toastId: "alramConfirmAPI",
            });
          }
        }
      }
    );
  };

  /*알림창 삭제 이벤트*/
  const deleteAlarm = () => {
    if (alarmContent.length > 0 && !alarmLoading) {
      setAlarmLoading(true);
      alramDeleteAPI(accessToken, dispatch, autoLogin).then((response) => {
        if (response.isSuccess) {
          const updatedAlarm = [...alarmContent].filter(
            (data) => data.is_confirm === false
          );
          setAlarmContent(updatedAlarm);
          if (!toast.isActive("alramDeleteAPI", "UserNavbar")) {
            toast.success("알림 삭제 완료", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              toastId: "alramDeleteAPI",
            });
          }
        } else {
          if (!toast.isActive("alramDeleteAPI", "UserNavbar")) {
            toast.error(response.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              toastId: "alramDeleteAPI",
            });
          }
        }
      });
      setAlarmLoading(false);
    }
  };

  useEffect(() => {
    setActivePath(location.pathname.split("/")[1]);
    setIsViewModal(false);
    if (!alarmLoading) {
      setAlarmLoading(true);
      alramListAPI(accessToken, dispatch, autoLogin).then((response) => {
        if (response.isSuccess) {
          if (response.listSize > 0) {
            const responseList = response.alarmList.map((alarm) => {
              const date = new Date(alarm.createdAt);
              const year = date.getFullYear();
              const month = date.getMonth() + 1;
              const day = date.getDate();
              let content = alarm.body;
              let projectId = null;

              if (
                alarm.alarmType === "QNA_NEW" ||
                alarm.alarmType === "MATCHING_APPLY_COMPLETE"
              ) {
                const splitContent = alarm.body.split("+");
                if (splitContent.length > 1) {
                  projectId = splitContent.shift(); // 첫번째 배열값을 projectId로 설정
                  content = splitContent.join("+"); // 나머지 배열을 합쳐서 content로 설정
                }
              }

              return {
                alarmId: alarm.id,
                type: alarm.alarmType,
                content: content,
                is_confirm: alarm.isConfirmed,
                date: `${year}년 ${month}월 ${day}일`,
                projectId: projectId,
              };
            });
            setAlarmContent(responseList);
            setAliveAlarm(
              responseList.filter((item) => item.is_confirm === false).length >
                0
                ? true
                : false
            );
          } else {
            setAlarmContent([]);
            setAliveAlarm(false);
          }
        } else {
          if (!toast.isActive("alramListAPI", "UserNavbar")) {
            toast.error(response.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              toastId: "alramListAPI",
            });
          }
        }
      });
      setAlarmLoading(false);
    }
  }, [location]);

  useEffect(() => {
    // 특정 영역 외 클릭 시 발생하는 이벤트
    const handleOutsideClick = (event, ref, setVisibility) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisibility(false);
      }
    };

    // 이벤트 리스너에 handleFocus 함수 등록
    document.addEventListener("mousedown", (event) => {
      handleOutsideClick(event, alarmRef, setIsViewModal);
    });

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [alarmRef]);

  return (
    <>
      <ToastContainer containerId={"UserNavbar"} />
      <div className="app__nav">
        <div className="nav_area">
          <div className="nav_logo">
            <Link to="/">
              <img src={Logo} />
            </Link>
          </div>
          <ul className="nav_center">
            <UserNavMenuItem className={`${activePath === "" && "active"}`}>
              <Link to="/" title="Home">
                Home
              </Link>
            </UserNavMenuItem>
            <UserNavMenuItem
              className={`${activePath === "schedule" && "active"}`}
            >
              <Link to="/schedule" title="Schedule">
                Schedule
              </Link>
            </UserNavMenuItem>
            <UserNavMenuItem
              className={`${activePath === "match" && "active"}`}
            >
              <Link to="/match" title="Matching">
                Matching
              </Link>
            </UserNavMenuItem>
            <UserNavMenuItem
              className={`${activePath === "myproject" && "active"}`}
            >
              <a style={{ cursor: "default" }} title="My Project">
                My Project
              </a>
              <SubMenuWrapper>
                <SubMenuItem>
                  <Link to="/myproject/evaluate">팀원 상호 평가</Link>
                </SubMenuItem>
                <SubMenuItem>
                  <Link to="/myproject/landing">랜딩페이지 보기</Link>
                </SubMenuItem>
              </SubMenuWrapper>
            </UserNavMenuItem>
          </ul>
          <div className="nav_right">
            <div
              className="icon-bg"
              style={{
                background: activePath === "notice" && "#0261AA",
              }}
            >
              <IconPin
                strokeWidth={activePath === "notice" ? 1.5 : 1}
                color={"#cecdd5"}
                size={36}
                onClick={() => {
                  navigate("/notice");
                }}
              />
            </div>

            <div
              className="icon-bg"
              style={{
                position: "relative",
                margin: "0 2.4rem",
              }}
              ref={alarmRef}
            >
              <IconBell
                strokeWidth={1}
                color={"#cecdd5"}
                size={36}
                style={{ display: "block" }}
                onClick={() => {
                  setIsViewModal(!isViewModal);
                }}
              />
              <AlarmContainer
                aliveAlarm={aliveAlarm}
                isViewModal={isViewModal}
                deleteAlarm={deleteAlarm}
                alarmContent={alarmContent}
                handleIconBellClick={handleIconBellClick}
                alarmRef={alarmRef}
              />
            </div>

            <div
              className="icon-bg"
              style={{
                background: activePath === "mypage" && "#0261AA",
              }}
            >
              <IconUser
                strokeWidth={activePath === "mypage" ? 1.5 : 1}
                color={"#cecdd5"}
                size={36}
                onClick={() => {
                  navigate("/mypage");
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

export default UserNavbar;
