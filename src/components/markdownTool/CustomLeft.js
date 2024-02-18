import React, { useContext } from "react";
import { TextAreaContext } from "../../context/TextAreaProvider";
import { IconAlignLeft } from "@tabler/icons-react";

const CustomLeft = () => {
  const {
    text,
    textareaRef,
    updateText,
    matchText,
    matchTextareaRef,
    updateMatchText,
    landingText,
    landingTextareaRef,
    updateLandingText,
  } = useContext(TextAreaContext);

  const handleLeftClick = (e) => {
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
      case "/myproject/landing/new":
        postText = landingText;
        postRef = landingTextareaRef;
        postUpdate = updateLandingText;
        break;
      default:
        break;
    }

    const selectedText = postRef.current.value.substring(
      postRef.current.selectionStart,
      postRef.current.selectionEnd
    );

    // left 효과 (1. 드래그 선택된 값 옆에 <div style="text-align: left">, 2. 드래그 선택된 값이 없으면 커서 위치에 <div style="text-align: left">text</div> 입력)
    const newText =
      postText.substring(0, postRef.current.selectionStart) +
      `${
        selectedText
          ? `<div style="text-align: left">` + selectedText + "</div>"
          : `<div style="text-align: left">text</div>`
      }` +
      postText.substring(postRef.current.selectionEnd);

    postUpdate(newText);

    // 커서위치 이동(비동기)
    const leftStart = postRef.current.selectionStart + 30;
    const leftEnd = postRef.current.selectionEnd + (selectedText ? 30 : 34);

    postRef.current.focus();
    setTimeout(() => {
      postRef.current.setSelectionRange(leftStart, leftEnd);
    }, 0);
  };
  return (
    <button onClick={handleLeftClick}>
      <IconAlignLeft size={24} color="#393556" stroke={1} />
    </button>
  );
};

export default CustomLeft;
