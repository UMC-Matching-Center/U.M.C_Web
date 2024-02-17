import React, { useContext } from "react";
import { TextAreaContext } from "../../context/TextAreaProvider";
import { IconLinkPlus } from "@tabler/icons-react";

const CustomLink = () => {
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

  const handleLinkClick = (e) => {
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

    // link 효과 (1. 드래그 선택된 값은 url [](url), 2. 드래그 선택된 값이 없으면 커서 위치에 [](url) 입력)
    const newText =
      postText.substring(0, postRef.current.selectionStart) +
      `${selectedText ? "[](" + selectedText + ")" : "[](URL)"}` +
      postText.substring(postRef.current.selectionEnd);

    postUpdate(newText);

    // 커서위치 이동(비동기)
    const linkStart = postRef.current.selectionStart + 3;
    const linkEnd = postRef.current.selectionEnd + (selectedText ? 3 : 6);

    postRef.current.focus();
    setTimeout(() => {
      postRef.current.setSelectionRange(linkStart, linkEnd);
    }, 0);
  };

  return (
    <button onClick={handleLinkClick}>
      <IconLinkPlus size={24} color="#393556" stroke={1} />
    </button>
  );
};

export default CustomLink;
