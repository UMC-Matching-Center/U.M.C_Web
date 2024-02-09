import React, { createContext, useState, useRef } from "react";

export const TextAreaContext = createContext();

export const TextAreaProvider = ({ children }) => {
  const [state, setState] = useState({
    text: "",
    textareaRef: useRef(null),
    matchText: "",
    matchTextareaRef: useRef(null),
  });

  // 공지사항 markdown text
  const updateText = (newText) => {
    setState((prevState) => ({ ...prevState, text: newText }));
  };
  // 매칭 프로젝트 markdown text
  const updateMatchText = (newText) => {
    setState((prevState) => ({ ...prevState, matchText: newText }));
  };

  return (
    <TextAreaContext.Provider value={{ ...state, updateText, updateMatchText }}>
      {children}
    </TextAreaContext.Provider>
  );
};
