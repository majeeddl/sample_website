import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { checkAuth } from "./store/actions/auth.action";
import { authSelector } from "./store/selectors/auth.selector";

import Home from "./views/Home";
import Login from "./views/Login";

function App() {
  const _authSelector = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  },[]);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (_authSelector.loggedIn) {
  //     navigate("/");
  //   } else {
  //     navigate("/login");
  //   }
  // }, [_authSelector.loggedIn, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </div>
  );
}

export default App;
