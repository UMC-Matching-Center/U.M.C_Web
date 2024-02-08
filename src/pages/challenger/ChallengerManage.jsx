import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "./Challenger.css";
import { Route, Routes } from "react-router-dom";
import ChallengerNew from "./ChallengerNew";
import {
  SelectBox,
  SelectOptions,
  Option,
} from "../../common/Selectbox/RoundSelectBox";
import { useDispatch, useSelector } from "react-redux";
import useGetAccessToken from "../../utils/getAccessToken";
import useIntersect from "../../utils/intersectionObserve";
import {
  challengerListAPI, // 챌린저 리스트 조회
  challengerMatchingAPI, // 챌린저의 매칭
  challengerExpelAPI, // 챌린저 탈부
} from "../../api/index";
import Modal from "react-modal";
import { ChallengerExpel } from "../../components/Modal";

/*-------------------박스 두개 중 첫 번째 상단 박스------------------*/
//현재 챌린저 상태 state
const StateBox = styled.div`
  display: flex;
  height: 3.5rem;
  box-sizing: border-box;
  padding: 0 2.4rem 0 0;
  font-size: 1.8rem;
  font-family: KBO-Dia-Gothic;
  line-height: 150%;
  color: #131313;
`;

//첼린저 신청 차수
const MatchingNum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5.6rem;
  border-radius: 0.4rem;
  font-weight: 500;
  background-color: #014171;
  color: #e7e6ea;
`;

//매칭 결과
const MatchingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11.8rem;
  border-radius: 0.4rem;
  margin-left: 1rem;
  color: ${(props) =>
    props.$statusType === "매칭 완료" ? "#E7E6EA" : "#131313"};
  background-color: ${(props) => {
    switch (props.$statusType) {
      case "미지원":
        return "#CECDD5";
      case "매칭 완료":
        return "#014171";
      default:
        return "#CCE6F9";
    }
  }};
`;

/*-------------------화살 방향------------------*/
//위 화살 방향
const DropUpArrow = () => (
  <div style={{ margin: "0.5rem 0 0 4.2rem" }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="8"
      viewBox="0 0 18 10"
      fill="none"
    >
      <path d="M17 9L9 1L1 9" stroke="#9C9AAB" strokeLinecap="round" />
    </svg>
  </div>
);

//아래 화살 방향
const DropDownArrow = () => (
  <div style={{ margin: "0.2rem 0 0 4.2rem" }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="8"
      viewBox="0 0 18 10"
      fill="none"
    >
      <path d="M1 1L9 9L17 1" stroke="#9C9AAB" strokeLinecap="round" />
    </svg>
  </div>
);

// /*-------------------전에 매칭된 것들 여부 확인 디테일 박스------------------*/
const MatchingDetailBox = styled.div`
  display: grid;
  gap: 1.1rem;
  padding: 1.2rem 0;
  width: 100rem;
  background-color: #45444d;
  border-radius: 0rem 0rem 0.8rem 0.8rem;
  font-size: 1.6rem;
  font-weight: 500;
`;

//매칭 디테일 리스트
const MatchingDetailList = styled.span`
  display: flex;
  height: 3.4rem;
  color: #fafafa;
  margin: 0 3.2rem;
`;

// 매칭 지원한 프로젝트
const MatchingProject = styled.div`
  display: inline-block;
  align-items: center;
  border-radius: 0.5rem;
  line-height: 1.5;
  padding: 0.5rem 1.6rem;
  background-color: ${(props) => {
    if (props.$applyIndex < props.$currentTime) return "#BE5B56";
    else if (props.$applyIndex === props.$currentTime) {
      return props.$statusType === "지원 완료" ? "#70AD4E" : "#0261AA";
    }
  }};
`;

//탈부 버튼 영역
const ExitBtnArea = styled.div`
  display: block;
  flex-grow: 1;
`;

//탈부 버튼
const ExitBtn = styled.div`
  display: flex;
  float: right;
  width: 6.7rem;
  height: 3.6rem;
  font-size: 1.8rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.4rem;
  background-color: #d62117;
  color: #fafafa;
  cursor: pointer;
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

function ChallengerList() {
  const dispatch = useDispatch();
  const accessToken = useGetAccessToken();
  const { autoLogin } = useSelector((state) => state.userInfo);
  Modal.setAppElement("#root");

  const [matchingState, setMatchingState] = useState({
    code: "",
    korean: "전체 보기",
    index: 0,
  }); // 매칭 상태 [코드, 이름, 인덱스]
  const [stateOptionVisible, setStateOptionVisible] = useState(false);
  const stateSelectRef = useRef();

  const [page, setPage] = useState(0); // 페이지
  const [loading, setLoading] = useState(false); // 로딩
  const [isEnd, setIsEnd] = useState(false); // 끝
  const [userData, setUserData] = useState([]); // 챌린저 리스트
  const [selectUser, setSelectUser] = useState(new Map()); // 선택된 챌린저

  const [expel, setExpel] = useState(false); // 탈부 모달
  const [expelUser, setExpelUser] = useState({
    memberId: null,
    nickname: null,
    listIndex: null,
  }); // 탈부 선택 유저

  // 챌린저 매칭 정보 상세보기
  const handleDetail = (memberId) => {
    challengerMatchingAPI(accessToken, dispatch, autoLogin, memberId).then(
      (response) => {
        if (response.isSuccess) {
          setSelectUser((prev) => {
            const nextState = new Map(prev); // 이전 상태를 복사하여 새로운 맵 객체 생성
            nextState.has(memberId)
              ? nextState.delete(memberId)
              : nextState.set(memberId, response.round); // 상태를 업데이트
            return new Map(nextState); // 새로운 맵 객체를 반환하여 상태 업데이트
          });
        } else {
          alert(response.message);
        }
      }
    );
  };

  // 챌린저 탈부 시키기
  const handleExit = () => {
    if (expelUser.memberId !== null) {
      challengerExpelAPI(
        accessToken,
        dispatch,
        autoLogin,
        expelUser.memberId
      ).then((response) => {
        if (response.isSuccess) {
          setExpel(false);
          setSelectUser((prev) => {
            const nextState = new Map(prev); // 이전 상태를 복사하여 새로운 맵 객체 생성
            nextState.delete(expelUser.memberId);
            return new Map(nextState); // 새로운 맵 객체를 반환하여 상태 업데이트
          });
          setUserData((prevUserData) =>
            prevUserData.filter((data) => data.memberId !== expelUser.memberId)
          );
        } else {
          alert(response.message);
        }
      });
    }
  };

  // 챌린저 리스트 초기화 (옵션 선택 시 실행)
  const listReset = () => {
    setLoading(false); // 로딩 초기화
    setIsEnd(false); // 끝 초기화
    setUserData([]); // 챌린저 리스트 초기화
    setSelectUser(new Map()); // 선택된 챌린저 초기화
    setExpelUser({
      memberId: null,
      nickname: null,
      listIndex: null,
    }); // 탈부 선택 유저 초기화
    setPage(0); // 페이지 초기화
  };

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
      handleOutsideClick(event, stateSelectRef, setStateOptionVisible);
    });

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [stateSelectRef]);

  const [, setRef] = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (!isEnd) {
      setLoading(true);
      const Nextpage = page + 1;
      await challengerListAPI(
        accessToken,
        dispatch,
        autoLogin,
        matchingState.code,
        Nextpage
      ).then((response) => {
        setPage(Nextpage);
        if (response.isSuccess) {
          if (response.list.length > 0) {
            const responseList = response.list.map((data) => {
              const [nickname, name] = data.nameNickname.split("/");
              return {
                memberId: data.name,
                generation: data.generation,
                nickname: nickname,
                name: name,
                part: part(data.part),
                matchCount: data.matchCount,
                matchingStatus: data.matchingStatus,
              };
            });
            setUserData((prev) => [...prev, ...responseList]);
          } else {
            setIsEnd(true);
          }
        } else {
          alert(response.message);
        }
        setLoading(false);
      });
    }
    observer.observe(entry.target);
  }, {});

  const matchingStateList = [
    { code: "", name: "전체 보기" },
    { code: "NON", name: "미지원" },
    { code: "APPLY", name: "지원 완료" },
    { code: "MATCH", name: "매칭 완료" },
  ];

  return (
    <>
      <Modal
        isOpen={expel}
        onRequestClose={() => setExpel(false)}
        style={ModalStyles}
      >
        <ChallengerExpel
          isClose={() => setExpel(false)}
          isExpel={() => handleExit()}
          nickname={expelUser.nickname}
        />
      </Modal>
      <div className="challenger_box">
        {/* 표 제목 영역 */}
        <div className="table_title_box">
          {/* 표 제목 리스트 영역 */}
          <div className="table_title_list">
            <div className="table_title">기수</div>
            <div className="table_title">닉네임</div>
            <div className="table_title">이름</div>
            <div className="table_title">파트</div>
          </div>

          {/* 표 제목 옵션 영역 */}
          <div className="table_title_optioin">
            <div className="table_option_dropdown">
              <div style={{ position: "relative", width: "14rem" }}>
                <SelectBox
                  onClick={() => setStateOptionVisible(!stateOptionVisible)}
                  ref={stateSelectRef}
                  $show={stateOptionVisible}
                >
                  <label>{matchingState.korean}</label>
                  <SelectOptions $visible={stateOptionVisible}>
                    {matchingStateList.map((option, i) => (
                      <Option
                        onClick={async () => {
                          listReset();
                          setMatchingState({
                            code: option.code,
                            korean: option.name,
                            index: i,
                          });
                        }}
                        key={option.code}
                        className={i === matchingState.index ? "selected" : ""}
                      >
                        {option.name}
                      </Option>
                    ))}
                  </SelectOptions>
                </SelectBox>
              </div>
            </div>
          </div>
        </div>

        {/* 표 내용 영역 */}
        <div className="table_main_box">
          <div className="table_main_grid">
            {userData.map((data, listIndex) => (
              <div key={data.memberId}>
                {/* 챌린저 간단 정보 컨테이너 */}
                <div
                  className="table_main_container"
                  onClick={() => handleDetail(data.memberId)}
                  style={{
                    cursor: "pointer",
                    borderRadius: selectUser.has(data.memberId)
                      ? "0.8rem 0.8rem 0rem 0rem"
                      : "0.8rem",
                  }}
                >
                  <div className="table_main_info">
                    <div className="table_info_data">{data.generation}기</div>
                    <div className="table_info_data">{data.nickname}</div>
                    <div className="table_info_data">{data.name}</div>
                    <div className="table_info_data">{data.part}</div>
                  </div>
                  <div className="table_main_option">
                    <StateBox>
                      <MatchingNum>{data.matchCount}차</MatchingNum>
                      <MatchingState $statusType={data.matchingStatus}>
                        {data.matchingStatus}
                      </MatchingState>
                      {selectUser.has(data.memberId) ? (
                        <DropUpArrow />
                      ) : (
                        <DropDownArrow />
                      )}
                    </StateBox>
                  </div>
                </div>

                {/* 챌린저 세부 매칭 정보 박스 */}
                {selectUser.has(data.memberId) && (
                  <MatchingDetailBox>
                    {selectUser.get(data.memberId).length === 0 ? (
                      <MatchingDetailList>
                        <ExitBtnArea>
                          <ExitBtn
                            onClick={() => {
                              setExpel(true);
                              setExpelUser(() => ({
                                memberId: data.memberId,
                                nickname: data.nickname,
                                listIndex: listIndex,
                              }));
                            }}
                          >
                            탈부
                          </ExitBtn>
                        </ExitBtnArea>
                      </MatchingDetailList>
                    ) : (
                      selectUser
                        .get(data.memberId)
                        .map((matchingTeam, teamIndex) => (
                          <MatchingDetailList
                            key={`${data.memberId}_${teamIndex}`}
                          >
                            <MatchingProject
                              $statusType={data.matchingStatus}
                              $currentTime={data.matchCount}
                              $applyIndex={matchingTeam.round}
                            >
                              {matchingTeam.round}차 : {matchingTeam.teamName}
                            </MatchingProject>
                            {selectUser.get(data.memberId).length ===
                              teamIndex + 1 && (
                              <ExitBtnArea>
                                <ExitBtn
                                  onClick={() => {
                                    setExpel(true);
                                    setExpelUser(() => ({
                                      memberId: data.memberId,
                                      nickname: data.nickname,
                                      listIndex: listIndex,
                                    }));
                                  }}
                                >
                                  탈부
                                </ExitBtn>
                              </ExitBtnArea>
                            )}
                          </MatchingDetailList>
                        ))
                    )}
                  </MatchingDetailBox>
                )}
              </div>
            ))}

            {loading && <div className="table_title">Loading</div>}
            {!loading && (
              <div ref={setRef} style={{ width: "100%", height: "1px" }} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function ChallengerManage() {
  return (
    <div className="chanllenger_container">
      <Routes>
        <Route path="/" element={<ChallengerList />} />
        <Route path="/manage" element={<ChallengerList />} />
        <Route path="/new" element={<ChallengerNew />} />
      </Routes>
    </div>
  );
}
