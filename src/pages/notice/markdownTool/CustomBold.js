import React, { useContext } from "react";
import { TextAreaContext } from "../NoticeWrite";
import { IconBold } from "@tabler/icons-react";

const CustomBold = () => {
  const { text, textareaRef, updateText } = useContext(TextAreaContext);

  const handleBoldClick = (e) => {
    e.preventDefault();
    const selectedText = textareaRef.current.value.substring(
      textareaRef.current.selectionStart,
      textareaRef.current.selectionEnd
    );

    // bold 효과 (1. 드래그 선택된 값 양 옆에 **, 2. 드래그 선택된 값이 없으면 커서 위치에 **text** 입력)
    const newText =
      text.substring(0, textareaRef.current.selectionStart) +
      `${selectedText ? "**" + selectedText + "**" : "**text**"}` +
      text.substring(textareaRef.current.selectionEnd);

    updateText(newText);

    // 커서위치 이동(비동기)

    const boldStart = textareaRef.current.selectionStart + 2;
    const boldEnd = textareaRef.current.selectionEnd + (selectedText ? 2 : 6);

    textareaRef.current.focus();
    setTimeout(() => {
      textareaRef.current.setSelectionRange(boldStart, boldEnd);
    }, 0);
  };

  return (
    <button onClick={handleBoldClick}>
      <IconBold size={20} color="#393556" stroke={2} />
    </button>
  );
};

export default CustomBold;
