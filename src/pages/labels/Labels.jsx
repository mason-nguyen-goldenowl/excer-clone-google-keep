import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Cookies from "js-cookie";

import Menu from "../../components/menu/Menu";
import NoteCard from "../../components/noteCard/NoteCard";
import NoteText from "../../components/noteText/NoteText";
import SideMenu from "../../components/sideMenu/SideMenu";

const Labels = () => {
  const { id } = useParams();
  const isLogged = Cookies.get("isLogged");
  const refreshToken = Cookies.get("refresh_token");
  const navigate = useNavigate();
  const arrNote = useSelector((state) => state.note.arrNote);

  const arrLabel = arrNote.filter((item) => item.label_name === id);

  const renderNoteCard = () => {
    return arrLabel.map((note) => {
      if (!note.deleted && !note.archive) {
        return <NoteCard content={note} key={note.id} />;
      }
    });
  };
  useEffect(() => {
    if (!isLogged || !refreshToken) {
      navigate("/login");
    }
  }, [isLogged, navigate, refreshToken]);
  return (
    <div>
      <Menu title={id} />
      <div className="body-content">
        <div className="left">
          <SideMenu active={id} />
        </div>
        <div className="right">
          <div className="editor-wrap">
            <NoteText label={id} />
          </div>
          <div className="note__content">{renderNoteCard()}</div>
        </div>
      </div>
    </div>
  );
};

export default Labels;
