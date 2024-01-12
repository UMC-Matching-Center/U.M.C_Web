import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Card from "../common/Card/Card";
import styled from "styled-components";
import SignupComplete from "../components/SignupComplete";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { signupCompleteOpen } from "../modules/userInfo";

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
];

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
const SelectBox = styled.div`
  z-index: -1;
  position: relative;
  width: 11rem;
  padding: 0.8rem;
  border-radius: 0.5rem;
  background-color: #ffffff;
  align-self: center;
  cursor: pointer;
  &::before {
    content: "⌵";
    position: absolute;
    top: 0.1rem;
    right: 0.8rem;
    font-size: 2rem;
  }
`;

const Label = styled.label`
  font-size: 1.2rem;
  margin-left: 0.4rem;
  text-align: center;
`;

const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  left: 0;
  width: 11rem;
  padding: 0 0.8rem;
  overflow: hidden;
  height: 12rem;
  max-height: ${(props) => (props.show ? "none" : "0")};
  border-radius: 0.5rem;
  background-color: #fafafa;
  color: #010004;
  font-family: KBO-Dia-Gothic;
  font-size: 1rem;
`;

const Option = styled.li`
  font-size: 1.2rem;
  padding: 0.8rem 1rem;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #fafafa;
  }
`;

const Home = () => {
  /*--- Redux 관련 ---*/
  const { modalOpen } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const setModalOpen = (modalOpen) => dispatch(signupCompleteOpen(modalOpen));

  /*--- n개씩 보기 ---*/
  const [cardCount, setCardCount] = useState(6);
  const [moreCount, setMoreCount] = useState(3);

  const changeViewCount = (count) => {
    setMoreCount(count);
  };

  const handleShowMoreCount = () => {
    setCardCount((prev) => prev + moreCount);
  };

  /*--- 필터 메뉴 ---*/
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [currentValue, setCurrentValue] = useState("3개씩 보기");

  const handleOnChangeOption = (num, content) => {
    setCurrentValue(content);
    num === 3 ? setCardCount(6) : setCardCount(num); //초기에 보여지는 카드 개수 설정
    changeViewCount(num); // 추가적으로 보여지는 카드 개수 설정
  };

  const optionList = [
    { num: 3, content: "3개씩 보기" },
    { num: 15, content: "15개씩 보기" },
    { num: 30, content: "30개씩 보기" },
    { num: 60, content: "60개씩 보기" },
  ];

  /*--- 프로젝트 카드 클릭 후 상세 페이지 이동 ---*/
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
    <div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={ModalStyles}
      >
        <SignupComplete />
      </Modal>
      <div className="app__main">
        <div className="app__main-contents">
          <div className="app__main-filter">
            <div className="app__main-filterWrap">
              <SelectBox
                className="app__main-filter-content"
                onClick={() => setIsShowOptions((prev) => !prev)}
              >
                <Label>{currentValue}</Label>
                <SelectOptions show={isShowOptions}>
                  {optionList.map((option, i) => (
                    <Option
                      onClick={() =>
                        handleOnChangeOption(option.num, option.content)
                      }
                      key={i}
                    >
                      {option.content}
                    </Option>
                  ))}
                </SelectOptions>
              </SelectBox>
            </div>
          </div>
          <div className="app__main-projects">
            {projectsDummy.slice(0, cardCount).map((project, index) => {
              return (
                <Card
                  project={project}
                  key={index}
                  onClick={handleProjectClick}
                />
              );
            })}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
