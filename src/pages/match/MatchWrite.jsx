import React, { useState, useRef, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useGetAccessToken from "../../utils/getAccessToken";
import {
  matchImageUploadAPI,
  matchPostUploadAPI,
  matchPostModifyAPI,
} from "../../api";
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
  { value: 1, name: "1명" },
  { value: 2, name: "2명" },
  { value: 3, name: "3명" },
  { value: 4, name: "4명" },
  { value: 5, name: "5명" },
  { value: 6, name: "6명" },
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
  const { matchText, updateMatchText, matchImage, clearMatchImage } =
    useContext(TextAreaContext);

  const navigate = useNavigate();
  const location = useLocation();
  const project = location.state?.project && location.state?.project;
  const mode = location.state?.mode;
  const dispatch = useDispatch();
  const accessToken = useGetAccessToken();
  const { autoLogin } = useSelector((state) => state.userInfo);

  // 매칭 프로젝트 모집 파트 및 인원 추가
  const [recruits, setRecruits] = useState([]);
  const [part, setPart] = useState(["파트", 0, ""]); //파트
  const [partOptionVisible, setpartOptionVisible] = useState(false); //파트 option 보이기 여부
  const partSelectRef = useRef(null);

  const [person, setPerson] = useState(["인원", 0]); //인원
  const [personOptionVisible, setPersonOptionVisible] = useState(false); //인원 option 보이기 여부
  const personSelectRef = useRef(null);

  // 매칭 프로젝트 제목 및 한 줄 소개 추가
  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");

  // 매칭 프로젝트 대표 사진 추가
  const [, setImage] = useState(null); // 이미지 파일(File) 객체
  const [imageId, setImageId] = useState(0); // 대표이미지 id - 서버 전송용
  const [imageURL, setImageURL] = useState(null); // 이미지 URL - 미리보기 화면에 사용

  // 업로드 버튼 활성화 비활성화
  const [enableUpload, setEnableUpload] = useState(false);

  /*--------모집 파트,인원 추가 및 삭제 함수---------*/
  const handleAddRecruit = () => {
    const isPartAlreadyExists = recruits.some(
      (recruit) => recruit.part === part[2]
    );

    if (!isPartAlreadyExists) {
      const newRecruit = {
        partName: part[0],
        part: part[2],
        personName: person[0],
        person: person[1],
      }; // partName: 화면 상 이름, part: 서버 상 파트 이름
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

    if (file && accessToken !== "") {
      matchImageUploadAPI(accessToken, dispatch, autoLogin, file).then(
        (response) => {
          if (response.isSuccess) {
            setImage(file);
            setImageId(response.imageId);
            setImageURL(response.s3Image);
          }
        }
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

  /*----- 본문에 사용된 이미지 ID, URL 추출 -----*/
  const extractIdElements = () => {
    const regex = /!\[(.*?)\]\((.*?)\)/gm; // 정규표현식 패턴
    const elements = [];
    let match;

    // 정규표현식에 일치하는 모든 요소를 추출하여 배열에 저장
    while ((match = regex.exec(matchText)) !== null) {
      const id = match[1]; // id 값 추출
      const url = match[2]; // url 값 추출
      elements.push({ id, url }); // id와 url을 객체로 배열에 저장
    }

    return elements;
  };

  /*------매칭 프로젝트 업로드 -------*/
  const uploadMatchingProject = () => {
    if (mode === "new") {
      // upload new matching project
      // 모집 파트 및 인원
      const partCounts = {}; // part {}
      recruits.forEach((recruit) => {
        partCounts[recruit.part] = recruit.person;
      });
      // 사용 이미지 추출
      const extractedIds = extractIdElements();
      const extractedUrls = extractedIds?.map((image) => image.url);

      let images = [];
      if (extractedUrls !== null && matchImage !== null) {
        images = matchImage.map(
          (image) => extractedUrls.includes(image.url) && image.id
        ); // use image []
      }

      const postData = {
        profileImageId: imageId,
        body: matchText,
        introduction: introduction,
        name: title,
        partCounts: partCounts,
        imageIdList: images,
      };

      matchPostUploadAPI(accessToken, dispatch, autoLogin, postData).then(
        (response) => {
          if (response.isSuccess) {
            clearMatchImage();
            updateMatchText("");
          }
          navigate(-1, { replace: true });
        }
      );
    } else if (mode === "modify") {
      // modify the matching project
      // 파트
      const partCounts = {}; // part {}
      recruits.forEach((recruit) => {
        partCounts[recruit.part] = recruit.person;
      });

      // 추가적으로 사용된 이미지 및 삭제된 이미지 ID 저장
      const extractedIds = extractIdElements(); // all image []
      const extractedUrls = extractedIds?.map((image) => image.url);

      let images = [];
      if (extractedUrls !== null && matchImage !== null) {
        images = matchImage
          .map((image) => (extractedUrls.includes(image.url) ? image.id : null))
          .filter((value) => value !== null); // use image []
      }

      const deleteImageList = [];
      const imageKeys = Object.keys(project.images); // key 값 추출

      imageKeys?.forEach((key) => {
        const url = project.images[key];
        if (!extractedUrls?.includes(url)) {
          deleteImageList.push(parseInt(key)); // 기존에 존재하였지만 삭제된 이미지 아이디 저장
        }
      });

      // 대표사진 변경되었을 경우, deleteImageList push
      imageId !== project.profileImageId &&
        deleteImageList.push(project.profileImageId);

      const postData = {
        profileImageId: imageId,
        body: matchText,
        introduction: introduction,
        name: title,
        partCounts: partCounts,
        imageIdList: images,
        deleteImageIdList: deleteImageList,
      };

      // API 작성
      matchPostModifyAPI(
        accessToken,
        dispatch,
        autoLogin,
        project.projectId,
        postData
      ).then((response) => {
        if (response.isSuccess) {
          clearMatchImage();
          updateMatchText("");
        }
        navigate(-1, { replace: true });
      });
    }
  };

  /* 수정 시, 저장된 값 가져오기 */
  useEffect(() => {
    if (project && mode === "modify") {
      const newRecruits = project.recruitments.map((recruit) => {
        // 파트 index
        const foundPartIndex = partOptionsDummy.findIndex(
          (part) => part.value === recruit.part
        );
        const partData =
          foundPartIndex !== -1 ? partOptionsDummy[foundPartIndex] : null;

        // 인원 index
        const foundPersonIndex = personOptionsDummy.findIndex(
          (person) => person.value === recruit.totalRecruitment
        );
        const personData =
          foundPersonIndex !== -1 ? personOptionsDummy[foundPersonIndex] : null;

        return {
          partName: partData ? partData.name : "", // 파트 이름(UI)
          part: partData ? partData.value : "", // 파트 값(서버)
          personName: personData ? personData.name : "", // 인원 이름(UI)
          person: personData ? personData.value : 0, // 인원 값(서버)
        };
      });
      setRecruits(newRecruits); // 모집인원 및 파트
      setTitle(project.name); // 프로젝트 이름
      setIntroduction(project.introduction); // 프로젝트 한줄 소개
      setImageId(project.profileImageId); // 대표 이미지 ID
      setImageURL(project.profileImageUrl); // 대표 이미지 URL
      updateMatchText(project.body); // 프로젝트 본문 설명
    } else if (mode === "new") {
      updateMatchText("");
      clearMatchImage();
    }
  }, []);

  /*업로드 버튼 활성화 및 비활성화*/
  useEffect(() => {
    recruits.length !== 0 &&
    imageURL !== null &&
    title !== "" &&
    introduction !== ""
      ? setEnableUpload(true)
      : setEnableUpload(false);
  }, [recruits, imageURL, title, introduction]);

  return (
    <div className="match-write-container">
      <div className="match-write-wrapper">
        <div className="match-upload">
          <button
            className="match-upload-button"
            disabled={!enableUpload}
            style={{
              opacity: !enableUpload && "0.5",
              cursor: !enableUpload && "auto",
            }}
            onClick={uploadMatchingProject}
          >
            업로드
          </button>
        </div>
        <div className="match-part-add">
          <div className="match-recruitbadge-box">
            {recruits.map((recruit, i) => {
              return (
                <RecruitBadge key={i}>
                  <span>{recruit.partName} </span>&nbsp;
                  <span>{recruit.personName}</span>
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
              <label>{part[0] !== "" ? part[0] : "파트"}</label>
              <SelectOptions $visible={partOptionVisible}>
                {partOptionsDummy.map((option, i) => (
                  <Option
                    onClick={() => setPart([option.name, i, option.value])}
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
              <label>{person[0] !== "" ? person[0] : "인원"}</label>
              <SelectOptions $visible={personOptionVisible}>
                {personOptionsDummy.map((option) => (
                  <Option
                    onClick={() => setPerson([option.name, option.value])}
                    key={option.value}
                    className={option.value === person[1] ? "selected" : ""}
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
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요"
            />
          </div>
          <div className="match-write-subtitle">
            <input
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              placeholder="한줄 소개를 작성해주세요"
            />
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
