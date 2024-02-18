import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  position: relative;
  width: 38.4rem;
  height: 38rem;
  border-radius: 1rem;

  background-color: #fafafa;
  overflow: hidden;
  transition: all 0.5s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-0.5rem);
  }
`;

const CardImageFrame = styled.div`
  width: 100%;
  height: 16rem;
  > * {
    width: 100%;
    height: 100%;
  }
  > img {
    object-fit: cover;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 17.5rem;
  padding: 2rem 2rem 2.5rem 2rem;

  font-family: KBO-Dia-Gothic;
  color: #131313;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  > .matchCard-title {
    width: 100%;
    font-weight: 500;
    font-size: 2rem;

    margin-bottom: 1.5rem;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  > .matchCard-info {
    width: 100%;
    font-weight: lighter;
    font-size: 1.8rem;

    margin-bottom: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  > .matchCard-recruit {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    gap: 0.8rem 1rem;
  }
`;

const CardRecruit = styled.div`
  max-width: 18.4rem;
  height: 2.4rem;
  padding: 0.2rem 0.8rem;
  font-size: 1.2rem;
  font-weight: 300;
  line-height: 2.4rem;
  border-radius: 1rem;
  background: ${(props) => props.$background};
  color: ${(props) => props.$color};
`;

const MatchCard = (props) => {
  const handleCardClick = () => {
    props.onClick(props.project);
  };
  return (
    <CardWrapper onClick={handleCardClick}>
      <CardImageFrame>
        {props.project.image ? (
          <img src={props.project.image} alt="projectImg" />
        ) : (
          <div
            style={{
              backgroundColor: "#014171",
            }}
          />
        )}
      </CardImageFrame>
      <CardContent>
        <div className="matchCard-title">{props.project.name}</div>
        <div className="matchCard-info">{props.project.introduction}</div>
        <div className="matchCard-recruit">
          {props.project.recruitments.map((recruit) => (
            <CardRecruit
              key={recruit.id}
              $background={recruit.recruitmentFinished ? "#EEEFF7" : "#CCE6F9"}
              $color={recruit.recruitmentFinished ? "#292D55" : "#014171"}
            >
              {(() => {
                switch (recruit.part) {
                  case "PLAN":
                    return (
                      "Plan " +
                      (!recruit.recruitmentFinished ? "모집 중" : "모집 완료")
                    );
                  case "DESIGN":
                    return (
                      "디자이너 " +
                      (!recruit.recruitmentFinished ? "모집 중" : "모집 완료")
                    );
                  case "WEB":
                    return (
                      "웹 개발자 " +
                      (!recruit.recruitmentFinished ? "모집 중" : "모집 완료")
                    );
                  case "SPRINGBOOT":
                    return (
                      "서버 개발자(Spring boot) " +
                      (!recruit.recruitmentFinished ? "모집 중" : "모집완료")
                    );
                  case "NODEJS":
                    return (
                      "서버 개발자(Node js) " +
                      (!recruit.recruitmentFinished ? "모집 중" : "모집완료")
                    );
                  case "ANDROID":
                    return (
                      "앱 개발자(Android) " +
                      (!recruit.recruitmentFinished ? "모집 중" : "모집완료")
                    );
                  case "IOS":
                    return (
                      "앱 개발자(iOS) " +
                      (!recruit.recruitmentFinished ? "모집 중" : "모집완료")
                    );
                  default:
                    return "";
                }
              })()}
            </CardRecruit>
          ))}
        </div>
      </CardContent>
    </CardWrapper>
  );
};

export default MatchCard;
