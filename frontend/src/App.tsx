import { Suspense } from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import { useAppDispatch, useAppSelector } from "./config/store";
import { getPosts } from "./reducers/test.reducer";

function App() {
  const dispatch = useAppDispatch();
  const title = useAppSelector((state) => state.testReducer.testMessage);
  dispatch(getPosts());
  return (
    <BrowserRouter>
        {title}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/users" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
