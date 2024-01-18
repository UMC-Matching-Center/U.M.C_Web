import styled from "styled-components";

const DropDownArrow = btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
    <path d="M1 1L5 5L9 1" stroke="#6B6880" stroke-linecap="round"/>
  </svg>`);

const SelectArrow = btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <g clip-path="url(#clip0_1541_5859)">
      <path d="M2.91699 6.99998L5.83366 9.91665L11.667 4.08331" stroke="#0261AA" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_1541_5859">
        <rect width="14" height="14" fill="white"/>
      </clipPath>
    </defs>
  </svg>`);

const SelectBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;
  margin: 0;
  padding: 0 0.5rem;
  background: url("data:image/svg+xml;base64, ${DropDownArrow}") no-repeat right
    0.5rem center/0.8rem 0.6rem;
`;

const SelectOptions = styled.ul`
  z-index: 1;
  box-sizing: border-box;
  position: absolute;
  list-style: none;
  left: 0;
  width: 100%;
  max-height: 11.5rem;
  padding: 0;
  margin: 0.4rem 0 0 0;
  overflow-y: auto; /* 스크롤이 필요한 경우만 보이도록 설정 */
  background-color: #fafafa;
  border-width: 0.5px 1px 1px 1px;
  border-style: solid;
  border-color: #6b6880;
  display: ${(props) => (props.visible === "true" ? "block" : "none")};
`;

const Option = styled.li`
  font-size: 1rem;
  padding: 0.5rem;
  box-sizing: border-box;
  border-bottom: 0.5px solid #6b6880;
  &:last-child {
    // 마지막 옵션은 border-bottom 없애기
    border-bottom: none;
  }
  &:hover,
  &.selected:hover {
    // 마우스 올려뒀을때
    background-color: #e7e6ea;
  }
  &.selected {
    background: url("data:image/svg+xml;base64, ${SelectArrow}") no-repeat right
      0.5rem center;
  }
`;

export { SelectBox, SelectOptions, Option };
