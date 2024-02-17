import React, { useContext } from "react";
import { TextAreaContext } from "../../context/TextAreaProvider";
import { IconItalic } from "@tabler/icons-react";

const CustomItalic = () => {
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

  const handleItalicClick = (e) => {
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

    // italic 효과 (1. 드래그 선택된 값 양 옆에 _, 2. 드래그 선택된 값이 없으면 커서 위치에 _text_ 입력)
    const newText =
      postText.substring(0, postRef.current.selectionStart) +
      `${selectedText ? "_" + selectedText + "_" : "_text_"}` +
      postText.substring(postRef.current.selectionEnd);

    postUpdate(newText);

    // 커서위치 이동(비동기)
    const italicStart = postRef.current.selectionStart + 1;
    const italicEnd = postRef.current.selectionEnd + (selectedText ? 1 : 5);

    postRef.current.focus();
    setTimeout(() => {
      postRef.current.setSelectionRange(italicStart, italicEnd);
    }, 0);
  };
  return (
    <button onClick={handleItalicClick}>
      <IconItalic size={24} color="#393556" stroke={1} />
    </button>
  );
};

export default CustomItalic;
