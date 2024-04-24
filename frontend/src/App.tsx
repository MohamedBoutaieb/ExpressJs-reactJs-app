import { Suspense } from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import { useAppDispatch } from "./config/store";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useAppDispatch();
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        {/* {users.length > 0 ? users[0].id : null} */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/users" element={<Home />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
