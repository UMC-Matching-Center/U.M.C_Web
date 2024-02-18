import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import OBCard from "../../common/OBCard/OBCard";
import { SignupComplete } from "../../components/modal";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { SIGNUP_COMPLETE } from "../../modules/signupState";
import useIntersect from "../../utils/intersectionObserve";
import { obProjectListAPI } from "../../api/index"; // OB 프로젝트 리스트 조회
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalStyles = {
  overlay: { width: "100vw", background: "rgba(2, 1, 11, 0.5)" },
  content: {
    width: "100rem",
    height: "60rem",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    background: "none",
    border: "none",
  },
};

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  Modal.setAppElement("#root");

  const { signupCompleteModalOpen } = useSelector((state) => state.signupState);
  const setModalOpen = (modalOpen) => dispatch(SIGNUP_COMPLETE(modalOpen));

  const [page, setPage] = useState(0); // 페이지
  const [loading, setLoading] = useState(false); // 로딩
  const [isEnd, setIsEnd] = useState(false); // 끝
  const [projectList, setProjectList] = useState([]); // 프로젝트 리스트

  const handleProjectClick = (project) => {
    navigate(`../project/${project.title}`, {
      state: {
        projectId: project.projectId,
      },
    });
  };

  const [, setRef] = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (!isEnd) {
      setLoading(true);
      const Nextpage = page + 1;
      await obProjectListAPI(Nextpage).then((response) => {
        setPage(Nextpage);
        if (response.isSuccess) {
          if (response.projectList.length > 0) {
            const responseList = response.projectList.map((data) => {
              return {
                projectId: data.projectId,
                title: data.name,
                projectImg: data.image,
                description: data.introduction,
              };
            });
            setProjectList((prev) => [...prev, ...responseList]);
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
          setIsEnd(true);
        }
        setLoading(false);
      });
    }
    observer.observe(entry.target);
  }, {});

  useEffect(() => {
    if (location.state) {
      toast.success(location.state, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <Modal
        isOpen={signupCompleteModalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={ModalStyles}
      >
        <SignupComplete isClose={() => setModalOpen(false)} />
      </Modal>
      <div className="app__main">
        <div className="app__main-projects">
          {projectList.map((project) => {
            return (
              <OBCard
                project={project}
                key={project.projectId}
                onClick={() => handleProjectClick(project)}
              />
            );
          })}
          {loading && <div className="table_title">Loading</div>}
          {!loading && (
            <div ref={setRef} style={{ width: "100%", height: "1px" }} />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
