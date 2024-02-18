import React from "react";
import "./MemberCard.css";

const MemberCard = ({ member }) => {
  return (
    <div className="member-card-box">
      <div className="member-card-image">
        <div className="member-card-image-circle">
          {member.profileImage ? (
            <img src={member.profileImage} />
          ) : (
            <img src="https://i.pinimg.com/474x/3b/73/a1/3b73a13983f88f8b84e130bb3fb29e17.jpg" />
          )}
        </div>
      </div>
      <div className="member-card-content">
        <div className="member-card-name">{member.nameNickname}</div>
        <div className="member-card-bar"></div>
        <div className="member-card-text">
          <span>기수</span>
          <span>{member.generation}기</span>
        </div>
        <div className="member-card-text">
          <span>파트</span>
          <span>
            {(() => {
              switch (member.memberPart || member.part) {
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
