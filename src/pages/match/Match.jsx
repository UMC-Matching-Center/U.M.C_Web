import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import useGetAccessToken from "../../utils/getAccessToken";
import { matchListAPI } from "../../api";
import styled from "styled-components";
import MatchCard from "../../common/MatchCard/MatchCard";
import MatchDetail from "./MatchDetail";
import MatchWrite from "./MatchWrite";
import { TextAreaProvider } from "../../context/TextAreaProvider";
import useIntersect from "../../utils/intersectionObserve";
import { PMRoute } from "../../routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MatchMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > .button_wrap {
    width: 120rem;
    margin-bottom: 1.4rem;

    > button {
      float: right;
      width: 7rem;
      height: 3.2rem;
      border-radius: 2rem;
      border: 0.2rem solid var(--primary-600, #0261aa);
      background: transperant;
      color: #fffefe;

      font-family: KBO-Dia-Gothic;
      font-size: 1.4rem;
    }
  }
`;

const MatchList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  grid-gap: 7.8rem 2.4rem;
`;

function MatchHome({ type }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useGetAccessToken();
  const { autoLogin } = useSelector((state) => state.userInfo);

  const [data, setData] = useState([]); // 전체 프로젝트 데이터
  const [page, setPage] = useState(0); // 데이터를 불러온 횟수(페이지)

  const [loading, setLoading] = useState(false); // 로딩
  const [isEnd, setIsEnd] = useState(false); // 끝

  /*---프로젝트 카드 클릭 이벤트(이동)---*/
  const handleCardClick = (project) => {
    navigate(`../detail/${project.projectId}`);
  };

  const [, setRef] = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (!isEnd) {
      setLoading(true);
      const Nextpage = page + 1;
      await matchListAPI(accessToken, dispatch, autoLogin, Nextpage).then(
        (response) => {
          setPage(Nextpage);
          if (response.isSuccess) {
            if (response.projectList.length > 0) {
              setData((prev) => [...prev, ...response.projectList]);
            } else {
              setIsEnd(true);
            }
          } else {
            toast.error(response.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
          setLoading(false);
        }
      );
    }
    observer.observe(entry.target);
  }, {});

  return (
    <>
      <ToastContainer />
      <MatchMain>
        {type === "ROLE_PM" && (
          <div className="button_wrap">
            <button
              onClick={() =>
                navigate("../new", { state: { project: null, mode: "new" } })
              }
            >
              Add
            </button>
          </div>
        )}
        <MatchList>
          {data
            .map((project) => {
              return (
                <MatchCard
                  project={project}
                  key={project.projectId}
                  onClick={handleCardClick}
                />
              );
            })
            .reverse()}
          {loading && <div className="table_title">Loading</div>}
          {!loading && (
            <div ref={setRef} style={{ width: "100%", height: "1px" }} />
          )}
        </MatchList>
      </MatchMain>
    </>
  );
}

export default function Match() {
  const { userType } = useSelector((state) => state.userInfo);
  return (
    <TextAreaProvider>
      <Routes>
        <Route path="/" exact element={<MatchHome type={userType} />} />
        <Route path="/detail/*" element={<MatchDetail />} />
        <Route element={<PMRoute />}>
          <Route path="/new" exact element={<MatchWrite />} />
          <Route path="/modify" exact element={<MatchWrite />} />
        </Route>
      </Routes>
    </TextAreaProvider>
  );
}
