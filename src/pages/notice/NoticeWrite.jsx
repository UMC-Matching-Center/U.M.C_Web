import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetAccessToken from "../../utils/getAccessToken";
import { noticeUploadAPI, noticeModifyAPI } from "../../api";
import { TextAreaContext } from "../../context/TextAreaProvider";
import NoticeEditor from "./NoticeEditor";
import NoticeView from "./NoticeView";
import deleteButton from "../../images/ic_close.svg";
import { IconPhotoPlus } from "@tabler/icons-react";
import "./NoticeWrite.css";

function NoticeWrite() {
  const { text, updateText } = useContext(TextAreaContext);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useGetAccessToken();
  const { autoLogin } = useSelector((state) => state.userInfo);
  const locationState = useLocation().state;
  const notice =
    locationState && locationState.data ? locationState.data.notice : null;

  const [title, setTitle] = useState(notice ? notice.title : "");
  const [images, setImages] = useState([]); // 이미지 파일(File) 객체
  const [imagesURL, setImagesURL] = useState([]); // 이미지 URL - 미리보기 화면에 사용 객체 타입{id,url}
  const [deleteImages, setDeleteImages] = useState([]);

  // 업로드 버튼 활성화 비활성화
  const [enableUpload, setEnableUpload] = useState(false);

  /*--------TAB 키 클릭 이벤트 함수---------*/
  const handleKeyDown = async (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();
      const newText = text + "\t";

      updateText(newText);
    }
  };

  /*--------이미지 미리보기, 추가 및 삭제 함수---------*/
  const handleAddImages = (e) => {
    let file = e.target.files[0];

    if (file) {
      setImages((images) => [...images, file]); // 파일 추가
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise(
        (resolve) =>
          (reader.onload = () => {
            setImagesURL((preImagesURL) => [
              ...preImagesURL,
              { id: null, url: reader.result },
            ]);
            resolve();
            e.target.value = "";
          })
      );
    }
  };

  const handleDeleteImages = (image, index) => {
    if (locationState.mode === "new") {
      const updatedImages = [...images];
      updatedImages.splice(index, 1);

      const updatedImagesURL = [...imagesURL];
      updatedImagesURL.splice(index, 1);

      setImages(updatedImages);
      setImagesURL(updatedImagesURL);
    } else {
      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      setImages(updatedImages);

      const updatedImagesURL = [...imagesURL];
      const deleteElement = updatedImagesURL.find(
        (element) =>
          element.id !== null &&
          element.id === image.id &&
          element.url === image.url
      );
      deleteElement &&
        setDeleteImages((pre) => [...pre, parseInt(deleteElement.id)]);

      updatedImagesURL.splice(index, 1);
      setImagesURL(updatedImagesURL);
    }
  };

  /*--------공지사항 게시물 서버 전송---------*/
  const onSubmitNotice = () => {
    if (accessToken !== "") {
      if (locationState.mode === "new") {
        let formData = new FormData();
        formData.append(
          "request",
          new Blob(
            [
              JSON.stringify({
                title: title,
                body: text,
              }),
            ],
            { type: "application/json" }
          )
        );
        images.forEach((image) => formData.append("imageList", image));

        noticeUploadAPI(accessToken, dispatch, autoLogin, formData).then(
          (response) => {
            if (response.isSuccess) {
              updateText("");
              navigation("..", { replace: true });
            } else {
              alert(response.message);
            }
          }
        );
      } else {
        let formData = new FormData();
        formData.append(
          "request",
          new Blob(
            [
              JSON.stringify({
                title: title,
                body: text,
                deleteImageIdList: deleteImages,
              }),
            ],
            { type: "application/json" }
          )
        );
        const filteredImages = images.filter((image) => image !== null);
        filteredImages.forEach((image) => formData.append("imageList", image));

        noticeModifyAPI(
          accessToken,
          dispatch,
          autoLogin,
          notice.noticeId,
          formData
        ).then((response) => {
          if (response.isSuccess) {
            updateText("");
            navigation("..", { replace: true });
          } else {
            alert(response.message);
          }
        });
      }
    }
  };

  /* 수정 시 값 불러오기 */
  useEffect(() => {
    if (locationState.mode === "modify" && notice) {
      updateText(notice?.body);
      const imageKeys = Object.keys(notice.images);

      // 객체의 각 키에 대해 반복하여 이미지 URL을 추출하여 id, url 배열에 추가
      imageKeys.forEach((key) => {
        const imageUrl = notice.images[key];
        setImagesURL((pre) => [...pre, { id: key, url: imageUrl }]);
        setImages((pre) => [...pre, null]); // images 배열엔 null 값으로 length 일치
      });
    } else {
      updateText("");
    }
  }, []);

  /*업로드 버튼 활성화 및 비활성화*/
  useEffect(() => {
    title !== "" && text !== ""
      ? setEnableUpload(true)
      : setEnableUpload(false);
  }, [title, text]);

  return (
    <div className="notice-write-container">
      <div className="notice-write-wrapper">
        <div className="notice-upload">
          <button
            className="notice-upload-button"
            disabled={!enableUpload}
            style={{ opacity: !enableUpload && "0.5" }}
            onClick={onSubmitNotice}
          >
            게시하기
          </button>
        </div>
        <div className="notice-markdown">
          <NoticeEditor />
          <div className="notice-write-title">
            <input
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <NoticeView handleKeyDown={handleKeyDown} />
        </div>
        <div className="notice-images-box">
          {imagesURL?.map((image, index) => (
            <ExtraImage
              image={image}
              key={index}
              index={index}
              onDelete={handleDeleteImages}
              onKeyDown={handleKeyDown}
            />
          ))}
          <AddImage handleAddImages={handleAddImages} />
        </div>
      </div>
    </div>
  );
}

const ExtraImage = ({ image, onDelete, index }) => {
  return (
    <div className="extra-image-wrap">
      <img
        src={deleteButton}
        alt="delete"
        onClick={() => onDelete(image, index)}
      />
      <div className="extra-image">
        <img src={image.url} alt="img" />
      </div>
    </div>
  );
};

const AddImage = (props) => {
  const fileInputRef = useRef();
  const onClickIcon = () => {
    fileInputRef.current.click();
  };
  const onChangeImages = (e) => {
    props.handleAddImages(e);
  };
  return (
    <div className="extra-image-plus" onClick={onClickIcon}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onChangeImages}
      />
      <IconPhotoPlus size={30} color={"#9C9AAB"} stroke={1} />
    </div>
  );
};

export default NoticeWrite;
