import React, { useContext } from "react";
import { TextAreaContext } from "../NoticeWrite";
import { IconItalic } from "@tabler/icons-react";

const CustomItalic = () => {
  const { text, textareaRef, updateText } = useContext(TextAreaContext);

  const handleItalicClick = (e) => {
    e.preventDefault();
    const selectedText = textareaRef.current.value.substring(
      textareaRef.current.selectionStart,
      textareaRef.current.selectionEnd
    );

    // italic 효과 (1. 드래그 선택된 값 양 옆에 _, 2. 드래그 선택된 값이 없으면 커서 위치에 _text_ 입력)
    const newText =
      text.substring(0, textareaRef.current.selectionStart) +
      `${selectedText ? "_" + selectedText + "_" : "_text_"}` +
      text.substring(textareaRef.current.selectionEnd);

    updateText(newText);

    // 커서위치 이동(비동기)
    const italicStart = textareaRef.current.selectionStart + 1;
    const italicEnd = textareaRef.current.selectionEnd + (selectedText ? 1 : 5);

    textareaRef.current.focus();
    setTimeout(() => {
      textareaRef.current.setSelectionRange(italicStart, italicEnd);
    }, 0);
  };
  return (
    <button onClick={handleItalicClick}>
      <IconItalic size={24} color="#393556" stroke={1} />
    </button>
  );
};

export default CustomItalic;
