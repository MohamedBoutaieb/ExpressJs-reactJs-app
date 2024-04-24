import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import getStore from "./config/store.ts";
import { Provider } from "react-redux";
import axiosInterceptor from "./config/axios-interceptor.ts";
import 'react-toastify/dist/ReactToastify.css'

const store = getStore();
axiosInterceptor();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
