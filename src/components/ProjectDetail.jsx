import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import styled from "styled-components";
import sample from "../images/sample_project.png";

const markdownContent = `

# header1

<center>첫번째</center>

- 히
  - 히

한국에서 대학 교수를 하던 ‘그(창대)’는 글을 쓰기 위해 몽골로 가 아파트를 임대한다. 집주인인 바트 씨 부부는 빌려줄 방을 가리키며 전형적인 러시아 아파트라고 소개한다. 가장 북쪽에 와 있다는 생각을 한 ‘그’는 시원(始原)이라는 어감과 비슷하게 이곳을 시베리아의 방이라고 불러야겠다고 다짐한다. 아파트 바로 앞엔 화력발전소가 세워져 있어 그곳에서 연료로 때는 유연탄 연기가 자욱하다. ‘그’는 바트 씨 부부에게 계약을 하겠다고 말하자 바트는 월 백오십을 부르지만 그의 아내 돌마가 백팔십을 자르듯이 말한다. 부부는 아파트에서 지켜야 할 사항을 말하고 돌아서는데, 특히 낯선 사람의 방문 시에 절대 문을 열어주지 말 것을 강조한다. 그들이 돌아가고 창대는 필요한 물건의 목록을 정리하고 식사를 끝낸 후 바쁜 시간을 핑계 대며 정작 시쓰기에 게을리했던 자기 자신을 돌아본다. 창대는 창밖을 내다보며 발전소 앞에서 일하고 있는 사람들을 관찰한다. 인부들과 몽골의 군인들이 같이 일하고 있었다. 1970년대의 한국과 같은 풍경 속을 걸으며 그는 아파트 주변을 돌아다닌다. 그러면서 늘 수중에 열쇠가 있는지를 확인한다. 디지털 도어록을 한국의 집에 설치하기 전에 열쇠를 잃어버려 기술자를 부르곤 했던 과거를 떠올리면서 그는 재래시장으로 들어선다. 그가 시장에서 망원경을 하나 구입하고 얼마 지나지 않아 알아채지도 못할 만큼 빠르게 소매치기를 당해 열쇠와 달러 몇 장을 제외한 모든 물건을 털리고 만다. 주머니 재봉선 아래에 난 기다란 칼자국을 보고 절망하던 창대는 법이 소용 없는 이곳을 한탄하며 집으로 돌아와 침대에 눕는다. 

## header2

<center>두번째</center>
<황진이>는 작가가 직접 황진이에게 독백을 하는 것으로 시작된다. 그대의 목에는 뱀이 있으며, 이웃집 머슴녀석이 그대를 연모하다 죽어 뱀이 되어 목을 감으며 그대의 잠자리로 가 뜨거운 욕정을 나누었다는 아름다운 문장이다. 그 뱀은 벌거벗은 황진이의 몸을 타고 흘러가고 있는데, 어찌하여 그토록 익숙하게 몸을 내주었느냐며 작가가 독백한다. 그리고 황진이가 산다는 송도로 한 나그네가 찾아든다. 송도는 지나는 골목마다 주막이 그득하고, 객들은 대부분 이곳에서 노잣돈 다 털리고서 고향으로 돌아간다는 소문으로 유명했다. 나그네는 한 주막에 들러 진달래술을 얻어먹으며 황진이의 거처를 묻는데, 한양에서 왔다는 말에 주모는 술상을 차려와 나그네를 대접한다. 황진이의 집을 알게 된 나그네는 떠나려 하자, 술값을 내야 한다는 주모의 말에 껄껄 웃으며 엽전을 건네고 주모가 알려준 집 대문 앞에 서서 호기 있게 “이리 오너라!”를 외친다. 얼마 후 집 안의 여종이 나와 문을 열어주며 주인이 안 계시고 주인마님은 잠에 드셨다고 알리는데, 나그네는 하룻밤을 묵어가겠으니

## header22

<center>세번째</center>
황진이는 달빛 사이로 삿갓집 정자에 앉아 피리를 부는 사내를 발견하고 금세 누구인지를 알아낸다. 언제부터인가 들려온 피리의 음률 하나하나가 비늘이 되어 자신에게 다가왔다는 생각을 하며 그녀는 종 애월이를 불러 피리를 부는 나그네가 누구인지를 묻고, 그의 행색이 남루하였다는 대답을 듣자 빙긋 웃으며 조용히 술상을 봐 올리라고 말한다. 저런 피리를 불 줄 아는 사람은 조선에서 오직 한 사람이며, 피리 그치기를 기다려 찾아뵈어 자신이 술을 권하겠다고 말하라 이른다. 계집종은 물러가다 문득 생각난 듯이, 밤이 샐 때까지 피리소리가 이어지면 어찌 하느냐고 묻자, 황진이는 매화꽃 한 송이를 뜯어 꿈속에서 비늘 날리듯 입김으로 불어 날린다. 계집종을 쳐다보다가 문득 한숨처럼 대답한다. “내가 가야금을 뜯기 시작하면 필히 저 피리 소리는 그칠 것이니, 그때를 봐서 내 뜻을 이르도록 해라”라며 나직이 말한다. 
# header11

<center>네번째</center>
한국에서 대학 교수를 하던 ‘그(창대)’는 글을 쓰기 위해 몽골로 가 아파트를 임대한다. 집주인인 바트 씨 부부는 빌려줄 방을 가리키며 전형적인 러시아 아파트라고 소개한다. 가장 북쪽에 와 있다는 생각을 한 ‘그’는 시원(始原)이라는 어감과 비슷하게 이곳을 시베리아의 방이라고 불러야겠다고 다짐한다. 아파트 바로 앞엔 화력발전소가 세워져 있어 그곳에서 연료로 때는 유연탄 연기가 자욱하다. ‘그’는 바트 씨 부부에게 계약을 하겠다고 말하자 바트는 월 백오십을 부르지만 그의 아내 돌마가 백팔십을 자르듯이 말한다. 부부는 아파트에서 지켜야 할 사항을 말하고 돌아서는데, 특히 낯선 사람의 방문 시에 절대 문을 열어주지 말 것을 강조한다. 그들이 돌아가고 창대는 필요한 물건의 목록을 정리하고 식사를 끝낸 후 바쁜 시간을 핑계 대며 정작 시쓰기에 게을리했던 자기 자신을 돌아본다. 창대는 창밖을 내다보며 발전소 앞에서 일하고 있는 사람들을 관찰한다. 인부들과 몽골의 군인들이 같이 일하고 있었다. 1970년대의 한국과 같은 풍경 속을 걸으며 그는 아파트 주변을 돌아다닌다. 그러면서 늘 수중에 열쇠가 있는지를 확인한다. 디지털 도어록을 한국의 집에 설치하기 전에 열쇠를 잃어버려 기술자를 부르곤 했던 과거를 떠올리면서 그는 재래시장으로 들어선다. 그가 시장에서 망원경을 하나 구입하고 얼마 지나지 않아 알아채지도 못할 만큼 빠르게 소매치기를 당해 열쇠와 달러 몇 장을 제외한 모든 물건을 털리고 만다. 주머니 재봉선 아래에 난 기다란 칼자국을 보고 절망하던 창대는 법이 소용 없는 이곳을 한탄하며 집으로 돌아와 침대에 눕는다. 
`;

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
  justify-content: center;

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

  width: 70.2rem;
  max-height: 64.7rem;
  margin-left: 6.5rem;
  margin-right: 24.9rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  > .project-img {
    display: flex;
    justify-content: center;
    margin-bottom: 4.7rem;
  }

  > .project-description {
    position: relative;
    height: 44rem;
    color: #131313;

    font-family: KBO-Dia-Gothic;
    font-size: 2rem;
    font-style: normal;
    font-weight: 300;
    line-height: normal;

    margin-bottom: 4.5rem;

    > .content-section {
      position: absolute;
      left: 0;
    }
  }
`;

const ProjectDetail = () => {
  const navigation = useNavigate();
  const user = { type: "ROLE_PLAN" }; // API 연결 시 - useSelector

  // 매칭 프로젝트 상세 페이지 url 여부(/match/detail/id)
  const pathArray = location.pathname.split("/");
  const isMatchDetailPage =
    pathArray.length === 4 &&
    pathArray[1] === "match" &&
    pathArray[2] === "detail";

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
      const contentRegex = /^(#+)\s*([^\n]+)?(?:\n|\r\n?)([^#]*)/gm;
      const matches = [];
      let match;

      while ((match = contentRegex.exec(markdownContent)) !== null) {
        const [, prefix, title, content] = match;
        if (prefix && (title || content)) {
          matches.push({
            level: prefix.length,
            title: title ? title.trim() : null,
            content: content ? content.trim() : null,
          });
        }
      }
      return matches;
    };

    const extractedContents = extractContents(); // 헤더(level,title,content) 추출
    setContents(extractedContents); // content-section 데이터로써 content 변수에 extractedContents 저장
    contentRefs.current = extractedContents.map(() => React.createRef()); // extractedContents 대응하는 Ref 변수 : (for. 각 offsetTop)
  }, [markdownContent]);

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
          {isMatchDetailPage && user.type === "ROLE_PLAN" ? (
            /*수정 버튼 클릭 시, title, image, content 가져감*/
            <button
              className="modify-button"
              onClick={() => navigation("/match/modify")}
            >
              수정
            </button>
          ) : (
            <></>
          )}
          <FormContent ref={FormContentRef}>
            <div className="project-img">
              <img src={sample} alt="프로젝트디테일" />
            </div>
            <div className="project-description">
              {contents.map((content, index) => (
                <div
                  className="content-section"
                  key={index}
                  ref={contentRefs.current[index]}
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
