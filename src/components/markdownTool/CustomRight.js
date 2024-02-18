import React, { useContext } from "react";
import { TextAreaContext } from "../../context/TextAreaProvider";
import { IconAlignRight } from "@tabler/icons-react";

const CustomRight = () => {
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

  const handleRightClick = (e) => {
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

    // Right 효과 (1. 드래그 선택된 값 옆에 <div style="text-align: right">, 2. 드래그 선택된 값이 없으면 커서 위치에 <div style="text-align: right">text</div> 입력)
    const newText =
      postText.substring(0, postRef.current.selectionStart) +
      `${
        selectedText
          ? `<div style="text-align: Right">` + selectedText + "</div>"
          : `<div style="text-align: Right">text</div>`
      }` +
      postText.substring(postRef.current.selectionEnd);

    postUpdate(newText);

    // 커서위치 이동(비동기)
    const RightStart = postRef.current.selectionStart + 31;
    const RightEnd = postRef.current.selectionEnd + (selectedText ? 31 : 35);

    postRef.current.focus();
    setTimeout(() => {
      postRef.current.setSelectionRange(RightStart, RightEnd);
    }, 0);
  };
  return (
    <button onClick={handleRightClick}>
      <IconAlignRight size={24} color="#393556" stroke={1} />
    </button>
  );
};

export default CustomRight;
