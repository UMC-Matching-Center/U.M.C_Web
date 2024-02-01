import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, PURGE, PERSIST } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import sessionStorage from "redux-persist/lib/storage/session"; // sessionStorage

import localTokenReducer from "./localToken";
import sessionTokenReducer from "./sessionToken";
import userInfoReducer from "./userInfo";
import signupStateReducer from "./signupState";

/*-- redux-persist의 persistConfig 설정 --*/
// LocalStorage
const localPersistConfig = {
  key: "local",
  storage: storage,
  whitelist: ["local", "userInfo"],
};

// SessionStorage
const sessionPersistConfig = {
  key: "session",
  storage: sessionStorage,
  whitelist: ["session"],
};

const seesionReducer = combineReducers({
  session: sessionTokenReducer,
});

const rootReducer = combineReducers({
  local: localTokenReducer,
  session: persistReducer(sessionPersistConfig, seesionReducer),
  userInfo: userInfoReducer,
  signupState: signupStateReducer,
});

const persistedReducer = persistReducer(localPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    //미들웨어 작성시 에러 주의
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, PURGE],
      },
    }),
});

export default store;
