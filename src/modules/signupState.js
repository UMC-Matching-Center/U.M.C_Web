import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

// 모듈의 초기 상태
const initialState = {
  signupID: "",
  signupPW: "",
  access: false,
  signupCompleteModalOpen: false,
};

// 액션 타입 없이 createSlice를 사용하여 리듀서를 간결하게 작성
const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    // 회원가입 중일 때 상태
    SINGUP_DURING: (state, action) => {
      state.signupID = action.payload.id;
      state.signupPW = action.payload.pw;
      state.access = action.payload.access;
    },
    // 회원가입 페이지 입장 시 상태 초기화
    SIGNUP_RESET: (state) => {
      state.signupID = "";
      state.signupPW = "";
      state.access = false;
    },
    // 회원가입 완료한 직후 상태
    SIGNUP_COMPLETE: (state, action) => {
      state.signupID = "";
      state.signupPW = "";
      state.signupCompleteModalOpen = action.payload.open;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

// Export actions and reducer from the slice
export const { SINGUP_DURING, SIGNUP_RESET, SIGNUP_COMPLETE } =
  userInfoSlice.actions;
export default userInfoSlice.reducer;
