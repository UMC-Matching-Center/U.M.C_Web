import styled from "styled-components";

const RedCircleFilled = styled.div`
  display: ${(props) => !props.$aliveAlarm && "none"};
  position: absolute;
  width: 0.8rem;
  height: 0.8rem;
  background-color: #d62117;
  border-radius: 1rem;
  top: 0.1rem;
  right: 0.4rem;
`;
const AlarmModal = styled.div`
  display: ${(props) => !props.$display && "none"};
  z-index: 2;
  position: absolute;
  top: 6.5rem;
  right: -2.5rem;
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
  color: ${(props) => props.$color};
  font-family: KBO-Dia-Gothic;
  font-size: ${(props) => props.$size};
  font-weight: 300;
  margin-top: ${(props) => props.$margin};
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

export {
  RedCircleFilled,
  AlarmModal,
  ModalContentBox,
  ContentBoxTitle,
  ContentBoxSubTitle,
  ModalContent,
  AlarmContent,
  AlarmContentDetail,
  ContentDetailWrap,
  ContentDetailText,
  BlueCircleFilled,
  AlarmSeperateBar,
};
