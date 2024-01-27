import React, { useContext } from "react";
import { TextAreaContext } from "../NoticeWrite";
import { IconQuote } from "@tabler/icons-react";

const CustomQuote = () => {
  const { text, textareaRef, updateText } = useContext(TextAreaContext);

  const handleQutoeClick = (e) => {
    e.preventDefault();
    const selectedText = textareaRef.current.value.substring(
      textareaRef.current.selectionStart,
      textareaRef.current.selectionEnd
    );

    // 인용 효과 (1. 드래그 선택된 값 앞에 > , 2. 드래그 선택된 값이 없으면 커서 위치에 > text 입력)
    const newText =
      text.substring(0, textareaRef.current.selectionStart) +
      `${selectedText ? "> " + selectedText : "> text"}` +
      text.substring(textareaRef.current.selectionEnd);

    updateText(newText);

    // 커서위치 이동(비동기)
    const QuoteStart = textareaRef.current.selectionStart + 2;
    const QuoteEnd = textareaRef.current.selectionEnd + (selectedText ? 2 : 6);

    textareaRef.current.focus();
    setTimeout(() => {
      textareaRef.current.setSelectionRange(QuoteStart, QuoteEnd);
    }, 0);
  };
  return (
    <button onClick={handleQutoeClick}>
      <IconQuote size={24} color="#393556" stroke={1} />
    </button>
  );
};

export default CustomQuote;
