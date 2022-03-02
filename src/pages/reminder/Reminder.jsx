import React from "react";
import { useSelector } from "react-redux";

import Menu from "../../components/menu/Menu";
import NoteCard from "../../components/noteCard/NoteCard";
import NoteText from "../../components/noteText/NoteText";
import SideMenu from "../../components/sideMenu/SideMenu";

import "./Reminder.scss";

export default function Reminder() {
  const { arrRemind } = useSelector((state) => state.note);

  const renderNoteCard = () => {
    return arrRemind?.map((note) => {
      return <NoteCard content={note} key={note.id} />;
    });
  };

  return (
    <div>
      <Menu title="Reminders" />
      <div className="bodyContent">
        <div className="left">
          <SideMenu active="reminders" />
        </div>
        <div className="right">
          <div className="editorWrap">
            <NoteText />
          </div>
          <div className="note__content">{renderNoteCard()}</div>
        </div>
      </div>
    </div>
  );
}
