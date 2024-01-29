import React, { useContext } from "react";
import { TextAreaContext } from "../../context/TextAreaProvider";
import { IconUnderline } from "@tabler/icons-react";

const CustomUnderline = () => {
  const { text, textareaRef, updateText } = useContext(TextAreaContext);

  const handleUnderlineClick = (e) => {
    e.preventDefault();
    const selectedText = textareaRef.current.value.substring(
      textareaRef.current.selectionStart,
      textareaRef.current.selectionEnd
    );

    // underline 효과 (1. 드래그 선택된 값 양 옆에 <u>, 2. 드래그 선택된 값이 없으면 커서 위치에 <u>text</u> 입력)
    const newText =
      text.substring(0, textareaRef.current.selectionStart) +
      `${selectedText ? "<u>" + selectedText + "</u>" : "<u>text</u>"}` +
      text.substring(textareaRef.current.selectionEnd);

    updateText(newText);

    // 커서위치 이동(비동기)
    const underlineStart = textareaRef.current.selectionStart + 3;
    const underlineEnd =
      textareaRef.current.selectionEnd + (selectedText ? 3 : 7);

    textareaRef.current.focus();
    setTimeout(() => {
      textareaRef.current.setSelectionRange(underlineStart, underlineEnd);
    }, 0);
  };
  return (
    <button onClick={handleUnderlineClick}>
      <IconUnderline size={24} color="#393556" stroke={1} />
    </button>
  );
};

export default CustomUnderline;
