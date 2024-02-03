import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import MatchEditor from "./MatchEditor";
import MatchView from "./MatchView";
import { TextAreaContext } from "../../context/TextAreaProvider";
import {
  SelectBox,
  SelectOptions,
  Option,
} from "../../common/Selectbox/RectangleSelectBox";
import { IconPlus, IconX } from "@tabler/icons-react";
import "./MatchWrite.css";

// 지부 option들 정의
const partOptionsDummy = [
  { value: "DESIGN", name: "디자이너" },
  { value: "ANDROID", name: "Android" },
  { value: "IOS", name: "iOS" },
  { value: "WEB", name: "웹" },
  { value: "SPRINGBOOT", name: "Spring Boot" },
  { value: "NODEJS", name: "Node.js" },
];

const personOptionsDummy = [
  { value: "1", name: "1명" },
  { value: "2", name: "2명" },
  { value: "3", name: "3명" },
  { value: "4", name: "4명" },
  { value: "5", name: "5명" },
  { value: "6", name: "6명" },
];

const RecruitBadge = styled.div`
  display: flex;
  align-items: center;
  background: #cce6f9;
  color: #393556;
  border-radius: 2.5rem;
  min-width: 8 rem;
  padding: 0.3rem 0.7rem 0.3rem 1.2rem;
  height: 1.6rem;
  > span {
    font-family: KBO-Dia-Gothic;
    font-size: 1.6rem;
    font-weight: 500;
  }
  > svg {
    margin-left: auto;
  }
`;

const MatchWrite = () => {
  const { matchText, updateMatchText } = useContext(TextAreaContext);

  // 매칭 프로젝트 모집 파트 및 인원 추가
  const [recruits, setRecruits] = useState([]);
  const [part, setPart] = useState(["파트", 0]); //파트
  const [partOptionVisible, setpartOptionVisible] = useState(false); //파트 option 보이기 여부
  const partSelectRef = useRef(null);

  const [person, setPerson] = useState(["인원", 0]); //인원
  const [personOptionVisible, setPersonOptionVisible] = useState(false); //인원 option 보이기 여부
  const personSelectRef = useRef(null);

  // 매칭 프로젝트 대표 사진 추가
  const [, setImage] = useState(null); // 이미지 파일(File) 객체
  const [imageURL, setImageURL] = useState(null); // 이미지 URL - 미리보기 화면에 사용

  /*--------모집 파트,인원 추가 및 삭제 함수---------*/
  const handleAddRecruit = () => {
    const isPartAlreadyExists = recruits.some(
      (recruit) => recruit.part === part[0]
    );

    if (!isPartAlreadyExists) {
      const newRecruit = { part: part[0], person: person[0] };
      const newRecruits = [...recruits, newRecruit];
      setRecruits(newRecruits);
    }
  };

  const handleDeleteRecruit = (i) => {
    const newRecruits = [...recruits];
    newRecruits.splice(i, 1); // 선택된 모집,인원 badge 삭제

    setRecruits(newRecruits);
  };

  /*--------대표 이미지 미리보기, 추가 함수---------*/
  const fileInputRef = useRef(null);

  const onClickImage = () => {
    fileInputRef.current.click(); // 추가 이미지 클릭 이벤트 = file input 클릭 이벤트
  };

  const handleAddImages = (e) => {
    let file = e.target.files[0];

    if (file) {
      setImage(file); // 이미지 File 객체 저장
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise(
        (resolve) =>
          (reader.onload = () => {
            setImageURL(reader.result); // 이미지 URL 저장
            resolve();
          })
      );
    }
  };

  /*--------TAB 키 클릭 이벤트 함수---------*/
  const handleKeyDown = async (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();
      const newText = matchText + "\t";

      updateMatchText(newText);
    }
  };

  return (
    <div className="match-write-container">
      <div className="match-write-wrapper">
        <div className="match-upload">
          <button className="match-temp-button">임시저장</button>
          <button className="match-upload-button">업로드</button>
        </div>
        <div className="match-part-add">
          <div className="match-recruitbadge-box">
            {recruits.map((recruit, i) => {
              return (
                <RecruitBadge key={i}>
                  <span>{recruit.part} </span>&nbsp;
                  <span>{recruit.person}</span>
                  <IconX
                    size={18}
                    color={"#393556"}
                    stroke={1}
                    onClick={() => handleDeleteRecruit(i)}
                  />
                </RecruitBadge>
              );
            })}
          </div>
          <div style={{ width: "10.9rem", position: "relative" }}>
            <SelectBox
              onClick={() => setpartOptionVisible(!partOptionVisible)}
              ref={partSelectRef}
              style={{
                border: "0.1rem solid #6B6880",
                fontSize: "1.6rem",
                fontWeight: "300",
                fontFamily: "KBO-Dia-Gothic",
                color: "#6B6880",
              }}
            >
              <label>{part[0]}</label>
              <SelectOptions $visible={partOptionVisible}>
                {partOptionsDummy.map((option, i) => (
                  <Option
                    onClick={() => setPart([option.name, i])}
                    key={option.value}
                    className={i === part[1] ? "selected" : ""}
                    style={{ fontSize: "1.6rem" }}
                  >
                    {option.name}
                  </Option>
                ))}
              </SelectOptions>
            </SelectBox>
          </div>
          <div style={{ width: "5.7rem", position: "relative" }}>
            <SelectBox
              onClick={() => setPersonOptionVisible(!personOptionVisible)}
              ref={personSelectRef}
              style={{
                border: "0.1rem solid #6B6880",
                fontSize: "1.6rem",
                fontWeight: "300",
                fontFamily: "KBO-Dia-Gothic",
                color: "#6B6880",
              }}
            >
              <label>{person[0]}</label>
              <SelectOptions $visible={personOptionVisible}>
                {personOptionsDummy.map((option, i) => (
                  <Option
                    onClick={() => setPerson([option.name, i])}
                    key={option.value}
                    className={i === person[1] ? "selected" : ""}
                    style={{
                      fontSize: "1.6rem",
                    }}
                  >
                    {option.name}
                  </Option>
                ))}
              </SelectOptions>
            </SelectBox>
          </div>
          <button className="match-partAdd-button" onClick={handleAddRecruit}>
            <IconPlus size={22} color="#6B6880" stroke={1} />
          </button>
        </div>
        <div className="match-markdown">
          <MatchEditor />
          <div className="match-write-title">
            <input placeholder="제목을 입력해주세요" />
          </div>
          <div className="match-markdown-content">
            <div className="match-markdown-mainImg" onClick={onClickImage}>
              {!imageURL ? (
                <label
                  htmlFor="chooseFile"
                  style={{
                    fontSize: "1.8rem",
                    color: "#6B6880",
                    fontWeight: "300",
                  }}
                >
                  대표 이미지를 업로드하세요
                </label>
              ) : (
                <div
                  className="match-markdown-Img"
                  style={{
                    backgroundImage: `url(${imageURL})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                  }}
                />
              )}
              <input
                type="file"
                accept="image/*"
                name="chooseFile"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => handleAddImages(e)}
              />
            </div>
            <MatchView handleKeyDown={handleKeyDown} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchWrite;
