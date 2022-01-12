import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Menu from "../../components/menu/Menu";
import NoteCard from "../../components/noteCard/NoteCard";
import NoteText from "../../components/noteText/NoteText";
import SideMenu from "../../components/sideMenu/SideMenu";

const Labels = () => {
  const { id } = useParams();

  const { arrNote } = useSelector((state) => state.note);
  const arrLabel = arrNote.filter((item) => item.label === id);
  const renderNoteCard = () => {
    return arrLabel.map((note, index) => {
      return <NoteCard content={note} key={index} />;
    });
  };

  return (
    <div>
      <Menu title={id} />
      <div className="bodyContent">
        <div className="left">
          <SideMenu active={id} />
        </div>
        <div className="right">
          <div className="editorWrap">
            <NoteText label={id} />
          </div>
          <div className="note__content">{renderNoteCard()}</div>
        </div>
      </div>
    </div>
  );
};

export default Labels;
