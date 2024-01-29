import React, { useContext } from "react";
import { TextAreaContext } from "../../context/TextAreaProvider";
import { IconCode } from "@tabler/icons-react";

const CustomCode = () => {
  const { text, textareaRef, updateText } = useContext(TextAreaContext);

  const handleCodeClick = (e) => {
    e.preventDefault();
    const selectedText = textareaRef.current.value.substring(
      textareaRef.current.selectionStart,
      textareaRef.current.selectionEnd
    );

    // code 효과 (1. 드래그 선택된 값 앞 뒤에 ``` , 2. 드래그 선택된 값이 없으면 커서 위치에 ``` text ```입력)
    const newText =
      text.substring(0, textareaRef.current.selectionStart) +
      `${
        selectedText ? "\n```\n" + selectedText + "\n```" : "\n```\ncode\n```"
      }` +
      text.substring(textareaRef.current.selectionEnd);

    updateText(newText);

    // 커서위치 이동(비동기)
    const CodeStart = textareaRef.current.selectionStart + 5;
    const CodeEnd = textareaRef.current.selectionEnd + (selectedText ? 5 : 10);

    textareaRef.current.focus();
    setTimeout(() => {
      textareaRef.current.setSelectionRange(CodeStart, CodeEnd);
    }, 0);
  };
  return (
    <button onClick={handleCodeClick}>
      <IconCode size={24} color="#393556" stroke={1} />
    </button>
  );
};

export default CustomCode;
