import React from "react";
import { useSelector } from "react-redux";

import Menu from "../../components/menu/Menu";
import NoteCard from "../../components/noteCard/NoteCard";
import NoteText from "../../components/noteText/NoteText";
import SideMenu from "../../components/sideMenu/SideMenu";

import "./Home.scss";

export default function Home() {
  const { arrNote } = useSelector((state) => state.note);

  const renderNoteCard = () => {
    return arrNote.map((note) => {
      return <NoteCard content={note} key={note.id} />;
    });
  };

  return (
    <div>
      <Menu title="Keep" />
      <div className="body-content">
        <div className="left">
          <SideMenu active="notes" />
        </div>
        <div className="right">
          <div className="editor-wrap">
            <NoteText />
          </div>
          <div className="note__content">{renderNoteCard()}</div>
        </div>
      </div>
    </div>
  );
}
