import React, { useContext } from "react";
import { TextAreaContext } from "../../context/TextAreaProvider";
import { IconH3 } from "@tabler/icons-react";

const CustomHeader3 = () => {
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

  const handleHeader2Click = (e) => {
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

    // H3 효과 (1. 드래그 선택된 값 앞에 ### , 2. 드래그 선택된 값이 없으면 커서 위치에 ### text 입력)
    const newText =
      postText.substring(0, postRef.current.selectionStart) +
      `${selectedText ? "### " + selectedText : "### text"}` +
      postText.substring(postRef.current.selectionEnd);

    postUpdate(newText);

    // 커서위치 이동(비동기)
    const header3Start = postRef.current.selectionStart + 4;
    const header3End = postRef.current.selectionEnd + (selectedText ? 4 : 8);

    postRef.current.focus();
    setTimeout(() => {
      postRef.current.setSelectionRange(header3Start, header3End);
    }, 0);
  };
  return (
    <button onClick={handleHeader2Click}>
      <IconH3 size={24} color="#393556" stroke={1} />
    </button>
  );
};

export default CustomHeader3;
