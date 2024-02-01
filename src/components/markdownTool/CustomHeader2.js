import React, { useContext } from "react";
import { TextAreaContext } from "../../context/TextAreaProvider";
import { IconH2 } from "@tabler/icons-react";

const CustomHeader2 = () => {
  const { text, textareaRef, updateText } = useContext(TextAreaContext);

  const handleHeader2Click = (e) => {
    e.preventDefault();
    const selectedText = textareaRef.current.value.substring(
      textareaRef.current.selectionStart,
      textareaRef.current.selectionEnd
    );

    // H2 효과 (1. 드래그 선택된 값 앞에 ## , 2. 드래그 선택된 값이 없으면 커서 위치에 ## text 입력)
    const newText =
      text.substring(0, textareaRef.current.selectionStart) +
      `${selectedText ? "## " + selectedText : "## text"}` +
      text.substring(textareaRef.current.selectionEnd);

    updateText(newText);

    // 커서위치 이동(비동기)
    const header2Start = textareaRef.current.selectionStart + 3;
    const header2End =
      textareaRef.current.selectionEnd + (selectedText ? 3 : 7);

    textareaRef.current.focus();
    setTimeout(() => {
      textareaRef.current.setSelectionRange(header2Start, header2End);
    }, 0);
  };
  return (
    <button onClick={handleHeader2Click}>
      <IconH2 size={24} color="#393556" stroke={1} />
    </button>
  );
};

export default CustomHeader2;
