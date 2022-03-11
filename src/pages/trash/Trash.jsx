import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import Comfirm from "../../components/comfirm/Comfirm";
import Menu from "../../components/menu/Menu";
import Modal from "../../components/modal/Modal";
import NoteCardTrash from "../../components/noteCard/NoteCardTrash";

import SideMenu from "../../components/sideMenu/SideMenu";

import "./Trash.scss";

export default function Trash() {
  const navigate = useNavigate();
  const isLogged = Cookies.get("isLogged");
  const refreshToken = Cookies.get("refresh_token");
  const arrNote = useSelector((state) => state.note.arrNote);
  const [modalOpen, setModalOpen] = useState(false);

  const renderNoteCard = () => {
    return arrNote.map((note) => {
      if (note.deleted) {
        return <NoteCardTrash content={note} key={note._id} />;
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
      <Menu title="Trash" />
      <div className="body-content">
        <div className="left">
          <SideMenu active="trash" />
        </div>
        <div className="right">
          <div className="trash__dr">
            <p>Notes in Trash are deledted after 7 days</p>
            <span
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Empty Trash
            </span>
          </div>
          <div className="note__content">{renderNoteCard()}</div>
        </div>
      </div>
      {modalOpen && (
        <Modal
          setOpenModal={setModalOpen}
          children={<Comfirm setOpenModal={setModalOpen} />}
        />
      )}
    </div>
  );
}
