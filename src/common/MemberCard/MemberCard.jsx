import React from "react";
import "./MemberCard.css";

const MemberCard = () => {
  const member = {
    image:
      "https://blog.kakaocdn.net/dn/w4C2v/btrVqJWa4Pt/Ba0Dw0MU5gAlfQ7aKHZksk/img.jpg",
    nickName: "오수빈/리처드",
    year: "5th",
    part: "Web",
    school: "가천대학교",
  };
  return (
    <div className="member-card-box">
      <div className="member-card-image">
        <div className="member-card-image-circle">
          {member.image && <img src={member.image} />}
        </div>
      </div>
      <div className="member-card-content">
        <div className="member-card-name">{member.nickName}</div>
        <div className="member-card-bar"></div>
        <div className="member-card-text">
          <span>기수</span>
          <span>{member.year}</span>
        </div>
        <div className="member-card-text">
          <span>파트</span>
          <span>{member.part}</span>
        </div>
        <div className="member-card-text">
          <span>학교</span>
          <span>{member.school}</span>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
