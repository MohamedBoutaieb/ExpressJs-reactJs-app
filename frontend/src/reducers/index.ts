import { ReducersMapObject, combineReducers } from "@reduxjs/toolkit";
import { loadingBarReducer as loadingBar } from "react-redux-loading-bar";
import testReducer from "./test.reducer";
import usersReducer from "./users.reducer";
const rootReducer: ReducersMapObject = {
  testReducer,
  usersReducer,
  loadingBar,
};

export default rootReducer;
