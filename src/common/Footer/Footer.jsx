import React from "react";
import "./Footer.css";
import { IconCopyright } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const locationNow = useLocation();
  const pageRoot = locationNow.pathname.split("/")[1];

  // 회원가입 페이지에서는 footer를 보여주지 않음
  if (pageRoot === "register" || pageRoot === "mypage") return null;

  return (
    <div className="app__footer">
      <div className="footer_area">
        <div className="footer_site">
          <a href="mailto:umc.matching.center.05@gmail.com">문의하기</a>
          <span
            style={{
              height: "1.4rem",
              margin: "0 1.8rem",
              borderRight: "1px solid #E7E6EA",
            }}
          />
          <a href="https://bit.ly/3SuXIt7">개인정보 처리 방침</a>
        </div>
        <div className="footer_description">
          UMC Matching Center는 University MakeUs Challenge(이하 UMC)에 속한
          동아리원들의 프로젝트 매칭을 위해 만들어진 서비스입니다.
          <br />
          UMC Matching Center에서는 매 기수 새로운 아이디어의 프로젝트를
          확인하여, 동아리원들을 원하는 아이디어 팀에 매칭 시켜주는 서비스를
          제공합니다.
          <br />
          또한, 각 학교 동아리 회장단에게 관리자 역할을 부여하여, 자신의 학교에
          속한 동아리원이 맞는지 확인 후 수락한 경우에만 서비스 이용이
          가능합니다. <br />
          UMC Matching Center와 관련해 문의할 내용이 있다면 아래 메일로
          보내주세요.
        </div>
        <div className="footer_email">
          대표 메일 : umc.matching.center.05@gmail.com
        </div>
        <div className="footer_copyright">
          <IconCopyright style={{ width: "1.2rem", height: "1.2rem" }} />
          &nbsp; COPYRIGHT 2024 UMC MATCHING CENTER. ALL RIGHTS RESERVED.
        </div>
      </div>
    </div>
  );
}
