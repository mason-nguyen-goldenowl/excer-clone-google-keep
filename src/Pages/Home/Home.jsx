import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie";
import { Skeleton } from "@chakra-ui/react";
import Masonry from "react-masonry-component";

import { getNoteAction } from "../../redux/action/noteAction";

import Menu from "../../Components/Menu/Menu";
import NoteCard from "../../Components/NoteCard/NoteCard";
import NoteText from "../../Components/NoteText/NoteText";
import SideMenu from "../../Components/SideMenu/SideMenu";

import "./Home.scss";
import { serviceWorker } from "../../service-worker";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = Cookies.get("isLogged");
  const refreshToken = Cookies.get("refresh_token");
  const arrNote = useSelector((state) => state.note.arrNote);
  const [isLoaded, setIsLoaded] = useState(false);

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
      return null;
    });
  };

  serviceWorker();

  setTimeout(() => {
    setIsLoaded(true);
  }, 1000);

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
