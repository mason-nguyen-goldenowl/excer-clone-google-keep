import React from "react";
import { useSelector } from "react-redux";

import SideMenu from "../sideMenu/SideMenu";
import NoteText from "../noteText/NoteText";
import NoteCard from "../noteCard/NoteCard";
import "./Body.scss";

export default function Body() {
  const { arrNote } = useSelector((state) => state.NoteReducer);

  const renderNoteCard = () => {
    arrNote.forEach((item, i) => {
      item.id = i + 1;
    });

    return arrNote.map((note) => {
      return <NoteCard content={note} key={note.id} />;
    });
  };
  return (
    <div className="bodyContent">
      <div className="left">
        <SideMenu />
      </div>
      <div className="right">
        <div className="editorWrap">
          <NoteText />
        </div>
        <div className="note__content">{renderNoteCard()}</div>
      </div>
    </div>
  );
}
