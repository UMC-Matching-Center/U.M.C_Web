import React, { useContext } from "react";
import { TextAreaContext } from "../NoticeWrite";
import { IconH1 } from "@tabler/icons-react";

const MarkdownHeader1 = () => {
  const { text, textareaRef, updateText } = useContext(TextAreaContext);

  const handleHeader1Click = (e) => {
    e.preventDefault();
    const selectedText = textareaRef.current.value.substring(
      textareaRef.current.selectionStart,
      textareaRef.current.selectionEnd
    );

    // H1 효과 (1. 드래그 선택된 값 앞에 #, 2. 드래그 선택된 값이 없으면 커서 위치에 # text 입력)
    const newText =
      text.substring(0, textareaRef.current.selectionStart) +
      `${selectedText ? "# " + selectedText : "# text"}` +
      text.substring(textareaRef.current.selectionEnd);

    updateText(newText);

    // 커서위치 이동(비동기)
    const header1Start = textareaRef.current.selectionStart + 2;
    const header1End =
      textareaRef.current.selectionEnd + (selectedText ? 2 : 6);

    textareaRef.current.focus();
    setTimeout(() => {
      textareaRef.current.setSelectionRange(header1Start, header1End);
    }, 0);
  };
  return (
    <button onClick={handleHeader1Click}>
      <IconH1 size={24} color="#393556" stroke={1} />
    </button>
  );
};

export default MarkdownHeader1;
