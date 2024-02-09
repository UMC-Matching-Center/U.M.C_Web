import React, { useContext } from "react";
import { TextAreaContext } from "../../context/TextAreaProvider";
import { IconAlignJustified } from "@tabler/icons-react";

const CustomJustify = () => {
  const {
    text,
    textareaRef,
    updateText,
    matchText,
    matchTextareaRef,
    updateMatchText,
  } = useContext(TextAreaContext);

  const handleJustifyClick = (e) => {
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

    // Justify 효과 (1. 드래그 선택된 값 옆에 <div style="text-align: justify">, 2. 드래그 선택된 값이 없으면 커서 위치에 <div style="text-align: justify">text</div> 입력)
    const newText =
      postText.substring(0, postRef.current.selectionStart) +
      `${
        selectedText
          ? `<div style="text-align: justify">` + selectedText + "</div>"
          : `<div style="text-align: justify">text</div>`
      }` +
      postText.substring(postRef.current.selectionEnd);

    postUpdate(newText);

    // 커서위치 이동(비동기)
    const JustifyStart = postRef.current.selectionStart + 33;
    const JustifyEnd = postRef.current.selectionEnd + (selectedText ? 33 : 37);

    postRef.current.focus();
    setTimeout(() => {
      postRef.current.setSelectionRange(JustifyStart, JustifyEnd);
    }, 0);
  };
  return (
    <button onClick={handleJustifyClick}>
      <IconAlignJustified size={24} color="#393556" stroke={1} />
    </button>
  );
};

export default CustomJustify;
