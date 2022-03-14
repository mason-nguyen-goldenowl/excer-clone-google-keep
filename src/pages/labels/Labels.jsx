import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Comfirmlabel from "../../components/comfirm/ComfirmLabel";
import EditLabel from "../../components/editLabel/EditLabel";
import Menu from "../../components/menu/Menu";
import Modal from "../../components/modal/Modal";
import NoteCard from "../../components/noteCard/NoteCard";
import NoteText from "../../components/noteText/NoteText";
import SideMenu from "../../components/sideMenu/SideMenu";
import { getNoteAction } from "../../redux/action/NoteAction";

import "./Label.scss";
const Labels = () => {
  const { id } = useParams();
  const isLogged = Cookies.get("isLogged");
  const refreshToken = Cookies.get("refresh_token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenComfirm, setModalOpenComfirm] = useState(false);
  const arrNote = useSelector((state) => state.note.arrNote);

  const arrLabel = arrNote.filter((item) => item.label_name === id);

  const renderNoteCard = () => {
    return arrLabel.map((note) => {
      if (!note.deleted && !note.archive) {
        return (
          <div key={note.id}>
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
      <Menu title={id} />
      <div className="body-content">
        <div className="left">
          <SideMenu active={id} />
        </div>
        <div className="right">
          <div className="editor-wrap">
            <NoteText label={id} />
          </div>
          <div className="edit-label">
            <span
              className="btn-bg"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Edit Label
            </span>
            <span
              className="btn-nonbg"
              onClick={() => {
                setModalOpenComfirm(true);
              }}
            >
              Delete Label
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
          children={<EditLabel label_name={id} setOpenModal={setModalOpen} />}
        />
      )}
      {modalOpenComfirm && (
        <Modal
          setOpenModal={setModalOpenComfirm}
          children={
            <Comfirmlabel label_name={id} setOpenModal={setModalOpenComfirm} />
          }
        />
      )}
    </div>
  );
};

export default Labels;
