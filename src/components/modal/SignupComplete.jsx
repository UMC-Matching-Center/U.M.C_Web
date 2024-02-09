import React from "react";
import styled from "styled-components";
import "../../pages/register/Register.css";

const CompleteTitle = styled.div`
  color: #014171;
  font-size: 2.6rem;
  font-weight: 500;
  text-align: center;
`;

const CompleteDetail = styled.div`
  margin: 2.8rem 0 0 0;
  text-align: center;
  color: #014171;
  font-size: 2rem;
  line-height: 3rem;
`;

const ModalCloseIcon = btoa(`
  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <g clip-path='url(#clip0_1541_5548)'>
        <path d='M18 6L6 18' stroke='#393556' stroke-linecap='round' stroke-linejoin='round'/>
        <path d='M6 6L18 18' stroke='#393556' stroke-linecap='round' stroke-linejoin='round'/>
      </g>
      <defs>
        <clipPath id='clip0_1541_5548'>
          <rect width='24' height='24' fill='white'/>
        </clipPath>
      </defs>
  </svg>`);

const ModalCloseArea = styled.div`
  position: absolute;
  width: 2.4rem;
  height: 2.4rem;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
  background: url("data:image/svg+xml;base64, ${ModalCloseIcon}") no-repeat;
`;

export default function SignupComplete({ isClose }) {
  return (
    <div className="MainBox">
      {/* 좌측 로고 부분 */}
      <div className="CoverBox">
        UMC
        <br />
        Matching
        <br />
        Center
      </div>

      {/* 우측 완료 안내 부분 */}
      <div
        className="FormBox"
        style={{ justifyContent: "center", padding: "0" }}
      >
        <CompleteTitle>가입 신청이 완료되었습니다!</CompleteTitle>
        <CompleteDetail>
          신청이 승인되어야 서비스 사용이 가능합니다.
          <br />
          최소 1일 ~ 1주일 정도 소요됩니다. <br />
          문의는 각 학교 회장단에게 연락해 주세요. <br />
        </CompleteDetail>
      </div>
      <ModalCloseArea onClick={isClose} />
    </div>
  );
}
