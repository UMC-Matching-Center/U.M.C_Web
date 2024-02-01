import React, { useEffect } from "react";
import ProjectDetail from "../components/ProjectDetail";
import { useParams } from "react-router-dom";

const DATA = {
  idx: 0,
  name: "프로젝트이름",
  image: "string",
  introduction: "string",
  body: "string",
  recruitments: [
    {
      id: 0,
      part: "DESIGN",
      recruitmentFinished: true,
    },
    {
      id: 1,
      part: "WEB",
      recruitmentFinished: false,
    },
  ],
};

const HomeDetail = () => {
  const { id } = useParams();

  useEffect(() => {
    /*API: 프로젝트 id값 통해 해당 프로젝트 데이터(DATA) 받아오기*/
    console.log(id);
  }, []);

  return <ProjectDetail project={DATA} />;
};

export default HomeDetail;
