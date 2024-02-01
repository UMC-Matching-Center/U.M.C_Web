import React, { createContext, useState, useRef } from "react";

export const TextAreaContext = createContext();

export const TextAreaProvider = ({ children }) => {
  const [state, setState] = useState({
    text: "",
    textareaRef: useRef(null),
  });

  const updateText = (newText) => {
    setState((prevState) => ({ ...prevState, text: newText }));
  };

  return (
    <TextAreaContext.Provider value={{ ...state, updateText }}>
      {children}
    </TextAreaContext.Provider>
  );
};
