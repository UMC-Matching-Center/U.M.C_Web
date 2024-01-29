import React, { useContext } from "react";
import { TextAreaContext } from "../NoticeWrite";
import { IconLinkPlus } from "@tabler/icons-react";

const CustomLink = () => {
  const { text, textareaRef, updateText } = useContext(TextAreaContext);

  const handleLinkClick = (e) => {
    e.preventDefault();
    const selectedText = textareaRef.current.value.substring(
      textareaRef.current.selectionStart,
      textareaRef.current.selectionEnd
    );

    // link 효과 (1. 드래그 선택된 값은 url [](url), 2. 드래그 선택된 값이 없으면 커서 위치에 [](url) 입력)
    const newText =
      text.substring(0, textareaRef.current.selectionStart) +
      `${selectedText ? "[](" + selectedText + ")" : "[](URL)"}` +
      text.substring(textareaRef.current.selectionEnd);

    updateText(newText);

    // 커서위치 이동(비동기)
    const linkStart = textareaRef.current.selectionStart + 3;
    const linkEnd = textareaRef.current.selectionEnd + (selectedText ? 3 : 6);

    textareaRef.current.focus();
    setTimeout(() => {
      textareaRef.current.setSelectionRange(linkStart, linkEnd);
    }, 0);
  };

  return (
    <button onClick={handleLinkClick}>
      <IconLinkPlus size={24} color="#393556" stroke={1} />
    </button>
  );
};

export default CustomLink;
