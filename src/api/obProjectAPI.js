import { publicAxios } from "../utils/customAxios.js";
import errorCode from "./errorCode.js";

export const obProjectListAPI = async (page) => {
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
    projectList: [],
  };

  //서버로 현재 매칭 프로젝트 조회 요청
  try {
    const { data } = await publicAxios.get(`/projects?page=${page}`);
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
      response.projectList = data.result.projectList;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = errorCode(err);
  }

  return response;
};

export const obProjectDetailAPI = async (projectId) => {
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
    projectData: {
      projectId: null,
      name: null,
      profileImageUrl: null,
      introduction: null,
      body: null,
      members: null,
      createAt: null,
    },
  };

  //서버로 현재 매칭 프로젝트 조회 요청
  try {
    const { data } = await publicAxios.get(`/projects/${projectId}`);
    if (data.code === "COMMON200") {
      response.isSuccess = true;
      response.message = data.message;
      response.projectData.projectId = data.result.projectId;
      response.projectData.name = data.result.name;
      response.projectData.profileImageUrl = data.result.image;
      response.projectData.introduction = data.result.introduction;
      response.projectData.body = data.result.body;
      response.projectData.members = data.result.members;
      response.projectData.createAt = data.result.createAt;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = errorCode(err);
    response.projectData = null;
  }

  return response;
};
