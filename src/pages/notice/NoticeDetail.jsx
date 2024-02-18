import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetAccessToken from "../../utils/getAccessToken";
import { noticeDetailAPI } from "../../api";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Modal from "react-modal";
import styled from "styled-components";
import { IconX } from "@tabler/icons-react";
import "./NoticeWrite.css";

const NoticeDetailHeader = styled.div`
  width: 68.6rem;
  height: 3.9rem;
  margin: 3.8rem auto 0 auto;

  display: flex;
  padding: 0 1.3rem 1.2rem 0.6rem;
  font-family: KBO-Dia-Gothic;

  .notice-detail-title {
    color: #131313;
    font-size: 2.6rem;
    font-weight: 500;
  }

  .notice-detail-modify {
    margin-left: 0.8rem;
    margin-top: 1.7rem;
    color: var(--base-200, #9c9aab);
    font-size: 1.2rem;
    font-weight: 300;
  }

  .notice-detail-date {
    margin: 1.7rem 1.3rem 0 auto;
    color: var(--base-200, #9c9aab);
    font-size: 1.2rem;
    font-weight: 300;
  }
`;

const NoticeDetailContent = styled.div`
  width: 66.6rem;
  height: 62.7rem;
  margin: 0 auto;

  padding: 3.4rem 0.9rem 0.7rem 0.7rem;
  font-family: KBO-Dia-Gothic;
  font-weight: 300;
  font-size: 2rem;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  & p > img {
    width: 100%;
  }

  .notice-detail-images-box {
    display: flex;
    align-items: center;
    max-width: 69.1rem;
    height: 20rem;
    margin-top: 2.6rem;
    gap: 0 2.1rem;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    > .image-border {
      max-width: 17rem;
      min-width: 17rem;
      height: 17rem;
      border-radius: 0.8rem;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

const CustomModalStyle = {
  overlay: {
    backgroundColor: "#02010B80",
    width: "100vw",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    background: "transparent",
    border: "none",
    zIndex: "100",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    width: "60rem",
    height: "60rem",
  },
  closeButton: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    cursor: "pointer",
  },
};

const NoticeDetail = ({ type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useGetAccessToken();
  const { autoLogin } = useSelector((state) => state.userInfo);

  const { id } = useParams();
  const [notice, setNotice] = useState({});
  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const isModified =
    JSON.stringify(notice.createdAt) !== JSON.stringify(notice.updatedAt); // 수정 상태 확인

  useEffect(() => {
    if (accessToken !== "") {
      noticeDetailAPI(accessToken, dispatch, autoLogin, id).then((response) => {
        if (response.isSuccess) {
          setNotice(response.notice);

          const imageKeys = Object.keys(response.notice.images);
          imageKeys.forEach((key) => {
            const imageUrl = response.notice.images[key];
            setImages((pre) => [...pre, imageUrl]);
          });
        } else {
          alert(response.message);
        }
      });
    } else {
      navigate("/login", { replace: true });
    }
  }, []);
  return (
    <>
      <div className="notice-detail-container">
        <div className="notice-detail-wrapper">
          {type === "ROLE_ADMIN" && (
            <button
              className="notice-modify-button"
              onClick={() => {
                /*클릭시 해당 notice 수정 페이지로 이동*/
                navigate("../modify", {
                  state: {
                    data: { notice },
                    mode: "modify",
                  },
                });
              }}
            >
              수정
            </button>
          )}
          <NoticeDetailHeader>
            <div className="notice-detail-title">{notice.title}</div>
            <div className="notice-detail-modify">
              {isModified && "(수정됨)"}
            </div>
            <div className="notice-detail-date">
              {notice.updatedAt && (
                <>
                  {notice.updatedAt[0]}년&nbsp;{notice.updatedAt[1]}
                  월&nbsp;
                  {notice.updatedAt[2]}일&nbsp;{notice.updatedAt[3]}:
                  {notice.updatedAt[4]}
                </>
              )}
            </div>
          </NoticeDetailHeader>
          <div
            style={{
              width: "70.7rem",
              background: "#000000",
              height: "0.1rem",
              margin: "0 auto",
            }}
          ></div>
          <NoticeDetailContent>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[gfm]}
              skipHtml={false}
              components={{
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code {...props}>{children}</code>
                  );
                },
              }}
            >
              {notice.body}
            </ReactMarkdown>
            <div className="notice-detail-images-box">
              {images?.map((image, index) => (
                <div
                  className="image-border"
                  key={index}
                  onClick={() => {
                    setSelectedImage(image), setIsOpen(true);
                  }}
                >
                  <img src={image} alt="대표이미지" />
                </div>
              ))}
            </div>
          </NoticeDetailContent>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={CustomModalStyle}
      >
        <div style={{ position: "relative" }}>
          <div
            style={CustomModalStyle.closeButton}
            onClick={() => setIsOpen(false)}
          >
            <IconX size={24} color="#393556" stroke={1} />
          </div>
          <img
            src={selectedImage}
            alt="image"
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
          />
        </div>
      </Modal>
    </>
  );
};

export default NoticeDetail;
