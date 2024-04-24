import { ReducersMapObject, combineReducers } from "@reduxjs/toolkit";
import { loadingBarReducer as loadingBar } from "react-redux-loading-bar";
import testReducer from "./test.reducer";
const rootReducer: ReducersMapObject = {
  testReducer,
  loadingBar,
};

export default rootReducer;
