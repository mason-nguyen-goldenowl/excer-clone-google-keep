import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import Masonry from "react-masonry-component";

import Menu from "../../components/menu/Menu";
import NoteCard from "../../components/noteCard/NoteCard";
import SideMenu from "../../components/sideMenu/SideMenu";

import { getNoteAction } from "../../redux/action/NoteAction";
import "./Archive.scss";

export default function Archive() {
  const isLogged = Cookies.get("isLogged");
  const refreshToken = Cookies.get("refresh_token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const arrNote = useSelector((state) => state.note.arrNote);
  const isLogin = useSelector((state) => state.user.isLogin);

  const renderNoteCard = () => {
    return arrNote?.map((note) => {
      if (note.archive && !note?.deleted) {
        return (
          <div key={note._id}>
            <NoteCard content={note} />
          </div>
        );
      }
    });
  };
  useEffect(() => {
    if (!isLogged || !refreshToken) {
      navigate("/login");
    }
    const action = getNoteAction;
    dispatch(action());
  }, [dispatch, isLogged, isLogin, navigate, refreshToken]);
  return (
    <div>
      <Menu title="Archive" />
      <div className="body-content">
        <div className="left">
          <SideMenu active="archive" />
        </div>
        <div className="right">
          <div className="note__content">
            <Masonry className={"my-gallery-class"}>{renderNoteCard()}</Masonry>
          </div>
        </div>
      </div>
    </div>
  );
}
