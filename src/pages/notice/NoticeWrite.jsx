import React, {
  useState,
  useRef,
  createContext,
  useContext,
  useEffect,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NoticeEditor from "./NoticeEditor";
import NoticeView from "./NoticeView";
import deleteButton from "../../images/ic_close.svg";
import { IconPhotoPlus } from "@tabler/icons-react";
import "./NoticeWrite.css";

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

function NoticeWrite() {
  const { text, updateText } = useContext(TextAreaContext);
  const navigation = useNavigate();
  const locationState = useLocation().state;
  const notice =
    locationState && locationState.data ? locationState.data.notice : null;

  const [title, setTitle] = useState(notice ? notice.title : "");
  const [images, setImages] = useState(notice ? notice.image : []); // 이미지 파일(File) 객체
  const [imagesURL, setImagesURL] = useState(notice ? notice.image : []); // 이미지 URL - 미리보기 화면에 사용 (% notice 초기값 추후 수정 필요)

  useEffect(() => {
    // location.state에서 content 값이 있으면 해당 값으로 text를 업데이트
    if (notice && notice.content) {
      updateText(notice.content);
    }
  }, [notice]);

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
      setImages((images) => [...images, file]);
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise(
        (resolve) =>
          (reader.onload = () => {
            setImagesURL((preImagesURL) => [...preImagesURL, reader.result]);
            resolve();
            e.target.value = "";
          })
      );
    }
  };

  const handleDeleteImages = (index) => {
    const updatedImagesURL = [...imagesURL];
    updatedImagesURL.splice(index, 1);

    const updatedImages = [...images];
    updatedImages.splice(index, 1);

    setImagesURL(updatedImagesURL);
    setImages(updatedImages);
  };

  /*--------공지사항 게시물 서버 전송---------*/
  const onSubmitNotice = () => {
    /* props.mode에 따라 API 달리하기 1. mode == new 는 새로 작성한 게시물 업로드 2. mode == modify는 수정 게시물 업로드 */
    console.log(title);
    console.log(text);
    console.log(images);
    // updateText("") - 게시물 업로드 이후, textarea 값 초기화
    navigation("..", { replace: true });
  };

  return (
    <div className="notice-write-container">
      <div className="notice-write-wrapper">
        <div className="notice-upload">
          <button className="notice-upload-button" onClick={onSubmitNotice}>
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
          {imagesURL.map((image, index) => (
            <ExtraImage
              imageURL={image}
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

const ExtraImage = ({ imageURL, onDelete, index }) => {
  return (
    <div className="extra-image-wrap">
      <img src={deleteButton} alt="delete" onClick={() => onDelete(index)} />
      <div className="extra-image">
        <img src={imageURL} alt="img" />
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
      <IconPhotoPlus size={30} color={"#CECDD5"} />
    </div>
  );
};

export default NoticeWrite;
