import React, { useContext } from "react";
import { TextAreaContext } from "../../context/TextAreaProvider";
import { IconQuote } from "@tabler/icons-react";

const CustomQuote = () => {
  const {
    text,
    textareaRef,
    updateText,
    matchText,
    matchTextareaRef,
    updateMatchText,
  } = useContext(TextAreaContext);

  const handleQutoeClick = (e) => {
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

    // 인용 효과 (1. 드래그 선택된 값 앞에 > , 2. 드래그 선택된 값이 없으면 커서 위치에 > text 입력)
    const newText =
      postText.substring(0, postRef.current.selectionStart) +
      `${selectedText ? "> " + selectedText : "> text"}` +
      postText.substring(postRef.current.selectionEnd);

    postUpdate(newText);

    // 커서위치 이동(비동기)
    const QuoteStart = postRef.current.selectionStart + 2;
    const QuoteEnd = postRef.current.selectionEnd + (selectedText ? 2 : 6);

    postRef.current.focus();
    setTimeout(() => {
      postRef.current.setSelectionRange(QuoteStart, QuoteEnd);
    }, 0);
  };
  return (
    <button onClick={handleQutoeClick}>
      <IconQuote size={24} color="#393556" stroke={1} />
    </button>
  );
};

export default CustomQuote;
