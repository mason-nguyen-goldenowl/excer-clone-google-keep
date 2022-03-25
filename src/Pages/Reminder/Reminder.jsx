import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie";
import Masonry from "react-masonry-component";

import Menu from "../../Components/Menu/Menu";
import NoteCard from "../../Components/NoteCard/NoteCard";
import NoteText from "../../Components/NoteText/NoteText";
import SideMenu from "../../Components/SideMenu/SideMenu";
import { getNoteAction } from "../../redux/action/noteAction";

import "./Reminder.scss";

export default function Reminder() {
  const isLogged = Cookies.get("isLogged");
  const refreshToken = Cookies.get("refresh_token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const arrNote = useSelector((state) => state.note.arrNote);

  const renderNoteCard = () => {
    return arrNote?.map((note) => {
      let remindTime = new Date(note.remind).getTime();
      let now = new Date().getTime();
      let remainingTime = remindTime - now;
      if (remainingTime > 0 && !note.archive && !note.deleted) {
        return (
          <div key={note._id}>
            <NoteCard content={note} k />
          </div>
        );
      }
      return null;
    });
  };

  useEffect(() => {
    if (!isLogged || !refreshToken) {
      navigate("/login");
    }
    const action = getNoteAction;
    dispatch(action());
  }, [dispatch, isLogged, navigate, refreshToken]);
  return (
    <div>
      <Menu title="Reminders" />

      <div className="body-content">
        <div className="left">
          <SideMenu active="reminders" />
        </div>
        <div className="right">
          <div className="create-note-wrap">
            <NoteText />
          </div>
          <div className="note__content grid">
            <Masonry className={"my-gallery-class"}>{renderNoteCard()}</Masonry>
          </div>
        </div>
      </div>
    </div>
  );
}
