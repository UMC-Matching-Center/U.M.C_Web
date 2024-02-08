import styled from "styled-components";

const DropDownArrow = btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
    <path d="M1 1L5 5L9 1" stroke="#010004" stroke-linecap="round"/>
  </svg>`);

const DropUpArrow = btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
      <path d="M9 5L5 1L1 5" stroke="#010004" stroke-linecap="round"/>
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
  height: 3.6rem;
  cursor: pointer;
  margin: 0;
  padding: 1rem 1.5rem;
  color: #010004;
  border-radius: 0.5rem;
  border: 1px solid #014171;
  background: ${(props) =>
    props.$show
      ? `url("data:image/svg+xml;base64, ${DropUpArrow}") no-repeat right 1.6rem center/1rem 1rem, white;`
      : `url("data:image/svg+xml;base64, ${DropDownArrow}") no-repeat right 1.6rem center/1rem 1rem, white;`};

  color: #010004;
  font-family: "KBO-Dia-Gothic";
  font-size: 1.2rem;
  font-weight: 300;
`;

const SelectOptions = styled.ul`
  z-index: 1;
  box-sizing: border-box;
  position: absolute;
  list-style: none;
  left: 0;
  width: 100%;
  padding: 0;
  border-radius: 0.5rem;
  margin: 0.9rem 0 0 0;
  background-color: #fafafa;
  border: 1px solid #014171;
  display: ${(props) => (props.$visible ? "block" : "none")};
`;

const Option = styled.li`
  font-size: 1rem;
  padding: 1rem 1.5rem;
  height: 3.6rem;
  box-sizing: border-box;
  border-bottom: 0.5px solid #6b6880;
  background-color: white;

  color: #010004;
  font-family: "KBO-Dia-Gothic";
  font-size: 1.2rem;
  font-weight: 300;

  &:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
  }
  &:last-child {
    // 마지막 옵션은 border-bottom 없애기
    border-bottom: none;
    border-radius: 0 0 0.5rem 0.5rem;
  }
  &:hover,
  &.selected:hover {
    // 마우스 올려뒀을때
    background-color: #e7e6ea;
  }
  &.selected {
    background: ${`url("data:image/svg+xml;base64, ${SelectArrow}") no-repeat right 1.3rem center, white`};
  }
`;

export { SelectBox, SelectOptions, Option };
