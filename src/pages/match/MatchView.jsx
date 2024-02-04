import React, { useContext } from "react";
import { TextAreaContext } from "../../context/TextAreaProvider";

const NoticeView = ({ handleKeyDown }) => {
  const { matchText, matchTextareaRef, updateMatchText } =
    useContext(TextAreaContext);

  return (
    <div className="match-markdown-view">
      <textarea
        placeholder="본문 내용을 입력하세요"
        ref={matchTextareaRef}
        value={matchText}
        onChange={(e) => {
          updateMatchText(e.target.value);
        }}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
      ></textarea>
    </div>
  );
};

export default NoticeView;
