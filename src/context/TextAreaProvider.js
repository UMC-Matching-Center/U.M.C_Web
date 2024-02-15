import React, { createContext, useState, useRef } from "react";

export const TextAreaContext = createContext();

export const TextAreaProvider = ({ children }) => {
  const [state, setState] = useState({
    // 공지사항
    text: "",
    textareaRef: useRef(null),

    // 매칭 프로젝트
    matchText: "",
    matchTextareaRef: useRef(null),
    matchImage: [], // 초기 이미지
  });

  /*----- 공지사항 -----*/
  // 공지사항 markdown text
  const updateText = (newText) => {
    setState((prevState) => ({ ...prevState, text: newText }));
  };

  /*----- 매칭 프로젝트 -----*/
  // 매칭 프로젝트 markdown text
  const updateMatchText = (newText) => {
    setState((prevState) => ({ ...prevState, matchText: newText }));
  };

  // 매칭 프로젝트 image
  // 1. 매칭 프로젝트 생성 시, 추가된 이미지 ID 관리 및 수정 시, 수정 이미지 ID 관리
  const updateMatchImage = (id, url) => {
    const newImage = { id, url };
    setState((prevState) => ({
      ...prevState,
      matchImage: [...prevState.matchImage, newImage],
    }));
  };

  // 2. 매칭 프로젝트 업로드 이후, 보관했던 이미지 ID clear
  const clearMatchImage = () => {
    setState((prevState) => ({
      ...prevState,
      matchImage: [],
      matchNewImage: [],
    }));
  };

  return (
    <TextAreaContext.Provider
      value={{
        ...state,
        updateText,
        updateMatchText,
        updateMatchImage,
        clearMatchImage,
      }}
    >
      {children}
    </TextAreaContext.Provider>
  );
};
