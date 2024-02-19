import React, { useState } from "react";
import styled from "styled-components";
import "./Challenger.css";
import { useDispatch, useSelector } from "react-redux";
import useGetAccessToken from "../../utils/getAccessToken";
import useIntersect from "../../utils/intersectionObserve";
import {
  signupListAPI,
  signupAcceptAPI,
  signupRejectAPI,
} from "../../api/index";
import Modal from "react-modal";
import { SignupAccept, SignupReject } from "../../components/modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 수락 및 거절
const MatchingBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  border-radius: 0.4rem;
  font-family: "KBO-Dia-Gothic";
  color: #fafafa;
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 150%;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }

  &:nth-child(1) {
    background-color: #0281e2;
  }

  &:nth-child(2) {
    background-color: #d62117;
    margin-left: 1rem;
  }
`;

// 수락이나 거절할게 없을 시
const NoApplicantsMessage = styled.div`
  font-size: 2rem;
  margin-top: 1rem;
  color: #e7e6ea;
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

// 소분류 파트를 대분류 파트로 나누기
const part = (serverPart) => {
  if (serverPart === "PLAN") {
    return "Plan";
  } else if (serverPart === "WEB") {
    return "Web";
  } else if (serverPart === "SPRINGBOOT" || serverPart === "NODEJS") {
    return "Server";
  } else if (serverPart === "ANDROID") {
    return "Android";
  } else if (serverPart === "IOS") {
    return "iOS";
  } else if (serverPart === "DESIGN") {
    return "Design";
  }
};

export default function ChallengerNew() {
  const dispatch = useDispatch();
  const accessToken = useGetAccessToken();
  const { autoLogin } = useSelector((state) => state.userInfo);
  Modal.setAppElement("#root");

  const [page, setPage] = useState(0); // 페이지
  const [loading, setLoading] = useState(false); // 로딩
  const [isEnd, setIsEnd] = useState(false); // 끝
  const [userData, setUserData] = useState([]); // 회원가입 신청 유저데이터
  const [selectUserData, setSelectUserData] = useState({
    memberId: 0,
    nickname: "",
  }); // 선택한 유저데이터

  const [accept, setAccept] = useState(false); // 수락 모달
  const [reject, setReject] = useState(false); // 거절 모달

  const handleAccept = () => {
    signupAcceptAPI(
      accessToken,
      dispatch,
      autoLogin,
      selectUserData.memberId
    ).then((response) => {
      if (response.isSuccess) {
        setAccept(false);
        setUserData((prevUserData) =>
          prevUserData.filter(
            (data) => data.memberId !== selectUserData.memberId
          )
        );
        if (!toast.isActive("signupAcceptAPI", "ChallengerNew")) {
          toast.success(`${selectUserData.nickname} 수락 완료`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            toastId: "signupAcceptAPI",
          });
        }
      } else {
        if (!toast.isActive("signupAcceptAPI", "ChallengerNew")) {
          toast.error(response.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            toastId: "signupAcceptAPI",
          });
        }
      }
    });
  };

  const handleReject = () => {
    signupRejectAPI(
      accessToken,
      dispatch,
      autoLogin,
      selectUserData.memberId
    ).then((response) => {
      if (response.isSuccess) {
        setReject(false);
        setUserData((prevUserData) =>
          prevUserData.filter(
            (data) => data.memberId !== selectUserData.memberId
          )
        );
        if (!toast.isActive("signupRejectAPI", "ChallengerNew")) {
          toast.success(`${selectUserData.nickname} 거절 완료`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            toastId: "signupRejectAPI",
          });
        }
      } else {
        if (!toast.isActive("signupRejectAPI", "ChallengerNew")) {
          toast.error(response.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            toastId: "signupRejectAPI",
          });
        }
      }
    });
  };

  const [, setRef] = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (!isEnd) {
      setLoading(true);
      const Nextpage = page + 1;
      await signupListAPI(accessToken, dispatch, autoLogin, Nextpage).then(
        (response) => {
          setPage(Nextpage);
          if (response.isSuccess) {
            if (response.list.length > 0) {
              const responseList = response.list.map((data) => {
                const [nickname, name] = data.nameNickname.split("/");
                return {
                  memberId: data.memberId,
                  generation: data.generation,
                  nickname: nickname,
                  name: name,
                  part: part(data.part),
                };
              });
              setUserData((prev) => [...prev, ...responseList]);
            } else {
              setIsEnd(true);
            }
          } else {
            if (!toast.isActive("signupListAPI", "ChallengerNew")) {
              toast.error(response.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastId: "signupListAPI",
              });
              setIsEnd(true);
            }
          }
          setLoading(false);
        }
      );
    }
    observer.observe(entry.target);
  }, {});

  return (
    <>
      <ToastContainer containerId={"ChallengerNew"} />
      <Modal
        isOpen={accept}
        onRequestClose={() => setAccept(false)}
        style={ModalStyles}
      >
        <SignupAccept
          isClose={() => setAccept(false)}
          isAccept={() => handleAccept()}
          nickname={selectUserData.nickname}
        />
      </Modal>
      <Modal
        isOpen={reject}
        onRequestClose={() => setReject(false)}
        style={ModalStyles}
      >
        <SignupReject
          isClose={() => setReject(false)}
          isReject={() => handleReject()}
          nickname={selectUserData.nickname}
        />
      </Modal>
      <div className="challenger_box">
        <div className="table_title_box">
          <div className="table_title_list">
            <div className="table_title">기수</div>
            <div className="table_title">닉네임</div>
            <div className="table_title">이름</div>
            <div className="table_title">파트</div>
          </div>
          <div className="table_title_optioin">
            <div className="table_title table_title_select">선택</div>
          </div>
        </div>
        <div className="table_main_box">
          <div className="table_main_grid">
            {userData.map((data) => (
              <div key={data.memberId} className="table_main_container">
                <div className="table_main_info">
                  <div className="table_info_data">{data.generation}기</div>
                  <div className="table_info_data">{data.nickname}</div>
                  <div className="table_info_data">{data.name}</div>
                  <div className="table_info_data">{data.part}</div>
                </div>
                <div className="table_main_option">
                  <div style={{ display: "flex", height: "3.5rem" }}>
                    <MatchingBtn
                      onClick={() => {
                        setAccept(true);
                        setSelectUserData({
                          memberId: data.memberId,
                          nickname: data.nickname,
                        });
                      }}
                    >
                      수락
                    </MatchingBtn>
                    <MatchingBtn
                      onClick={() => {
                        setReject(true);
                        setSelectUserData({
                          memberId: data.memberId,
                          nickname: data.nickname,
                        });
                      }}
                    >
                      거절
                    </MatchingBtn>
                  </div>
                </div>
              </div>
            ))}
            {userData.length === 0 && page !== 0 && (
              <NoApplicantsMessage>
                신청한 인원이 없습니다. 나중에 다시 확인해주세요.
              </NoApplicantsMessage>
            )}
            {loading && <div className="table_title">Loading</div>}
            {!loading && (
              <div ref={setRef} style={{ width: "100%", height: "2px" }} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
