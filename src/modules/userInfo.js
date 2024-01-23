import { createSlice } from "@reduxjs/toolkit";

// 모듈의 초기 상태
const initialState = {
  userType: "REGISTER",
  userName: "",
  autoLogin: false,
};

// 액션 타입 없이 createSlice를 사용하여 리듀서를 간결하게 작성
const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    // 로그인
    USER_LOGIN: (state, action) => {
      state.userType = action.payload.role;
      state.userName = action.payload.name;
      state.autoLogin = action.payload.autoLogin;
    },
    // 자동 로그인
    USER_AUTO_LOGIN: (state, action) => {
      state.userType = action.payload.role;
      state.userName = action.payload.name;
    },
    // 유저 역할
    USER_TYPE: (state, action) => {
      state.userType = action.payload;
    },
    // 유저 이름
    USER_NAME: (state, action) => {
      state.userName = action.payload;
    },
  },
});

// Export actions and reducer from the slice
export const { USER_LOGIN, USER_AUTO_LOGIN, USER_TYPE, USER_NAME } =
  userInfoSlice.actions;
export default userInfoSlice.reducer;
