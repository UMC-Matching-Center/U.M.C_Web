import React, { useContext } from "react";
import { TextAreaContext } from "../../context/TextAreaProvider";
import { IconUnderline } from "@tabler/icons-react";

const CustomUnderline = () => {
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

  const handleUnderlineClick = (e) => {
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

    // underline 효과 (1. 드래그 선택된 값 양 옆에 <u>, 2. 드래그 선택된 값이 없으면 커서 위치에 <u>text</u> 입력)
    const newText =
      postText.substring(0, postRef.current.selectionStart) +
      `${selectedText ? "<u>" + selectedText + "</u>" : "<u>text</u>"}` +
      postText.substring(postRef.current.selectionEnd);

    postUpdate(newText);

    // 커서위치 이동(비동기)
    const underlineStart = postRef.current.selectionStart + 3;
    const underlineEnd = postRef.current.selectionEnd + (selectedText ? 3 : 7);

    postRef.current.focus();
    setTimeout(() => {
      postRef.current.setSelectionRange(underlineStart, underlineEnd);
    }, 0);
  };
  return (
    <button onClick={handleUnderlineClick}>
      <IconUnderline size={24} color="#393556" stroke={1} />
    </button>
  );
};

export default CustomUnderline;
