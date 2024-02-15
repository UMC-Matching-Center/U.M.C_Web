import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import "./Modal.css";

const CheckIcon = btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
    <g clip-path="url(#clip0_2458_10361)">
      <path d="M11.6666 31.1112L29.1666 49.5834L58.3333 20.4167" stroke="#FAFAFA" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_2458_10361">
        <rect width="70" height="70" fill="white"/>
      </clipPath>
    </defs>
  </svg>`);

const CheckIconArea = styled.div`
  position: absolute;
  width: 7rem;
  height: 7rem;
  background: url("data:image/svg+xml;base64, ${CheckIcon}") no-repeat;
`;

export default function SignupAccept({ isClose, isAccept, nickname }) {
  const modalRef = useRef(null);

  useEffect(() => {
    // 모달이 마운트되면 모달 요소에 포커스를 줍니다.
    modalRef.current.focus();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      isAccept();
    }
  };

  return (
    <div
      className="ModalBox"
      ref={modalRef}
      tabIndex={0} // 포커스를 받을 수 있도록 tabIndex 속성 추가
      onKeyDown={handleKeyDown}
    >
      <div className="IconCircleBackground">
        <div className="IconCircleGreen">
          <CheckIconArea />
        </div>
      </div>
      <div className="ModalConentBox">
        <div className="MoalContentCenter">
          <div className="ModalInfo" style={{ margin: "11.5rem 0 0 0" }}>
            챌린저 {nickname}의 가입 신청을 수락하시겠어요?
          </div>
          <div className="ModalBtnArea" style={{ margin: "8.5rem 0 0 0" }}>
            <div className="ModalBtnWhite" onClick={isClose}>
              취소
            </div>
            <div className="ModalBtnGreen" onClick={isAccept}>
              수락하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
