import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie";
import Masonry from "react-masonry-component";

import Menu from "../../Components/Menu/Menu";
import Modal from "../../Components/Modal/Modal";
import Comfirm from "../../Components/Comfirm/Comfirm";
import SideMenu from "../../Components/SideMenu/SideMenu";
import { getNoteAction } from "../../redux/action/noteAction";
import NoteCardTrash from "../../Components/NoteCard/NoteCardTrash";

import "./Trash.scss";

export default function Trash() {
  const navigate = useNavigate();
  const isLogged = Cookies.get("isLogged");
  const refreshToken = Cookies.get("refresh_token");
  const dispatch = useDispatch();
  const arrNote = useSelector((state) => state.note.arrNote);
  const trashArr = arrNote.filter((note) => note.deleted === true);
  const [modalOpen, setModalOpen] = useState(false);

  const renderNoteCard = () => {
    return arrNote.map((note) => {
      if (note.deleted) {
        return (
          <div key={note._id}>
            <NoteCardTrash content={note} />
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
  }, [dispatch, isLogged, navigate, refreshToken]);

  return (
    <div>
      <Menu title="Trash" />
      <div className="body-content">
        <div className="left">
          <SideMenu active="trash" />
        </div>
        <div className="right">
          <div className="trash__dr">
            <p>Notes in Trash will be deleted after 7 days</p>

            <span
              className="btn-nonbg"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Empty Trash
            </span>
          </div>
          <div className="note__content">
            <Masonry className={"my-gallery-class"}>{renderNoteCard()}</Masonry>
          </div>
        </div>
      </div>
      {modalOpen && (
        <Modal
          setOpenModal={setModalOpen}
          children={<Comfirm setOpenModal={setModalOpen} trashArr={trashArr} />}
        />
      )}
    </div>
  );
}
