import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import Menu from "../../components/menu/Menu";
import NoteCard from "../../components/noteCard/NoteCard";
import NoteText from "../../components/noteText/NoteText";
import SideMenu from "../../components/sideMenu/SideMenu";

import "./Reminder.scss";

export default function Reminder() {
  const isLogged = Cookies.get("isLogged");
  const refreshToken = Cookies.get("refresh_token");
  const navigate = useNavigate();
  const arrNote = useSelector((state) => state.note.arrNote);

  const renderNoteCard = () => {
    return arrNote?.map((note) => {
      let remindTime = new Date(note.remind).getTime();
      let now = new Date().getTime();
      let remainingTime = remindTime - now;
      if (remainingTime > 0 && !note.archive && !note.deleted) {
        return <NoteCard content={note} key={note._id} />;
      }
    });
  };

  useEffect(() => {
    if (!isLogged || !refreshToken) {
      navigate("/login");
    }
  }, [isLogged, navigate, refreshToken]);
  return (
    <div>
      <Menu title="Reminders" />

      <div className="body-content">
        <div className="left">
          <SideMenu active="reminders" />
        </div>
        <div className="right">
          <div className="editor-wrap">
            <NoteText />
          </div>
          <div className="note__content">{renderNoteCard()}</div>
        </div>
        <div className="note__content">{renderNoteCard()}</div>
      </div>
    </div>
  );
}
