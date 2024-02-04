import React, { useContext } from "react";
import { TextAreaContext } from "../../context/TextAreaProvider";
import { IconCode } from "@tabler/icons-react";

const CustomCode = () => {
  const {
    text,
    textareaRef,
    updateText,
    matchText,
    matchTextareaRef,
    updateMatchText,
  } = useContext(TextAreaContext);

  const handleCodeClick = (e) => {
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

    // code 효과 (1. 드래그 선택된 값 앞 뒤에 ``` , 2. 드래그 선택된 값이 없으면 커서 위치에 ``` text ```입력)
    const newText =
      postText.substring(0, postRef.current.selectionStart) +
      `${
        selectedText ? "\n```\n" + selectedText + "\n```" : "\n```\ncode\n```"
      }` +
      postText.substring(postRef.current.selectionEnd);

    postUpdate(newText);

    // 커서위치 이동(비동기)
    const CodeStart = postRef.current.selectionStart + 5;
    const CodeEnd = postRef.current.selectionEnd + (selectedText ? 5 : 10);

    postRef.current.focus();
    setTimeout(() => {
      postRef.current.setSelectionRange(CodeStart, CodeEnd);
    }, 0);
  };
  return (
    <button onClick={handleCodeClick}>
      <IconCode size={24} color="#393556" stroke={1} />
    </button>
  );
};

export default CustomCode;
