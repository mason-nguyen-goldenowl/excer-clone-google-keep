import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Cookies from "js-cookie";
import Masonry from "react-masonry-component";

import Menu from "../../Components/Menu/Menu";
import Modal from "../../Components/Modal/Modal";
import NoteCard from "../../Components/NoteCard/NoteCard";
import NoteText from "../../Components/NoteText/NoteText";
import SideMenu from "../../Components/SideMenu/SideMenu";
import EditLabel from "../../Components/EditLabel/EditLabel";
import Comfirmlabel from "../../Components/Comfirm/ComfirmLabel";
import { getLabelName } from "../../redux/action/labelAction";
import { getNoteAction } from "../../redux/action/noteAction";

import "./Label.scss";

const Labels = () => {
  const { id } = useParams();
  const isLogged = Cookies.get("isLogged");
  const refreshToken = Cookies.get("refresh_token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const labelName = useSelector((state) => state.note.labelName);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenComfirm, setModalOpenComfirm] = useState(false);
  const arrNote = useSelector((state) => state.note.arrNote);

  const arrLabel = arrNote.filter((item) => item.labelId === id);

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
    const actionget = getNoteAction;
    dispatch(actionget());
    const action = getLabelName;
    dispatch(action(id));
  }, [dispatch, id, isLogged, navigate, refreshToken]);
  return (
    <div>
      <Menu title={labelName} />
      <div className="body-content">
        <div className="left">
          <SideMenu active={labelName} />
        </div>
        <div className="right">
          <div className="create-note-wrap">
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
          children={
            <EditLabel
              label_name={labelName}
              label_id={id}
              setOpenModal={setModalOpen}
            />
          }
        />
      )}
      {modalOpenComfirm && (
        <Modal
          setOpenModal={setModalOpenComfirm}
          children={
            <Comfirmlabel labelId={id} setOpenModal={setModalOpenComfirm} />
          }
        />
      )}
    </div>
  );
};

export default Labels;
