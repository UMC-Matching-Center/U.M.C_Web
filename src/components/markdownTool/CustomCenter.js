import React, { useContext } from "react";
import { TextAreaContext } from "../../context/TextAreaProvider";
import { IconAlignCenter } from "@tabler/icons-react";

const CustomCenter = () => {
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

  const handleCenterClick = (e) => {
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

    // center 효과 (1. 드래그 선택된 값 양 옆에 <center>, 2. 드래그 선택된 값이 없으면 커서 위치에 <center>text</center> 입력)
    const newText =
      postText.substring(0, postRef.current.selectionStart) +
      `${
        selectedText
          ? "<center>" + selectedText + "</center>"
          : "<center>text</center>"
      }` +
      postText.substring(postRef.current.selectionEnd);

    postUpdate(newText);

    // 커서위치 이동(비동기)
    const centerStart = postRef.current.selectionStart + 8;
    const centerEnd = postRef.current.selectionEnd + (selectedText ? 8 : 12);

    postRef.current.focus();
    setTimeout(() => {
      postRef.current.setSelectionRange(centerStart, centerEnd);
    }, 0);
  };
  return (
    <button onClick={handleCenterClick}>
      <IconAlignCenter size={24} color="#393556" stroke={1} />
    </button>
  );
};

export default CustomCenter;
