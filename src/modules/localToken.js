import { createSlice } from "@reduxjs/toolkit";

// 엑세스 토큰 만료 시간 (1시간)
export const TOKEN_TIME_OUT = 60 * 60 * 1000;

// 모듈의 초기 상태
const initialState = {
  token: "",
  expireTime: null,
};

// 액션 타입 없이 createSlice를 사용하여 리듀서를 간결하게 작성
export const localTokenSlice = createSlice({
  name: "localToken",
  initialState,
  reducers: {
    SET_LOCAL_TOKEN: (state, action) => {
      state.token = action.payload;
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
    },
    DELETE_LOCAL_TOKEN: (state) => {
      state.token = null;
      state.expireTime = null;
    },
  },
});

export const { SET_LOCAL_TOKEN, DELETE_LOCAL_TOKEN } = localTokenSlice.actions;

export default localTokenSlice.reducer;
