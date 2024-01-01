import React from "react";
import './Register.css';


export default function SignUpSuccess() {
  return (
    <div className="Container">
      <div className="MainBox">
        <div className="CoverBox">
          UMC
          <br />
          Matching
          <br />
          Center
        </div>
        <div className="FormBox">
          <div className="FormCompleteTitle">가입 신청이 완료되었습니다!</div>
          <div className="FormCompleteText">
            신청이 승인되어야 서비스 사용이 가능합니다.<br/>
            최소 1일 ~ 1주일 정도 소요됩니다. <br/>
            문의는 각 학교 회장단에게 연락해 주세요. <br/>
          </div>
        </div>
      </div>
    </div>
  );
}
