import { Suspense, useEffect } from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import { useAppDispatch, useAppSelector } from "./config/store";

import { getUsers } from "./reducers/users.reducer";

function App() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.usersReducer.usersList);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <BrowserRouter>
      {/* {users.length > 0 ? users[0].id : null} */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/users" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
