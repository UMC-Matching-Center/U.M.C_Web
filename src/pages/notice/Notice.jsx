import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import IconNewNotice from "../../images/ic_new_notice.png";
import { IconSearch } from "@tabler/icons-react";

const noticeDummy = [
  {
    id: 1,
    title: "제목이 제목제목",
    content:
      "내용내용 내용내용내용 내 용내용 내용 내용내용 내 용내 용내용내 용내용 내용내용 내용내용 내용내용내용 내 용내용 내용 내용내용 내 용내 용내용내 용내용 내용내용 내용내용내 내용내용내 내용내용내",
    date: "2024년 1월 10일 15:00",
  },
  {
    id: 1,
    title: "공지1",
    content:
      "내용내용 내용내용내용 내 용내용 내용 내용내용 내 용내 용내용내 용내용 내용내용 내용내용 내용내용내용 내 용내용 내용 내용내용 내 용내 용내용내 용내용 내용내용 내용내용내 내용내용내 내용내용내",
    date: "2024년 1월 10일 15:00",
  },
  {
    id: 2,
    title: "제목이 제목제목",
    content:
      "내용내용 내용내용내용 내 용내용 내용 내용내용 내 용내 용내용내 용내용 내용내용 내용내용 내용내용내용 내 용내용 내용 내용내용 내 용내 용내용내 용내용 내용내용 내용내용내 내용내용내",
    date: "2024년 1월 10일 15:00",
  },
  {
    id: 3,
    title: "챌린지",
    content:
      "내용내용 내용내용내용 내 용내용 내용 내용내용 내 용내 용내용내 용내용 내용내용 내용내용 내용내용내용 내 용내용 내용 내용내용 내 용내 용내용내 용내용 내용내용 내용내용내",
    date: "2024년 1월 10일 15:00",
  },
  {
    id: 4,
    title: "제목이 제목제목",
    content:
      "내용내용 내용내용내용 내 용내용 내용 내용내용 내 용내 용내용내 용내용 내용내용 내용내용 내용내용내용 내 용내용 내용 내용내용 내 용내 용내용내 용내용 내용내용 내용내용내",
    date: "2024년 1월 10일 15:00",
  },
  {
    id: 5,
    title: "제목이 제목제목",
    content:
      "내용내용 내용내용내용 내 용내용 내용 내용내용 내 용내 용내용내 용내용 내용내용 내용내용 내용내용내용 내 용내용 내용 내용내용 내 용내 용내용내 용내용 내용내용 내용내용내",
    date: "2024년 1월 10일 15:00",
  },
];

/*---------공지사항 페이지 전체 wrap-----------*/
const NoticeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 120rem;
  margin: 0 auto;
`;

/*---------공지사항 검색과 추가-----------*/
const NoticeSearch = styled.div`
  display: flex;
  width: 120rem;
  margin-bottom: 2.1rem;
  > .notice-searchBar {
    display: flex;
    width: 110.4rem;
    height: 7.8rem;
    background: #fafafa;
    border-radius: 1rem 0 0 0;

    > .searchInput-box {
      margin-right: auto;
      padding: 2.1rem 4.1rem;
      width: 94.4rem;
      > input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: 0;
        outline: 0;
        background: #fafafa;
        height: 3.6rem;
        font-size: 2.4rem;
        font-family: KBO-Dia-Gothic;
        color: #9c9aab;
        width: 100%;

        &::placeholder {
          color: #9c9aab;
        }
      }
    }

    > .searchIcon-box {
      width: 7.8rem;
      height: 100%;
      border-left: 0.1rem solid #cecdd5;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  > .notice-new {
    margin-left: 1.8rem;
    width: 7.8rem;
    height: 7.8rem;
    border-radius: 0 1rem 0 0;
    background: #0261aa;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

/*---------공지사항 리스트-----------*/
const NoticeList = styled.div`
  width: 120rem;
  max-height: 58vh;
  margin-bottom: 2.2rem;
  background: #fafafa;
  border-radius: 0 0 1rem 1rem;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 2rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #9c9aab;
    background-clip: padding-box;
    border: 0.7rem solid #fafafa;
    border-radius: 5rem;
  }

  & .notice-component {
    display: flex;
    flex-direction: column;
    padding: 3.4rem 4.8rem 4.2rem 4.8rem;
    cursor: pointer;

    > .notice-top {
      display: flex;
      margin-bottom: 1.9rem;
      > .notice-title {
        font-size: 2.4rem;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: auto;
      }
      > .notice-date {
        font-size: 1.2rem;
        color: #9c9aab;
        margin-right: 1rem;
        margin-bottom: 0.4rem;
        margin-top: auto;
      }
    }

    > .notice-content {
      font-size: 1.6rem;
      font-weigth: 300;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;
const NoticeBasic = ({ type }) => {
  const navigation = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState(noticeDummy);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  /*------검색창 값에 따른 출력 관련 함수-------*/
  const onClickSearchIcon = () => {
    const filterData = noticeDummy.filter((data) =>
      data.title.includes(searchText)
    );
    setList(filterData);
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      onClickSearchIcon();
    }
  };
  return (
    <>
      <NoticeWrapper>
        <NoticeSearch>
          <div
            className="notice-searchBar"
            style={{
              width: type !== "MANAGER" && "120rem",
              borderRadius: type !== "MANAGER" && "1rem 1rem 0 0",
            }}
          >
            <div className="searchInput-box">
              <input
                placeholder="검색어를 입력해주세요."
                value={searchText}
                onChange={handleSearchChange}
                onKeyPress={handleOnKeyPress}
              />
            </div>
            <div className="searchIcon-box">
              <IconSearch size={36} stroke={1.5} onClick={onClickSearchIcon} />
            </div>
          </div>
          {type === "MANAGER" && (
            <div className="notice-new">
              <img
                src={IconNewNotice}
                alt="newNotice"
                width="36"
                onClick={() => {
                  /*클릭 시, 새 공지 작성 페이지로 이동*/
                  navigation("../new");
                }}
              />
            </div>
          )}
        </NoticeSearch>
        <NoticeList>
          {list.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "3rem",
                fontSize: "2.4rem",
              }}
            >
              검색 결과가 존재하지 않습니다.
            </div>
          ) : (
            list.map((notice) => {
              return (
                <>
                  <div
                    className="notice-component"
                    key={notice.id}
                    onClick={() => {
                      /*클릭시 상세 notice 페이지로 이동*/
                      navigation(`../detail/${notice.title}`, {
                        state: {
                          item: { notice },
                        },
                      });
                    }}
                  >
                    <div className="notice-top">
                      <div className="notice-title">{notice.title}</div>
                      <div className="notice-date">{notice.date}</div>
                    </div>
                    <div className="notice-content">{notice.content}</div>
                  </div>
                  <div
                    style={{
                      width: "113.4rem",
                      height: "0.1rem",
                      background: "#9C9AAB",
                      margin: "0 0 0 3.3rem",
                    }}
                  ></div>
                </>
              );
            })
          )}
        </NoticeList>
      </NoticeWrapper>
    </>
  );
};

function Notice() {
  const user = { type: "MANAGER" };
  return (
    <Routes>
      <Route path="/" exact element={<NoticeBasic type={user.type} />}></Route>
    </Routes>
  );
}
export default Notice;
