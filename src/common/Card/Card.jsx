import React from "react";
import sample from "../../images/sample_project.png";
import "./Card.css";

const Card = (props) => {
  const handleCardClick = () => {
    props.onClick(props.project);
  };
  return (
    <div className="card-wrapper" onClick={handleCardClick}>
      <div className="card-img-frame">
        <img src={sample} alt="projectImg" />
      </div>
      <div className="card-content">
        <div className="card-title">{props.project.title}</div>
        <div className="card-description">{props.project.description}</div>
      </div>
    </div>
  );
};

export default Card;
