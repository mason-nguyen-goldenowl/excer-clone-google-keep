import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Menu from "../../components/menu/Menu";
import Modal from "../../components/modal/Modal";
import Comfirm from "../../components/comfirm/Comfirm";
import SideMenu from "../../components/sideMenu/SideMenu";
import NoteCardTrash from "../../components/noteCard/NoteCardTrash";

import { getNoteAction } from "../../redux/action/NoteAction";

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
