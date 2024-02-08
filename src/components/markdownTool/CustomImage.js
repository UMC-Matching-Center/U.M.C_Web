import React, { useContext } from "react";
import { TextAreaContext } from "../../context/TextAreaProvider";
import { IconPhotoPlus } from "@tabler/icons-react";

const CustomImage = () => {
  const {
    text,
    textareaRef,
    updateText,
    matchText,
    matchTextareaRef,
    updateMatchText,
  } = useContext(TextAreaContext);
  const handleImageClick = (e) => {
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

    // image 효과 (1. 드래그 선택된 값은 url ![](image), 2. 드래그 선택된 값이 없으면 커서 위치에 ![](image) 입력)
    const newText =
      postText.substring(0, postRef.current.selectionStart) +
      `${selectedText ? "![](" + selectedText + ")" : "![](image)"}` +
      postText.substring(postRef.current.selectionEnd);

    postUpdate(newText);

    // 커서위치 이동(비동기)
    const imageStart = postRef.current.selectionStart + 4;
    const imageEnd = postRef.current.selectionEnd + (selectedText ? 4 : 9);

    postRef.current.focus();
    setTimeout(() => {
      postRef.current.setSelectionRange(imageStart, imageEnd);
    }, 0);
  };

  return (
    <button onClick={handleImageClick}>
      <IconPhotoPlus size={24} color="#393556" stroke={1} />
    </button>
  );
};

export default CustomImage;
