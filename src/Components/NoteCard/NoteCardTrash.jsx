import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Moment from "react-moment";
import time from "../../asset/editorIcon/time.svg";
import trash from "../../asset/editorIcon/trash.svg";
import refresh from "../../asset/menuTopIcon/refresh.svg";
import { removeNote, restoreNote } from "../../redux/action/noteAction";
import NoteTrashFullSize from "../NoteTrashFullSize/NoteTrashFullSize";

import Modal from "../Modal/Modal";

import "./NoteCard.scss";
import { selectNotes } from "../../redux/features/noteSlice";

const Notecardtrash = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { arrLabel } = useSelector(selectNotes);
  const dispatch = useDispatch();

  let note = props.content;

  const deleteForeverAction = () => {
    const action = removeNote;
    dispatch(action({ note_id: note._id }));
  };

  const restoreAction = () => {
    const action = restoreNote;
    dispatch(action({ note_id: note._id }));
  };
  const label = arrLabel?.find((label) => label._id === note.labelId);
  if (label) {
    note = { ...note, labelName: label.labelName };
  }
  let statusActive = "";
  let labelClass = "";

  let now = new Date().getTime();
  let remindTime = new Date(note.remind).getTime();
  let remainingTime = remindTime - now;
  if (remainingTime > 0) {
    statusActive = "active";
  }
  if (note.labelName) {
    labelClass = "labels";
  }

  return (
    <div className="note-card">
      <div
        className="note-card__text"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <span className={`reminderStatus ${statusActive}`}>
          <img src={time} alt="" />
          <Moment format="MMM DD, YYYY, hh:mm:A">{note.remind}</Moment>
        </span>
        {note.imageUrl ? (
          <img src={`${process.env.REACT_APP_API}/${note.imageUrl}`} />
        ) : (
          <span></span>
        )}
        {note.title.trim().length === 0 && note.content === "<p><br></p>" ? (
          <div>
            <h2 className="empty-note">Empty Note</h2>
          </div>
        ) : (
          <div>
            <h3>
              {note.title.length > 20
                ? note.title.substring(0, 20) + "..."
                : note.title}
            </h3>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: note.content }}
            ></div>
          </div>
        )}
      </div>
      <span className={`${labelClass}`}>{note.labelName}</span>
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
        <span className="labels" style={{ margin: "5px" }}>
          Deleted
        </span>
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
