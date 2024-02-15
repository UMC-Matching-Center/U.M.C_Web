import React from "react";
import "./OBCard.css";

const OBCard = (props) => {
  const handleCardClick = () => {
    props.onClick(props.project);
  };

  return (
    <div className="card-wrapper" onClick={handleCardClick}>
      <div className="card-img-frame">
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${props.project.projectImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            cursor: "pointer",
          }}
        />
      </div>
      <div className="card-content">
        <div className="card-title">{props.project.title}</div>
        <div className="card-description">{props.project.description}</div>
      </div>
    </div>
  );
};

export default OBCard;
