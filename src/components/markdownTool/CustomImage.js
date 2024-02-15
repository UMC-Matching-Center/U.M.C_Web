import React, { useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useGetAccessToken from "../../utils/getAccessToken";
import { TextAreaContext } from "../../context/TextAreaProvider";
import { matchImageUploadAPI } from "../../api";
import { IconPhotoPlus } from "@tabler/icons-react";

const CustomImage = () => {
  const dispatch = useDispatch();
  const accessToken = useGetAccessToken();
  const { autoLogin } = useSelector((state) => state.userInfo);

  const {
    // 공지사항
    text,
    textareaRef,
    updateText,

    // 매칭 프로젝트
    matchText,
    matchTextareaRef,
    updateMatchText,
    updateMatchImage,
  } = useContext(TextAreaContext);
  const imageRef = useRef(null);

  // /notice/new : 공지사항
  const handleImageClick = (e) => {
    e.preventDefault();

    const selectedText = textareaRef.current.value.substring(
      textareaRef.current.selectionStart,
      textareaRef.current.selectionEnd
    );

    // image 효과 (1. 드래그 선택된 값은 url ![](image), 2. 드래그 선택된 값이 없으면 커서 위치에 ![](image) 입력)
    const newText =
      text.substring(0, textareaRef.current.selectionStart) +
      `${selectedText ? "![](" + selectedText + ")" : "![](image)"}` +
      text.substring(textareaRef.current.selectionEnd);

    updateText(newText);

    // 커서위치 이동(비동기)
    const imageStart = textareaRef.current.selectionStart + 4;
    const imageEnd = textareaRef.current.selectionEnd + (selectedText ? 4 : 9);

    textareaRef.current.focus();
    setTimeout(() => {
      textareaRef.current.setSelectionRange(imageStart, imageEnd);
    }, 0);
  };

  // /match/new, /landing/new : 매칭 및 랜딩 페이지
  const handleAddImages = (e) => {
    let file = e.target.files[0];

    if (file) {
      if (accessToken !== "") {
        matchImageUploadAPI(accessToken, dispatch, autoLogin, file).then(
          (response) => {
            if (response.isSuccess) {
              const id = response.imageId; // 이미지 ID
              const fileURL = response.s3Image; // 이미지 URL
              updateMatchImage(id, fileURL);

              const newText =
                matchText.substring(
                  0,
                  matchTextareaRef.current.selectionStart
                ) +
                `${"![" + `${id}` + "](" + `${fileURL}` + ")"}` +
                matchText.substring(matchTextareaRef.current.selectionEnd);

              updateMatchText(newText); // 이미지 추가된 전체 TEXT 업데이트
              const imageEnd =
                matchTextareaRef.current.selectionEnd +
                (5 + id.length + fileURL.length);

              matchTextareaRef.current.focus();
              setTimeout(() => {
                matchTextareaRef.current.setSelectionRange(imageEnd, imageEnd);
              }, 0);
            }
          }
        );
      }
    }
  };

  return window.location.pathname === "/notice/new" ? (
    <button onClick={handleImageClick}>
      <IconPhotoPlus size={24} color="#393556" stroke={1} />
    </button>
  ) : (
    <>
      <button onClick={() => imageRef.current.click()}>
        <input
          type="file"
          accept="image/*"
          name="chooseFile"
          ref={imageRef}
          style={{ display: "none" }}
          onChange={(e) => handleAddImages(e)}
        />
        <IconPhotoPlus size={24} color="#393556" stroke={1} />
      </button>
    </>
  );
};

export default CustomImage;
