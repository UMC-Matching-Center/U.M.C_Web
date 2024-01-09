import React, { useState } from "react";
import styled from "styled-components";
import { IconPhotoPlus, IconPencil } from "@tabler/icons-react";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-width: 120rem;
  height: 58.8rem;

  margin-top: 7.1rem;
`;

const ProfileBoxWrapper = styled.div`
  position: relative;
  width: 56.5rem;
  height: 19rem;

  margin-bottom: 4rem;

  > .profile_circle-bg {
    z-index: 1;
    position: absolute;
    left: 23.25rem;
    width: 10rem;
    height: 10rem;
    border-radius: 5rem;
    background-color: #fafafa;

    display: flex;
    justify-content: center;
    align-items: center;
    > .profile_circle {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 9rem;
      height: 9rem;
      border-radius: 5rem;
      background-color: #014171;
    }
  }
`;

const ProfileBox = styled.div`
  position: absolute;
  width: 56.5rem;
  height: 14rem;
  background-color: #fafafa;
  border-radius: 1rem;
  bottom: 0;
  > svg {
    float: right;
    margin: 1.6rem 1.6rem 0 0;
  }
`;

const ProfileBoxContent = styled.div`
  display: flex;
  flex-direction: column;

  margin: 7rem auto 2.9rem auto;
  text-align: center;
  font-family: KBO-Dia-Gothic;
  color: #6b6880;

  > .profile-name {
    font-size: 1.4rem;
    font-weight: 300;
    margin-bottom: 1.1rem;
  }
  > .profile-email {
    font-size: 1.2rem;
    font-weight: 300;
  }
`;
const InfoBox = styled.div`
  position: relative;
  width: 56.5rem;
  height: 35.8rem;
  background-color: #fafafa;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BoxForm = styled.div`
  width: 28.8rem;
  height: 22rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #6b6880;
  font-family: KBO-Dia-Gothic;
  font-size: 1.2rem;
  font-weight: 300;
`;
const FormArea = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.bottom && props.bottom};
  & * {
    display: inline;
    color: #6b6880;
    font-family: KBO-Dia-Gothic;
    font-size: 1.2rem;
    font-weight: 300;
  }
`;

const MyPageInput = styled.input`
  outline: none;
  border: none;
  width: 20rem;
  border-bottom: 0.1rem solid #6b6880;
  background: transparent;
`;

{
  /*드롭박스 커스텀*/
}
const SelectBox = styled.div`
  z-index: 1;
  position: relative;
  min-width: 20rem;
  border-bottom: 0.1rem solid #6b6880;
  align-self: center;
  cursor: pointer;
  &::before {
    content: ${(props) =>
      props.show
        ? `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-up" width="15" height="15" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 15l6 -6l6 6" /></svg>')`
        : `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-down" width="15" height="15" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg>')`};
    position: absolute;
    top: 0;
    right: 0;
  }
`;
const Label = styled.label`
  font-size: 1.2rem;
  text-align: center;
`;
const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  left: 0;
  top: 1rem;
  width: 20rem;
  height: 10rem;
  padding: 0;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.6rem;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%;
    border-radius: 5rem;
    background-color: #9c9aab;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  max-height: ${(props) => (props.show ? "none" : "0")};
  background-color: #fafafa;

  color: #010004;
  font-family: KBO-Dia-Gothic;

  display: flex;
  flex-direction: column;
`;
const Option = styled.li`
  font-size: 1rem;
  padding: 0.8rem 0.3rem;
`;

//학교 option들 정의
const OfficeOptionsDummy = [
  { value: "GACI", name: "GACI 지부" },
  { value: "KSSS", name: "KSSS 지부" },
  { value: "W", name: "W 지부" },
  { value: "NEPTUNE", name: "NEPTUNE 지부" },
  { value: "SQUARE", name: "SQUARE 지부" },
  { value: "CHEMI", name: "CHEMI 지부" },
];

const MyPage = () => {
  const [phoneNumber] = useState("010-1234-5678"); // 대표전화 입력 값
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [office, setOffice] = useState("GACI 지부");

  const handleOnChangeOption = (name) => {
    setOffice(name);
  };

  return (
    <Container>
      <BoxWrapper>
        <ProfileBoxWrapper>
          <div className="profile_circle-bg">
            <div className="profile_circle">
              <IconPhotoPlus size={36} strokeWidth={1} color={"#E7E6EA"} />
            </div>
          </div>
          <ProfileBox>
            <IconPencil
              size={20}
              strokeWidth={1}
              color={"#6B6880"}
              onClick={() => {
                /*연필 아이콘 클릭 시 수정 화면이동*/
              }}
            />
            <ProfileBoxContent>
              <div className="profile-name">가천대학교</div>
              <div className="profile-email">gachonumc@gmail.com</div>
            </ProfileBoxContent>
          </ProfileBox>
        </ProfileBoxWrapper>
        <InfoBox>
          <BoxForm>
            <FormArea bottom="3.2rem">
              <div className="form-label" style={{ marginRight: "3.7rem" }}>
                대표 번호
              </div>
              <MyPageInput value={phoneNumber} disabled />
            </FormArea>
            <FormArea bottom="3.2rem">
              <div className="form-label" style={{ marginRight: "3.7rem" }}>
                지부 선택
              </div>
              <SelectBox
                className="app__main-filter-content"
                onClick={() => setIsShowOptions(false)}
                show={isShowOptions}
              >
                <Label>{office}</Label>
                <SelectOptions show={isShowOptions}>
                  {OfficeOptionsDummy.map((option, i) => (
                    <Option
                      onClick={() => handleOnChangeOption(option.name)}
                      key={i}
                    >
                      {option.name}
                    </Option>
                  ))}
                </SelectOptions>
              </SelectBox>
            </FormArea>
          </BoxForm>
        </InfoBox>
      </BoxWrapper>
    </Container>
  );
};

export default MyPage;
