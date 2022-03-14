import React, { useState } from "react";
import { useDispatch } from "react-redux";
import refresh from "../../asset/menuTopIcon/refresh.svg";
import trash from "../../asset/editorIcon/trash.svg";
import { removeNote, restoreNote } from "../../redux/action/NoteAction";
import Modal from "../modal/Modal";
import NoteTrashFullSize from "../noteTrashFullSize/NoteTrashFullSize";
import "./NoteCard.scss";

const Notecardtrash = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const note = props.content;

  const deleteForeverAction = () => {
    const action = removeNote;
    dispatch(action({ note_id: note._id }));
  };

  const restoreAction = () => {
    const action = restoreNote;
    dispatch(action({ note_id: note._id }));
  };

  return (
    <div className="note-card">
      <div
        className="note-card__text"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <h3>
          {note.title.length > 20
            ? note.title.substring(0, 20) + "..."
            : note.title}
        </h3>
        <p>
          {note.content.length > 100
            ? note.content.substring(0, 100) + "..."
            : note.content}
        </p>
      </div>
      <div className="note-card__feature">
        <ul className="editor-icon__list">
          <li
            className="editor-icon__item"
            title="Delete Forever"
            onClick={deleteForeverAction}
          >
            <img src={trash} alt=".." />
          </li>
          <li
            className="editor-icon__item"
            title="Restore"
            onClick={restoreAction}
          >
            <img src={refresh} alt=".." />
          </li>
        </ul>
      </div>
      {modalOpen && (
        <Modal
          setOpenModal={setModalOpen}
          children={
            <NoteTrashFullSize setOpenModal={setModalOpen} content={note} />
          }
        />
      )}
    </div>
  );
};

export default Notecardtrash;
