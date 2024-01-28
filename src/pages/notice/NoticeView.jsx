import React, { useContext } from "react";
import { TextAreaContext } from "./NoticeWrite";

const NoticeView = ({ handleKeyDown }) => {
  const { text, textareaRef, updateText } = useContext(TextAreaContext);

  return (
    <div className="notice-markdown-view">
      <textarea
        placeholder="본문 내용을 입력하세요"
        ref={textareaRef}
        value={text}
        onChange={(e) => {
          updateText(e.target.value);
        }}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
      ></textarea>
    </div>
  );
};

export default NoticeView;
