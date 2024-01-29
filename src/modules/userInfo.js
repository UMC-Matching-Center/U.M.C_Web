import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

// 모듈의 초기 상태
const initialState = {
  userType: "REGISTER",
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
      state.autoLogin = action.payload.autoLogin;
    },
    // 자동 로그인
    USER_AUTO_LOGIN: (state, action) => {
      state.userType = action.payload.role;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

// Export actions and reducer from the slice
export const { USER_LOGIN, USER_AUTO_LOGIN } = userInfoSlice.actions;
export default userInfoSlice.reducer;
