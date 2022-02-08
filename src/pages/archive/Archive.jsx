import React from "react";
import { useSelector } from "react-redux";

import Menu from "../../components/menu/Menu";
import NoteCard from "../../components/noteCard/NoteCard";


import SideMenu from "../../components/sideMenu/SideMenu";

import "./Archive.scss";

export default function Archive() {

  const { arrArchive } = useSelector((state) => state.note);

  const renderNoteCard = () => {
    return arrArchive?.map((note) => {
      return <NoteCard content={note} key={note.id} />;
    });
  };

  return (
    <div>
      <Menu title="Archive" />
      <div className="body-content">
        <div className="left">
          <SideMenu active="archive" />
        </div>
        <div className="right">
          <div className="note__content">{renderNoteCard()}</div>
        </div>

      </div>
    </div>
  );
}
