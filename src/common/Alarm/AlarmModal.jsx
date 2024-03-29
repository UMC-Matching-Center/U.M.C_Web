import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IconUsers, IconUserPlus } from "@tabler/icons-react";

const AlarmContainer = ({
  aliveAlarm,
  isViewModal,
  deleteAlarm,
  alarmContent,
  handleIconBellClick,
  alarmRef,
}) => {
  const { userType } = useSelector((state) => state.userInfo);
  const navigate = useNavigate();

  return (
    <>
      <RedCircleFilled $aliveAlarm={aliveAlarm} />
      <AlarmModal $display={isViewModal} ref={alarmRef}>
        <ModalContentBox>
          <ContentBoxTitle>알림</ContentBoxTitle>
          <div
            style={{
              display: "flex",
              flexFlow: "row-reverse",
              margin: "2rem 2.9rem 0 0",
            }}
          >
            <ContentBoxSubTitle onClick={deleteAlarm}>
              읽은 알림 삭제
            </ContentBoxSubTitle>
          </div>
          <ModalContent>
            {alarmContent?.map((alarm, idx) => {
              return (
                <AlarmContent
                  key={idx}
                  onClick={() => {
                    switch (userType) {
                      case "ROLE_ADMIN":
                        navigate(
                          alarm.type === "MATCHING_COMPLETE"
                            ? "/challenger/manage" // 매칭 경우
                            : "/challenger/new" // 가입 경우
                        );
                        handleIconBellClick(alarm.alarmId);
                        break;
                      case "ROLE_PM":
                        navigate(
                          alarm.type === "NOTICE_NEW"
                            ? "/notice" // 공지사항
                            : alarm.type === "MATCHING_NEW"
                              ? "/myproject/applystatus" // 내 프로젝트 지원현황
                              : `/match/detail/${alarm.projectId}` // 내 프로젝트 Q&A 변경
                        );
                        handleIconBellClick(alarm.alarmId);
                        break;
                      case "ROLE_CHALLENGER":
                        if (alarm.type === "NOTICE_NEW") navigate("/notice");
                        else if (alarm.type === "MATCHING_COMPLETE")
                          navigate(`/match/detail/${alarm.projectId}`);
                        else if (alarm.type === "MATCHING_APPLY_SUCCESS")
                          navigate("/mypage/evaluate");
                        else null;
                        break;
                    }
                  }}
                >
                  <AlarmContentDetail>
                    {(() => {
                      /*아이콘 미정*/
                      switch (alarm.type) {
                        case "notice":
                          return (
                            <IconUserPlus
                              color={"#131313"}
                              size={24}
                              strokeWidth={1}
                            />
                          );
                        default:
                          return (
                            <IconUsers
                              color={"#131313"}
                              size={24}
                              strokeWidth={1}
                            />
                          );
                      }
                    })()}
                    <ContentDetailWrap>
                      <ContentDetailText
                        $color="#02010b"
                        $size="1.6rem"
                        $margin="0.4rem"
                      >
                        {(() => {
                          switch (userType) {
                            case "ROLE_ADMIN":
                              return alarm.type === "JOIN_NEW"
                                ? "가입"
                                : "매칭";
                            case "ROLE_PM":
                              return alarm.type === "NOTICE_NEW"
                                ? "공지"
                                : alarm.type === "MATCHING_NEW"
                                  ? "매칭"
                                  : "문의";
                            case "ROLE_CHALLENGER":
                              return alarm.type === "NOTICE_NEW"
                                ? "공지"
                                : "매칭";
                          }
                        })()}
                      </ContentDetailText>
                      <ContentDetailText
                        $color="#6b6880"
                        $size="1.4rem"
                        $margin="1.4rem"
                      >
                        {alarm.content}
                      </ContentDetailText>
                      <ContentDetailText
                        $color="#9c9aab"
                        $size="1rem"
                        $margin="1rem"
                      >
                        {alarm.date}
                      </ContentDetailText>
                    </ContentDetailWrap>
                  </AlarmContentDetail>
                  {!alarm.is_confirm && <BlueCircleFilled />}
                  {alarmContent.length - 1 !== idx && <AlarmSeperateBar />}
                </AlarmContent>
              );
            })}
          </ModalContent>
        </ModalContentBox>
      </AlarmModal>
    </>
  );
};

const RedCircleFilled = styled.div`
  display: ${(props) => !props.$aliveAlarm && "none"};
  position: absolute;
  width: 0.8rem;
  height: 0.8rem;
  background-color: #d62117;
  border-radius: 1rem;
  top: 0.7rem;
  right: 0.9rem;
`;
const AlarmModal = styled.div`
  display: ${(props) => !props.$display && "none"};
  z-index: 2;
  position: absolute;
  top: 6.5rem;
  right: -1.75rem;
  width: 41rem;
  height: 62.6rem;
  border-radius: 1rem;
  background-color: #fafafa;
  box-shadow: 0 0.4rem 0.9rem 0 rgba(0, 0, 0, 0.4);

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
  color: ${(props) => props.$color};
  font-family: KBO-Dia-Gothic;
  font-size: ${(props) => props.$size};
  font-weight: 300;
  margin-top: ${(props) => props.$margin};
`;
const BlueCircleFilled = styled.div`
  position: absolute;
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

export { AlarmContainer };
