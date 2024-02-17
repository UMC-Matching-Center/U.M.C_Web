import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import MemberCard from "../common/MemberCard/MemberCard";
import styled from "styled-components";

const ProjectDetailWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ProjectDetailForm = styled.div`
  position: relative;
  width: 120rem;
  max-height: 73.2rem;
  background: #fafafa;
  padding: 3rem 0;

  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;

  > .modify-button {
    position: absolute;
    top: 1.9rem;
    right: 3rem;

    width: 7.2rem;
    height: 3.6rem;
    line-height: 3.6rem;
    text-align: center;
    border: 0.1rem solid #014171;
    border-radius: 0.5rem;
    color: #014171;
    font-size: 1.6rem;

    cursor: pointer;
  }
`;

const FormTitle = styled.div`
  width: 19.7rem;
  height: 100%;
`;

const FormTitleMenu = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 13.7rem;
  margin-top: 3rem;
  margin-left: 4.2rem;
  padding: 0.5rem 0;

  > .project-title {
    margin-left: 1rem;
    margin-bottom: 1rem;

    color: #cecdd5;
    font-family: KBO-Dia-Gothic;
    font-size: 1.6rem;
    font-weight: 300;

    border: 0;
    background-color: transparent;
    cursor: pointer;

    &.active {
      color: #08032c;
    }
    &.semi-menu {
      padding-left: 1.5rem;
    }
  }
`;

const FormContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 72.4rem;
  max-height: 64.7rem;
  margin-left: 5.1rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  > .project-img {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    width: 35.5rem;
    height: 20rem;
    > img {
      overflow: hidden;
      object-fit: contain;
    }
  }

  > h1{
    margin-bottom: 4.7rem;
  }

  > .project-description {
    position: relative;
    height: 44rem;
    color: #131313;

    > .content-section {
      font-family: KBO-Dia-Gothic;
      position: absolute;
      left: 0;

      width: 72.4rem;
      & p > img {
          width: 100%;
        }
      }
    }
  }
`;

const ProjectDetail = ({ project, type }) => {
  const navigation = useNavigate();

  // 매칭 프로젝트 상세 페이지 url 여부(/match/detail/id)
  const pathArray = location.pathname.split("/");
  const isMatchDetailPage =
    pathArray.length === 4 &&
    pathArray[1] === "match" &&
    pathArray[2] === "detail";
  // 랜딩 페이지 url 여부(/myproject/landing)
  const isLandingDetailPage =
    location.pathname === "/myproject/landing" && true;
  // 홈 페이지 url 여부(/project/{title})
  const isHomeDetailPage =
    location.pathname.split("/")[1] === "/project" && true;

  const [selectIndex, setSelectIndex] = useState(); // 메뉴 선택 index
  const [isMenuClicked, setIsMenuClicked] = useState(false); // 메뉴 클릭 여부
  const [contents, setContents] = useState([]); // 각 헤더(#) 별 content
  const contentRefs = useRef([]); // 각 content 참조변수
  const FormContentRef = useRef(null); // content를 감싸는 <FormContent/> 참조변수
  const [scrollPosition, setScrollPosition] = useState(0); // <FormContent /> 내 스크롤 위치

  /*---- FormContent 내 스크롤 값 계산 함수----*/
  const handleScroll = () => {
    const currentPosition = FormContentRef.current.scrollTop;
    setScrollPosition(currentPosition);
  };

  /*---- FormContent 스크롤 시, 스크롤 내용에 대응하여 해당 메뉴 css 자동 변화 : (범위) 현 헤더부터 ~ 다음 헤더까지 ----*/
  const currentSection = contents.find((content, index) => {
    const currentRef = contentRefs.current[index].current;
    const nextRef = contentRefs.current[index + 1]?.current;

    if (currentRef) {
      const currentOffsetTop = currentRef.offsetTop;
      const nextOffsetTop = nextRef?.offsetTop;

      if (
        scrollPosition >= currentOffsetTop &&
        (scrollPosition < nextOffsetTop || index === contents.length - 1)
      ) {
        return true;
      }
    }

    return false;
  });

  /*---- Markdown 내용 내, #, ## 헤더 추출 (level: #의 개수 / title: # 뒤 타이틀 / content: 현 헤더에서 다음 헤더까지의 내용) ----*/
  useEffect(() => {
    const extractContents = () => {
      const matches = [];
      let contentRegex = /^(#+)\s*([^\n]+)?(?:\n|\r\n?)([^#]*)/m; // 첫번째 header index 파악용 정규식
      let match;
      // Header 전 내용 matches 저장
      match = contentRegex.exec(project.body);
      if (match) {
        const firstHeaderIndex = match.index;
        const firstContent = project.body.slice(0, firstHeaderIndex);
        matches.push({ level: 0, title: null, content: firstContent });
      } else {
        matches.push({ level: 0, title: null, content: project.body });
      }

      // Header가 포함된 내용 matches 저장
      contentRegex = /^(#+)\s*([^\n]+)?(?:\n|\r\n?)([^#]*)/gm; // 모든 Header Search
      while ((match = contentRegex.exec(project.body)) !== null) {
        const [, prefix, title, content] = match;
        if (prefix && (title || content)) {
          matches.push({
            level: prefix.length,
            title: title ? title.trim() : null,
            content: content ? content.trim() : null,
          });
        }
      }
      (isLandingDetailPage || isHomeDetailPage) &&
        matches.push({
          level: 1,
          title: "멤버",
          content: null,
        }); //랜딩 페이지,홈페이지에만
      return matches;
    };
    const extractedContents = extractContents(); // 헤더(level,title,content) 추출

    setContents(extractedContents); // content-section 데이터로써 content 변수에 extractedContents 저장
    contentRefs.current = extractedContents.map(() => React.createRef()); // extractedContents 대응하는 Ref 변수 : (for. 각 offsetTop)
  }, [project.body]); // 원래는 markdownContent

  /*---- Markdown 내, Header 별(#,##) content-section가 위치할 top 구하는 함수 ----*/
  useEffect(() => {
    const updateOffsetTop = () => {
      let acc = 0;
      contentRefs.current.forEach((ref) => {
        if (ref.current) {
          ref.current.style.top = `${acc / 10}rem`;
          acc += ref.current.offsetHeight;
        }
      });
    };

    updateOffsetTop(); // 렌더링 시, top 계산 후에 각 content 위치시킴

    window.addEventListener("resize", updateOffsetTop);
    FormContentRef.current.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updateOffsetTop);
      FormContentRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [contents, contentRefs, FormContentRef, handleScroll]);

  return (
    <>
      <ProjectDetailWrapper>
        <ProjectDetailForm>
          <FormTitle>
            <FormTitleMenu>
              {contents.map((content, index) => {
                return (
                  <div
                    className={`project-title ${
                      content.level === 2 && "semi-menu"
                    } ${
                      (selectIndex === index && !isMenuClicked) ||
                      currentSection === content
                        ? "active"
                        : ""
                    }
                    `}
                    key={index}
                    onClick={() => {
                      setSelectIndex(index);
                      setIsMenuClicked(true);
                      if (contentRefs.current[index].current) {
                        contentRefs.current[index].current.scrollIntoView({
                          behavior: "auto",
                          block: "start",
                        });
                      }
                    }}
                  >
                    {content.title}
                  </div>
                );
              })}
            </FormTitleMenu>
          </FormTitle>
          {(isMatchDetailPage &&
            type === "ROLE_PM" &&
            project.memberId === project.pmId) ||
          (isLandingDetailPage && type === "ROLE_PM") ? (
            /*수정 버튼 클릭 시, title, image, content 가져감*/
            <button
              className="modify-button"
              onClick={() =>
                navigation(
                  isMatchDetailPage
                    ? "/match/modify"
                    : "/myproject/landing/modify",
                  {
                    state: { project: project, mode: "modify" },
                  }
                )
              }
            >
              수정
            </button>
          ) : (
            <></>
          )}
          <FormContent ref={FormContentRef}>
            <div className="project-img">
              {project.profileImageUrl && (
                <img src={project.profileImageUrl} alt="프로젝트디테일" />
              )}
            </div>
            <h1>{project.name}</h1>
            <div className="project-description">
              {contents.map((content, index) => (
                <div
                  className="content-section"
                  key={index}
                  ref={contentRefs.current[index]}
                  style={{
                    bottom:
                      (isLandingDetailPage || isHomeDetailPage) &&
                      contents.length - 1 === index &&
                      0,
                  }}
                >
                  <ReactMarkdown>
                    {content.title &&
                      `${"#".repeat(content.level)} ${content.title}`}
                  </ReactMarkdown>
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
                    {content.content}
                  </ReactMarkdown>
                  {(isLandingDetailPage || isHomeDetailPage) &&
                    contents.length - 1 === index && (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "1.3rem",
                        }}
                      >
                        {project.memberList?.map((member) => {
                          return (
                            <MemberCard
                              key={member.nameNickName}
                              member={member}
                            />
                          );
                        })}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </FormContent>
        </ProjectDetailForm>
      </ProjectDetailWrapper>
    </>
  );
};

export default ProjectDetail;
