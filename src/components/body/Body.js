import React from "react";
import { useSelector } from "react-redux";

import SideMenu from "../sideMenu/SideMenu";
import NoteText from "../noteText/NoteText";
import NoteCard from "../noteCard/NoteCard";

import "./Body.scss";

export default function Body() {
  const { arrNote } = useSelector((state) => state.NoteReducer);

  const renderNoteCard = () => {
    return arrNote.map((note, index) => {
      return <NoteCard content={note} key={index} />;
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
