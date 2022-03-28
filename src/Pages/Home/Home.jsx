import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie";
import { Skeleton } from "@chakra-ui/react";
import Masonry from "react-masonry-component";

import { getNoteAction } from "../../redux/action/noteAction";
import { selectNotes } from "../../redux/features/noteSlice";

import Menu from "../../Components/Menu/Menu";
import NoteCard from "../../Components/NoteCard/NoteCard";
import NoteText from "../../Components/NoteText/NoteText";
import SideMenu from "../../Components/SideMenu/SideMenu";

import "./Home.scss";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = Cookies.get("isLogged");
  const refreshToken = Cookies.get("refresh_token");
  const { arrNote, isLoaded } = useSelector(selectNotes);

  let noteSket = { title: "abc", content: "content" };

  const renderNoteCard = () => {
    return arrNote.map((note) => {
      if (!note?.archive && !note?.deleted) {
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
  }, [dispatch, isLogged, navigate, refreshToken]);
  return (
    <div>
      <Menu title="Keep" />

      <div className="body-content">
        <div className="left">
          <SideMenu active="notes" />
        </div>
        <div className="right">
          <div className="create-note-wrap">
            <NoteText />
          </div>
          <div className="note__content grid">
            <Masonry className={"my-gallery-class"}>
              {isLoaded ? (
                renderNoteCard()
              ) : (
                <div className="skeleton-wrap">
                  <Skeleton margin={"5"}>
                    <NoteCard content={noteSket} />
                  </Skeleton>
                  <Skeleton margin={"5"}>
                    <NoteCard content={noteSket} />
                  </Skeleton>
                </div>
              )}
            </Masonry>
          </div>
        </div>
      </div>
    </div>
  );
}
