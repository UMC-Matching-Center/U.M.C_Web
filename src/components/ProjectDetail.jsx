import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import sample from "../images/sample_project.png";

const DATA = [
  { idx: 0, name: "PM 프로필" },
  { idx: 1, name: "아이디어" },
  { idx: 2, name: "문제점 정의" },
  { idx: 3, name: "기능 소개" },
  { idx: 4, name: "수익 구조" },
  { idx: 5, name: "서비스 기획" },
  { idx: 6, name: "멤버" },
];

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

  > div {
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
  }
`;

const FormContent = styled.div`
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

  > div > .project-title {
    color: #131313;

    font-family: KBO-Dia-Gothic;
    font-size: 2rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    margin-bottom: 1.6rem;
  }

  > div > .project-description {
    color: #131313;

    font-family: KBO-Dia-Gothic;
    font-size: 2rem;
    font-style: normal;
    font-weight: 300;
    line-height: normal;

    margin-bottom: 4.5rem;
  }
`;

const ProjectDetail = () => {
  const navigation = useNavigate();

  const user = { type: "ROLE_PLAN" }; // API 연결 시 변경 예정
  const pathArray = location.pathname.split("/");
  const isMatchDetailPage =
    pathArray.length === 4 &&
    pathArray[1] === "match" &&
    pathArray[2] === "detail";

  const sectionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [selectIndex, setSelectIndex] = useState(0);
  const onMove = (idx) => {
    sectionRefs[idx].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setSelectIndex(idx);
  };

  return (
    <>
      <ProjectDetailWrapper>
        <ProjectDetailForm>
          <FormTitle>
            <FormTitleMenu>
              {DATA.map(({ idx, name }) => {
                return (
                  <div
                    className={`project-title ${
                      selectIndex === idx && "active"
                    }`}
                    key={idx}
                    onClick={() => onMove(idx)}
                  >
                    {name}
                  </div>
                );
              })}
            </FormTitleMenu>
          </FormTitle>
          {isMatchDetailPage && user.type === "ROLE_PLAN" ? (
            <button
              className="modify-button"
              onClick={() => navigation("/match/modify")}
            >
              수정
            </button>
          ) : (
            <></>
          )}
          <FormContent>
            <div className="project-img">
              <img src={sample} alt="프로젝트디테일" />
            </div>
            {DATA.map(({ idx, name }) => {
              return (
                <>
                  <div>
                    <div
                      className="project-title"
                      ref={sectionRefs[idx]}
                      key={idx}
                    >
                      {name}
                    </div>
                    <div className="project-description">
                      The current fire house installed within the building used
                      by South Korea’s agency for managing the industrial zone
                      will move to the newly built three-story building, the
                      official said. To see a young couple loving each other is
                      no wonder: but to see an old couple loving each other is
                      the best sight of all.Some minds seem almost to create
                      themselves, springing up under every disadvantage and
                      working their solitary but irresistible way through a
                      thousand obstacles.
                    </div>
                  </div>
                </>
              );
            })}
          </FormContent>
        </ProjectDetailForm>
      </ProjectDetailWrapper>
    </>
  );
};

export default ProjectDetail;
