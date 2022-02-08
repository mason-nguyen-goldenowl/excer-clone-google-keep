import { BrowserRouter, Routes, Route } from "react-router-dom";


import Archive from "./pages/archive/Archive";
import Home from "./pages/home/Home";
import Labels from "./pages/labels/Labels";
import Reminder from "./pages/reminder/Reminder";
import Search from "./pages/search/Search";
import Trash from "./pages/trash/Trash";


import "./App.scss";
import Archive from "./pages/archive/Archive";
import Home from "./pages/home/Home";
import Reminder from "./pages/reminder/Reminder";
import Trash from "./pages/trash/Trash";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="reminder" element={<Reminder />} />
        <Route path="archive" element={<Archive />} />
        <Route path="trash" element={<Trash />} />
        <Route path="search" element={<Search />} />
        <Route path="labels/:id" element={<Labels />} />
        <Route path="/" element={<Home />} />
        <Route path="/reminder" element={<Reminder />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/trash" element={<Trash />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
