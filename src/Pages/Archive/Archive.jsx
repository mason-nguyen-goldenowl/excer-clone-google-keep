import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie";
import Masonry from "react-masonry-component";

import Menu from "../../Components/Menu/Menu";
import NoteCard from "../../Components/NoteCard/NoteCard";
import SideMenu from "../../Components/SideMenu/SideMenu";
import { getNoteAction } from "../../redux/action/noteAction";

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
      return null;
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
