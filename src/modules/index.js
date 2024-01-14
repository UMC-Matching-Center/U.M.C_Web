import { combineReducers } from "redux";
import userInfoReducer from "./userInfo";

const rootReducer = combineReducers({
  userInfo: userInfoReducer,
});

export default rootReducer;
