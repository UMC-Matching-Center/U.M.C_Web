import React from "react";
import styled from "styled-components";
import "./Modal.css";

//느낌표 표시
const FailIcon = btoa(`
<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
  <g clip-path="url(#clip0_2607_20911)">
    <path d="M35 55.416V55.4453" stroke="#FAFAFA" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M35 43.7506V14.584" stroke="#FAFAFA" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_2607_20911">
      <rect width="70" height="70" fill="white"/>
    </clipPath>
  </defs>
</svg>
`);

//체크 표시
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

//체크 아이콘 표시 공간
const CheckIconArea = styled.div`
  position: absolute;
  width: 7rem;
  height: 7rem;
  background: url("data:image/svg+xml;base64, ${(props) =>
      props.modal ? CheckIcon : FailIcon}")
    no-repeat;
`;

export default function ViewStatusModal({
  setShowModal,
  modalType,
  selectedAppName,
  handlePassOrFail,
  selectedAppId,
}) {
  return (
    <>
      <div className="ModalBox">
        <div className="IconCircleBackground">
          <div
            className="IconCircleGreen"
            style={modalType == "불합격" ? { backgroundColor: "#D62117" } : {}}
          >
            <CheckIconArea modal={modalType == "합격"} />
          </div>
        </div>
        <div className="ModalConentBox">
          <div className="MoalContentCenter">
            <div className="ModalInfo" style={{ margin: "11.5rem 0 0 0" }}>
              첼린저 {selectedAppName}를 {modalType} 처리하시겠습니까?
            </div>
            <div className="ModalBtnArea" style={{ margin: "8.5rem 0 0 0" }}>
              <div
                className="ModalBtnWhite"
                onClick={() => setShowModal(false)}
              >
                취소
              </div>
              <div
                className="ModalBtnGreen"
                style={
                  modalType == "불합격" ? { backgroundColor: "#D62117" } : {}
                }
                onClick={() => handlePassOrFail(modalType,selectedAppId)}
              >
                {modalType}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}