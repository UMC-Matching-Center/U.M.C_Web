import React, { useContext } from "react";
import { TextAreaContext } from "../../context/TextAreaProvider";
import { IconBold } from "@tabler/icons-react";

const CustomBold = () => {
  const {
    text,
    textareaRef,
    updateText,
    matchText,
    matchTextareaRef,
    updateMatchText,
  } = useContext(TextAreaContext);

  const handleBoldClick = (e) => {
    e.preventDefault();
    let postText = "";
    let postRef = null;
    let postUpdate = null;

    switch (window.location.pathname) {
      case "/notice/new":
        postText = text;
        postRef = textareaRef;
        postUpdate = updateText;
        break;
      case "/match/new":
        postText = matchText;
        postRef = matchTextareaRef;
        postUpdate = updateMatchText;
        break;
      default:
        break;
    }

    const selectedText = postRef.current.value.substring(
      postRef.current.selectionStart,
      postRef.current.selectionEnd
    );

    // bold 효과 (1. 드래그 선택된 값 양 옆에 **, 2. 드래그 선택된 값이 없으면 커서 위치에 **text** 입력)
    const newText =
      postText.substring(0, postRef.current.selectionStart) +
      `${selectedText ? "**" + selectedText + "**" : "**text**"}` +
      postText.substring(postRef.current.selectionEnd);

    postUpdate(newText);

    // 커서위치 이동(비동기) - 텍스트 드래그 상태 유지
    const boldStart = postRef.current.selectionStart + 2;
    const boldEnd = postRef.current.selectionEnd + (selectedText ? 2 : 6);

    postRef.current.focus();
    setTimeout(() => {
      postRef.current.setSelectionRange(boldStart, boldEnd);
    }, 0);
  };

  return (
    <button onClick={handleBoldClick}>
      <IconBold size={20} color="#393556" stroke={2} />
    </button>
  );
};

export default CustomBold;
