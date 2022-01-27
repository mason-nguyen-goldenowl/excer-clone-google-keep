import React from "react";
import { useSelector } from "react-redux";

import Menu from "../../components/menu/Menu";
import NoteCard from "../../components/noteCard/NoteCard";
import NoteText from "../../components/noteText/NoteText";
import SideMenu from "../../components/sideMenu/SideMenu";

import "./Reminder.scss";

export default function Reminder() {
  const { arrRemind } = useSelector((state) => state.NoteReducer);

  const renderNoteCard = () => {
    return arrRemind?.map((note, index) => {
      return <NoteCard content={note} key={index} />;
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
