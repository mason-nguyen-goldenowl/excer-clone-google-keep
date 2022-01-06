import React from "react";
import "./Body.scss";
import SideMenu from "../sideMenu/SideMenu";
import NoteText from "../noteText/NoteText";
import NoteCard from "../noteCard/NoteCard";
import { useSelector } from "react-redux";

export default function Body() {
  const { arrNote } = useSelector((state) => state.NoteReducer);

  const renderNoteCard = () => {
    return arrNote.map((note, index) => {
      return <NoteCard content={note} key={index} />;
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
