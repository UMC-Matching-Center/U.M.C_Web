import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ProjectDetail from "../../components/ProjectDetail";

const DATA = {
  projectId: null,
  pmId: null,
  name: "",
  introduction: "",
  recruitments: [],
  members: [],
  createAt: [],
  image:
    "https://i.pinimg.com/originals/a6/dd/08/a6dd08f46d8c5ed968689300d7b7c55a.jpg",
  body: `주어와 서술어는 호응하지 않고,\n# 하이2 \n 문장은 엿가락처럼 길기만 합니다. 게다가 문맥에 어울리지 않는 한자어를 남발하는 바람에 내용 파악조차 어렵습니다. 서술형 답안을 작성하고, 논술 시험을 대비하는 학생들의 글에서 흔히 발견하는 문제입니다. 앞으로 연재할 글쓰기의 10가지 원칙을 충분히 익힌 뒤 연습문제로 확인하세요. 1회성 연습에 그치지 말고 평소에 글을 읽고 쓸 때도 원칙을 적용해야 합니다. 시간이 없다고요? 매일 보는 교과서를 활용하세요. 공부할 때 글쓰기 원칙에 어긋나는 문장을 발견한다면 원칙에 맞춰 바꿔 써 보세요. 매회 실리는 ‘교과서 ‘옥의 티’’ 꼭지를 참고하면 도움이 될 겁니다. 예문은 초·중등 학생에게 실질적인 도움을 주기 위해 초·중등 대상 신문활용교육(NIE) 매체인 <아하! 한겨레> 누리집(ahahan.co.kr)에 올라온 글 위주로 골랐습니다. \n# 제목`,
};
function LandingPageWrite() {}

function LandingPageView({ type }) {
  return <ProjectDetail project={DATA} type={type} />;
}

export default function LandingPage() {
  const { userType } = useSelector((state) => state.userInfo);
  const mode = "none"; // write, modify, complete
  return (
    <>
      <Routes>
        {userType === "ROLE_PM" && (mode === "write" || mode === "modify") ? (
          <Route path="/write" element={<LandingPageWrite />} />
        ) : (
          <Route path="/" element={<LandingPageView type={userType} />} />
        )}
      </Routes>
    </>
  );
}
