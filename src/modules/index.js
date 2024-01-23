import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

import accessTokenReducer from "./accessToken";
import userInfoReducer from "./userInfo";
import signupStateReducer from "./signupState";

// redux-persist의 persistConfig 설정
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["accessToken", "userInfo"],
};

const rootReducer = combineReducers({
  accessToken: accessTokenReducer,
  userInfo: userInfoReducer,
  signupState: signupStateReducer,
});

export default persistReducer(persistConfig, rootReducer);
