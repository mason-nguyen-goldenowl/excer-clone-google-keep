import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Trash from "./pages/trash/Trash";
import Signup from "./pages/signup/Signup";
import Labels from "./pages/labels/Labels";
import Search from "./pages/search/Search";
import Archive from "./pages/archive/Archive";
import Reminder from "./pages/reminder/Reminder";
import Resetpassword from "./pages/resetPassword/ResetPassword";

import "./App.scss";

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
