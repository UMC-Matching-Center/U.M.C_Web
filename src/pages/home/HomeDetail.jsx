import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProjectDetail from "../../components/ProjectDetail";
import { obProjectDetailAPI } from "../../api/index"; // OB 프로젝트 상세 조회

const HomeDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const projectId = location.state?.projectId;
  const [project, setProject] = useState(null);

  useEffect(() => {
    obProjectDetailAPI(projectId).then((response) => {
      if (response.isSuccess) {
        setProject(response.projectData);
      } else {
        navigate(-1);
        alert(response.message);
      }
    });
  }, []);

  return project ? <ProjectDetail project={project} /> : null;
};

export default HomeDetail;
