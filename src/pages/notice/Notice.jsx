import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetAccessToken from "../../utils/getAccessToken";
import { noticeListAPI } from "../../api";
import { AdminRoute } from "../../routes/";

import styled from "styled-components";
import IconNewNotice from "../../images/ic_new_notice.svg";
import { IconSearch } from "@tabler/icons-react";
import { TextAreaProvider } from "../../context/TextAreaProvider";
import NoticeWrite from "./NoticeWrite";
import NoticeDetail from "./NoticeDetail";

/*---------공지사항 페이지 전체 wrap-----------*/
const NoticeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 120rem;
  margin: 0 auto;
  margin-bottom: 2.2rem;
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
        font-weight: 300;
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
  height: 56rem;
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

    font-family: KBO-Dia-Gothic;
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
      font-weight: 300;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;
const NoticeBasic = ({ type }) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useGetAccessToken();
  const { autoLogin } = useSelector((state) => state.userInfo);

  const [searchText, setSearchText] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [list, setList] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  /*------검색창 값에 따른 출력 관련 함수-------*/
  const onClickSearchIcon = () => {
    const filterData = list.filter((data) => data.title.includes(searchText));
    setSearchList(filterData);
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      onClickSearchIcon();
    }
  };

  useEffect(() => {
    if (accessToken !== "") {
      noticeListAPI(accessToken, dispatch, autoLogin).then((response) => {
        if (response.isSuccess) {
          setList(response.noticeList);
          setSearchList(response.noticeList);
        } else {
          alert(response.message);
        }
      });
    }
  }, []);

  return (
    <>
      <NoticeWrapper>
        <NoticeSearch>
          <div
            className="notice-searchBar"
            style={{
              width: type !== "ROLE_ADMIN" && "120rem",
              borderRadius: type !== "ROLE_ADMIN" && "1rem 1rem 0 0",
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
          {type === "ROLE_ADMIN" && (
            <div className="notice-new">
              <img
                src={IconNewNotice}
                alt="newNotice"
                width="36"
                onClick={() => {
                  /*클릭 시, 새 공지 작성 페이지로 이동*/
                  navigation("../new", { state: { mode: "new" } });
                }}
              />
            </div>
          )}
        </NoticeSearch>
        <NoticeList>
          {searchList?.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "8.5rem 3rem",
                fontSize: "1.8rem",
                fontWeight: "300",
              }}
            >
              검색 결과가 존재하지 않습니다.
            </div>
          ) : (
            searchList
              .map((notice) => {
                let content = notice.body;
                const regExp = /[#*_-`]/gi;
                content = content
                  .replace("<u>", "")
                  .replace("</u>", "")
                  .replace(regExp, "");
                return (
                  <>
                    <div
                      className="notice-component"
                      key={notice.noticeId}
                      onClick={() => {
                        /*클릭시 상세 notice 페이지로 이동*/
                        navigation(`../detail/${notice.noticeId}`);
                      }}
                    >
                      <div className="notice-top">
                        <div className="notice-title">{notice.title}</div>
                        <div className="notice-date">
                          {notice.updatedAt[0]}년&nbsp;{notice.updatedAt[1]}
                          월&nbsp;
                          {notice.updatedAt[2]}일&nbsp;{notice.updatedAt[3]}:
                          {notice.updatedAt[4]}
                        </div>
                      </div>
                      <div className="notice-content">{content}</div>
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
              .reverse()
          )}
        </NoticeList>
      </NoticeWrapper>
    </>
  );
};

function Notice() {
  const { userType } = useSelector((state) => state.userInfo);

  return (
    <TextAreaProvider>
      <Routes>
        <Route path="/" exact element={<NoticeBasic type={userType} />} />
        <Route path="/detail/:id" element={<NoticeDetail type={userType} />} />
        <Route element={<AdminRoute />}>
          <Route path="/new" exact element={<NoticeWrite mode="new" />} />
          <Route path="/modify" exact element={<NoticeWrite mode="modify" />} />
        </Route>
      </Routes>
    </TextAreaProvider>
  );
}
export default Notice;
