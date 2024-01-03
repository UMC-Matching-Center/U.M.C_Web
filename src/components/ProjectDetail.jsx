import React, { useRef, useState } from "react";
import styled from "styled-components";
import sample from "../images/sample_project.png";

const DETAIL_NAV = [
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

  margin-top: 5.85rem;
`;
const ProjectDetailForm = styled.div`
  width: 120rem;
  height: 73.2rem;
  background: #fafafa;

  border-radius: 1rem;
`;

const FormTitle = styled.div`
  height: 7.8rem;
  width: 100%;

  border-bottom: 0.03rem solid #010004;
`;
const FormTitleMenu = styled.div`
  display: flex;
  justify-content: center;

  padding: 3rem 0;

  > div {
    margin: 0 2.35rem;

    color: #000;

    font-family: KBO-Dia-Gothic;
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 300;
    line-height: normal;

    border: 0;
    background-color: transparent;
    cursor: pointer;

    &.active {
      box-sizing: border-box;
      border-bottom: 0.6rem solid #e7e6ea;
    }
  }
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;

  width: 70.2rem;
  height: 56.4rem;
  margin: 1.2rem 24.9rem;

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
  // 데이터 받아오기 - 프로젝트 Id(state)를 이용해 DB 데이터(DETAIL_NAV) 조회
  //const { state } = useLocation();

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
    <ProjectDetailWrapper>
      <ProjectDetailForm>
        <FormTitle>
          <FormTitleMenu>
            {DETAIL_NAV.map(({ idx, name }) => {
              return (
                <div
                  className={`project-title ${selectIndex === idx && "active"}`}
                  key={idx}
                  onClick={() => onMove(idx)}
                >
                  {name}
                </div>
              );
            })}
          </FormTitleMenu>
        </FormTitle>
        <FormContent>
          <div className="project-img">
            <img src={sample} alt="프로젝트디테일" />
          </div>
          {DETAIL_NAV.map(({ idx, name }) => {
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
                    The current fire house installed within the building used by
                    South Korea’s agency for managing the industrial zone will
                    move to the newly built three-story building, the official
                    said. To see a young couple loving each other is no wonder:
                    but to see an old couple loving each other is the best sight
                    of all.Some minds seem almost to create themselves,
                    springing up under every disadvantage and working their
                    solitary but irresistible way through a thousand obstacles.
                  </div>
                </div>
              </>
            );
          })}
        </FormContent>
      </ProjectDetailForm>
    </ProjectDetailWrapper>
  );
};

export default ProjectDetail;
