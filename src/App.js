import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Trash from "./Pages/Trash/Trash";
import Signup from "./Pages/Signup/Signup";
import Labels from "./Pages/Labels/Labels";
import Search from "./Pages/Search/Search";
import Archive from "./Pages/Archive/Archive";
import Reminder from "./Pages/Reminder/Reminder";
import Resetpassword from "./Pages/ResetPassword/ResetPassword";

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="trash" element={<Trash />} />
        <Route path="search" element={<Search />} />
        <Route path="archive" element={<Archive />} />
        <Route path="reminder" element={<Reminder />} />
        <Route path="labels/:id" element={<Labels />} />
        <Route path="reset" element={<Resetpassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
