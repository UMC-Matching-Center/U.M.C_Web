import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../common/Card/Card";
import "./Home.css";

const projectsDummy = [
  {
    id: 1,
    title: "프로젝트 이름",
    description: "설명",
    imageUrl: "../../images/sample_project.png",
  },
  {
    id: 2,
    title: "토스, 새로운 차원의 금융",
    description: "쉽고 편리한 금융을 넘어 모두의 평등한 금융 경험을 위해",
    imageUrl: "../../images/sample_project.png",
  },
  {
    id: 3,
    title: "네이버",
    description: `새로워진 네이버 앱 참, 쓸데 있는 즐거움.`,
    imageUrl: "../../images/sample_project.png",
  },
  {
    id: 4,
    title: "프로젝트 이름",
    description: "설명",
    imageUrl: "../../images/sample_project.png",
  },
  {
    id: 5,
    title: "프로젝트 이름",
    description: "설명",
    imageUrl: "../../images/sample_project.png",
  },
  {
    id: 6,
    title: "프로젝트 이름",
    description: "설명",
    imageUrl: "../../images/sample_project.png",
  },
  {
    id: 7,
    title: "프로젝트 이름",
    description: "설명",
    imageUrl: "../../images/sample_project.png",
  },
  {
    id: 8,
    title: "프로젝트 이름",
    description: "설명",
    imageUrl: "../../images/sample_project.png",
  },
  {
    id: 9,
    title: "프로젝트 이름",
    description: "설명",
    imageUrl: "../../images/sample_project.png",
  },
  {
    id: 10,
    title: "프로젝트 이름",
    description: "설명",
    imageUrl: "../../images/sample_project.png",
  },
  {
    id: 11,
    title: "프로젝트 이름",
    description: "설명",
    imageUrl: "../../images/sample_project.png",
  },
  {
    id: 12,
    title: "프로젝트 이름",
    description: "설명",
    imageUrl: "../../images/sample_project.png",
  },
  {
    id: 13,
    title: "프로젝트 이름",
    description: "설명",
    imageUrl: "../../images/sample_project.png",
  },
  {
    id: 14,
    title: "프로젝트 이름",
    description: "설명",
    imageUrl: "../../images/sample_project.png",
  },
  {
    id: 15,
    title: "프로젝트 이름",
    description: "설명",
    imageUrl: "../../images/sample_project.png",
  },
  {
    id: 16,
    title: "프로젝트 이름",
    description: "설명",
    imageUrl: "../../images/sample_project.png",
  },
  {
    id: 17,
    title: "프로젝트 이름",
    description: "설명",
    imageUrl: "../../images/sample_project.png",
  },
];

const Home = () => {
  const [cardCount, setCardCount] = useState(15);

  const handleShowMoreCount = () => {
    setCardCount((prev) => prev + 15);
  };

  /*프로젝트 카드 클릭 후 상세 페이지 이동*/
  const navigate = useNavigate();

  const handleProjectClick = (project) => {
    navigate(`../project/${project.title}`, {
      state: {
        item: { project },
      },
    });
  };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      handleShowMoreCount();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="app__main">
      <div className="app__main-projects">
        {projectsDummy.slice(0, cardCount).map((project, index) => {
          return (
            <Card project={project} key={index} onClick={handleProjectClick} />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
