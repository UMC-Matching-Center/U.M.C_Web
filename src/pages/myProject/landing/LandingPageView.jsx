import React, { useContext } from "react";
import { TextAreaContext } from "../../../context/TextAreaProvider";

const LandingPageView = ({ handleKeyDown }) => {
  const { landingText, landingTextareaRef, updateLandingText } =
    useContext(TextAreaContext);

  return (
    <div className="match-markdown-view">
      <textarea
        placeholder="본문 내용을 입력하세요"
        ref={landingTextareaRef}
        value={landingText}
        onChange={(e) => {
          updateLandingText(e.target.value);
        }}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
      ></textarea>
    </div>
  );
};

export default LandingPageView;
