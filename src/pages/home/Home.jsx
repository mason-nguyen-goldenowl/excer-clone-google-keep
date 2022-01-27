import React from "react";
import { useSelector } from "react-redux";

import Menu from "../../components/menu/Menu";
import NoteCard from "../../components/noteCard/NoteCard";
import NoteText from "../../components/noteText/NoteText";
import SideMenu from "../../components/sideMenu/SideMenu";

import "./Home.scss";

export default function Home() {
  const { arrNote } = useSelector((state) => state.NoteReducer);

  const renderNoteCard = () => {
    return arrNote.map((note, index) => {
      return <NoteCard content={note} key={index} />;
    });
  };

  return (
    <div>
      <Menu title="Keep" />
      <div className="bodyContent">
        <div className="left">
          <SideMenu active="notes" />
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