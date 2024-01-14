/* ----------------- 액션 타입 ------------------ */
const SIGNUP_COMPLETE = "userInfo/SIGNUP_COMPLETE"; // 회원가입 완료한 직후 상태
const USER_TYPE = "userInfo/USER_TYPE"; // 로그인 상태
// 덕스 패턴에서는 액션 타입을 정의할 때 이와 같이 접두사를 붙임.
// 다른 모듈과 이름이 중복되지 않게 하기 위함.

/* ----------------- 액션 생성 함수 ------------------ */
export const signupCompleteOpen = (modalOpen) => ({
  type: SIGNUP_COMPLETE,
  modalOpen,
});
export const userType = (userType) => ({
  type: USER_TYPE,
  userType,
});

/* ----------------- 모듈의 초기 상태 ------------------ */
const initialState = {
  modalOpen: false,
  userType: "Register",
};

/* ----------------- 리듀서 ------------------ */
export default function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_COMPLETE:
      return {
        ...state,
        modalOpen: action.modalOpen,
      };
    case USER_TYPE:
      return {
        ...state,
        userType: action.userType,
      };
    default:
      return state;
  }
}
