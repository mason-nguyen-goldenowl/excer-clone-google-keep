import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Archive from "./pages/archive/Archive";
import Home from "./pages/home/Home";
import Reminder from "./pages/reminder/Reminder";
import Trash from "./pages/trash/Trash";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reminder" element={<Reminder />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/trash" element={<Trash />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
