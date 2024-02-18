import React, { useState, useRef, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useGetAccessToken from "../../../utils/getAccessToken";
import {
  landingImageUploadAPI,
  landingWriteAPI,
  landingModifyAPI,
} from "../../../api";
import LandingPageEditor from "./LandingPageEditor";
import LandingPageView from "./LandingPageView";
import { TextAreaContext } from "../../../context/TextAreaProvider";

const LandingPageWrite = ({ mode }) => {
  const { landingText, updateLandingText, landingImage, clearLandingImage } =
    useContext(TextAreaContext);

  const navigate = useNavigate();
  const location = useLocation();
  const project = location.state?.project && location.state?.project;

  const dispatch = useDispatch();
  const accessToken = useGetAccessToken();
  const { autoLogin } = useSelector((state) => state.userInfo);

  // 매칭 프로젝트 제목 및 한 줄 소개 추가
  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");

  // 매칭 프로젝트 대표 사진 추가
  const [, setImage] = useState(null); // 이미지 파일(File) 객체
  const [imageId, setImageId] = useState(0); // 대표이미지 id - 서버 전송용
  const [imageURL, setImageURL] = useState(null); // 이미지 URL - 미리보기 화면에 사용

  // 업로드 버튼 활성화 비활성화
  const [enableUpload, setEnableUpload] = useState(false);

  /*--------대표 이미지 미리보기, 추가 함수---------*/
  const fileInputRef = useRef(null);

  const onClickImage = () => {
    fileInputRef.current.click(); // 추가 이미지 클릭 이벤트 = file input 클릭 이벤트
  };

  const handleAddImages = (e) => {
    let file = e.target.files[0];

    if (file && accessToken !== "") {
      landingImageUploadAPI(accessToken, dispatch, autoLogin, file).then(
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
      const newText = landingText + "\t";

      updateLandingText(newText);
    }
  };

  /*----- 본문에 사용된 이미지 ID, URL 추출 -----*/
  const extractIdElements = () => {
    const regex = /!\[(.*?)\]\((.*?)\)/gm; // 정규표현식 패턴
    const elements = [];
    let match;

    // 정규표현식에 일치하는 모든 요소를 추출하여 배열에 저장
    while ((match = regex.exec(landingText)) !== null) {
      const id = match[1]; // id 값 추출
      const url = match[2]; // url 값 추출
      elements.push({ id, url }); // id와 url을 객체로 배열에 저장
    }

    return elements;
  };

  /*------매칭 프로젝트 업로드 -------*/
  const uploadMatchingProject = () => {
    if (mode === "new") {
      // 사용 이미지 추출
      const extractedIds = extractIdElements();
      const extractedUrls = extractedIds?.map((image) => image.url);

      let images = [];
      if (extractedUrls !== null && landingImage !== null) {
        images = landingImage.map(
          (image) => extractedUrls.includes(image.url) && image.id
        ); // use image []
      }

      const postData = {
        profileImageId: imageId,
        title: title,
        introduction: introduction,
        body: landingText,
        imageIdList: images,
      };

      if (accessToken !== "") {
        landingWriteAPI(accessToken, dispatch, autoLogin, postData).then(
          (response) => {
            if (response.isSuccess) {
              clearLandingImage();
              updateLandingText("");
            }
            navigate("..", { replace: true });
          }
        );
      }
    } else if (mode === "modify") {
      // 추가적으로 사용된 이미지 및 삭제된 이미지 ID 저장
      const extractedIds = extractIdElements(); // all image []
      const extractedUrls = extractedIds?.map((image) => image.url);

      let images = [];
      if (extractedUrls !== null && landingImage !== null) {
        images = landingImage
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
        title: title,
        introduction: introduction,
        body: landingText,
        imageIdList: images,
        deleteImageIdList: deleteImageList,
      };

      // API 작성
      if (accessToken !== "") {
        landingModifyAPI(
          accessToken,
          dispatch,
          autoLogin,
          project.landingPageId,
          postData
        ).then((response) => {
          if (response.isSuccess) {
            clearLandingImage();
            updateLandingText("");
          }
          navigate("/myproject/landing", { replace: true });
        });
      }
    }
  };

  /* 수정 시, 저장된 값 가져오기 */
  useEffect(() => {
    if (project && mode === "modify") {
      setTitle(project.name); // 프로젝트 이름
      setIntroduction(project.introduction); // 프로젝트 한줄 소개
      setImageId(project.profileImageId); // 대표 이미지 ID
      setImageURL(project.profileImageUrl); // 대표 이미지 URL
      updateLandingText(project.body); // 프로젝트 본문 설명
    } else if (mode === "new") {
      updateLandingText("");
      clearLandingImage();
    }
  }, []);

  /*업로드 버튼 활성화 및 비활성화*/
  useEffect(() => {
    imageURL !== null && title !== "" && introduction !== ""
      ? setEnableUpload(true)
      : setEnableUpload(false);
  }, [imageURL, title, introduction]);

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

        <div className="match-markdown">
          <LandingPageEditor />
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
            <LandingPageView handleKeyDown={handleKeyDown} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageWrite;
