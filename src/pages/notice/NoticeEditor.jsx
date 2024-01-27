import React from "react";
import styled from "styled-components";
import CustomHeader1 from "./markdownTool/CustomHeader1";
import CustomHeader2 from "./markdownTool/CustomHeader2";
import CustomBold from "./markdownTool/CustomBold";
import CustomItalic from "./markdownTool/CustomItalic";
import CustomUnderline from "./markdownTool/CustomUnderline";
import CustomQuote from "./markdownTool/CustomQuote";
import CustomCode from "./markdownTool/CustomCode";
import CustomImage from "./markdownTool/CustomImage";
import CustomLink from "./markdownTool/CustomLink";

const NoticeEditor = () => {
  return (
    <ToolbarWrapper>
      <CustomHeader1 />
      <CustomHeader2 />
      <SeperateBar />
      <CustomBold />
      <CustomItalic />
      <CustomUnderline />
      <SeperateBar />
      <CustomQuote />
      <CustomCode />
      <CustomLink />
      <CustomImage />
    </ToolbarWrapper>
  );
};

const ToolbarWrapper = styled.div`
  display: flex;
  padding-left: 2.4rem;
  gap: 0 3rem;
`;

const SeperateBar = styled.div`
  width: 0.1rem;
  height: 2.4rem;
  background-color: #393556;
`;
export default NoticeEditor;
