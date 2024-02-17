import React from "react";
import "./MemberCard.css";

const MemberCard = ({ member }) => {
  return (
    <div className="member-card-box">
      <div className="member-card-image">
        <div className="member-card-image-circle">
          {member.profileImage && <img src={member.profileImage} />}
        </div>
      </div>
      <div className="member-card-content">
        <div className="member-card-name">{member.nameNickName}</div>
        <div className="member-card-bar"></div>
        <div className="member-card-text">
          <span>기수</span>
          <span>{member.generation}기</span>
        </div>
        <div className="member-card-text">
          <span>파트</span>
          <span>
            {(() => {
              switch (member.memberPart) {
                case "PLAN":
                  return "Plan";
                case "WEB":
                  return "Web ";
                case "DESIGN":
                  return "Designer";
                case "SPRINGBOOT":
                  return "Server(Spring Boot) ";
                case "NODEJS":
                  return "Server(Node js) ";
                case "ANDROID":
                  return "App (Android) ";
                case "IOS":
                  return "App (iOS) ";
                default:
                  return "";
              }
            })()}
          </span>
        </div>
        <div className="member-card-text">
          <span>학교</span>
          <span>{member.university}</span>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
