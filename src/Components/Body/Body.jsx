import React from "react";
import { useSelector } from "react-redux";

import SideMenu from "../SideMenu/SideMenu";
import NoteText from "../NoteText/NoteText";
import NoteCard from "../NoteCard/NoteCard";

import "./Body.scss";

export default function Body() {
  const { arrNote } = useSelector((state) => state.note);

  const renderNoteCard = () => {
    return arrNote.map((note) => {
      return <NoteCard content={note} key={note.id} />;
    });
  };
  return (
    <div className="body-content">
      <div className="left">
        <SideMenu />
      </div>
      <div className="right">
        <div className="editor-wrap">
          <NoteText />
        </div>
        <div className="note-content">{renderNoteCard()}</div>
      </div>
    </div>
  );
}
