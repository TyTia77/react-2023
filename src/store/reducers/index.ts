import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import page2Reducer from "./pages/page2";

export * from "./counter";
export * from "./pages/page2";

export default combineReducers({
  counter: counterReducer,
  page2: page2Reducer,
});
