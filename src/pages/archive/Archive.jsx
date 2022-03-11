import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import Menu from "../../components/menu/Menu";
import NoteCard from "../../components/noteCard/NoteCard";

import SideMenu from "../../components/sideMenu/SideMenu";

import "./Archive.scss";

export default function Archive() {
  const isLogged = Cookies.get("isLogged");
  const refreshToken = Cookies.get("refresh_token");
  const navigate = useNavigate();
  const arrNote = useSelector((state) => state.note.arrNote);
  const isLogin = useSelector((state) => state.user.isLogin);

  const renderNoteCard = () => {
    return arrNote?.map((note) => {
      if (note.archive && !note?.deleted) {
        return <NoteCard content={note} key={note._id} />;
      }
    });
  };
  useEffect(() => {
    if (!isLogged || !refreshToken) {
      navigate("/login");
    }
  }, [isLogged, isLogin, navigate, refreshToken]);
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
