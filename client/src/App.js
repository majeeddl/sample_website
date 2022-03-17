import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./views/Home";
import Login from "./views/Login";

function App() {
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
