import React, { useContext } from "react";
import { TextAreaContext } from "../NoticeWrite";
import { IconPhotoPlus } from "@tabler/icons-react";

const CustomImage = () => {
  const { text, textareaRef, updateText } = useContext(TextAreaContext);

  const handleImageClick = (e) => {
    e.preventDefault();
    const selectedText = textareaRef.current.value.substring(
      textareaRef.current.selectionStart,
      textareaRef.current.selectionEnd
    );

    // image 효과 (1. 드래그 선택된 값은 url ![](image), 2. 드래그 선택된 값이 없으면 커서 위치에 ![](image) 입력)
    const newText =
      text.substring(0, textareaRef.current.selectionStart) +
      `${selectedText ? "![](" + selectedText + ")" : "![](image)"}` +
      text.substring(textareaRef.current.selectionEnd);

    updateText(newText);

    // 커서위치 이동(비동기)
    const imageStart = textareaRef.current.selectionStart + 4;
    const imageEnd = textareaRef.current.selectionEnd + (selectedText ? 4 : 9);

    textareaRef.current.focus();
    setTimeout(() => {
      textareaRef.current.setSelectionRange(imageStart, imageEnd);
    }, 0);
  };

  return (
    <button onClick={handleImageClick}>
      <IconPhotoPlus size={24} color="#393556" stroke={1} />
    </button>
  );
};

export default CustomImage;
