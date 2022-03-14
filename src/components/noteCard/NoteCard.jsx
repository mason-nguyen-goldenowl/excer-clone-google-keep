import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import archive from "../../asset/editorIcon/archive.svg";
import reminder from "../../asset/editorIcon/reminder.svg";
import time from "../../asset/editorIcon/time.svg";
import trash from "../../asset/editorIcon/trash.svg";
import {
  archiveNote,
  deleteNote,
  unArchiveNote,
} from "../../redux/action/NoteAction";

import Modal from "../modal/Modal";
import NoteCardFullSize from "../noteCardFullSize/NoteCardFullSize";
import "./NoteCard.scss";

export default function NoteCard(props) {
  const note = props.content;
  const dispatch = useDispatch();
  const [remindDate, setRemindDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);

  let reminderClass = "";
  let statusActive = "";
  let labelClass = "";

  let now = new Date().getTime();
  let remindTime = new Date(note.remind).getTime();
  let remainingTime = remindTime - now;
  const unArchiveAction = () => {
    const action = unArchiveNote;
    dispatch(action({ note_id: note._id }));
  };
  const archiveAction = () => {
    const action = archiveNote;
    dispatch(action({ note_id: note._id }));
  };

  const deleteAction = () => {
    const action = deleteNote;
    dispatch(action({ note_id: note._id }));
  };

  if (note.label_name) {
    labelClass = "labels";
  }

  if (remainingTime > 0) {
    statusActive = "active";
    setTimeout(() => {
      remainingTime = -1;
      Swal.fire({
        icon: "warning",
        title: note.title,
        text: note.content,
        showConfirmButton: false,
      });
    }, remainingTime);
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
        <div>
          <h3>
            {note.title.length > 20
              ? note.title.substring(0, 20) + "..."
              : note.title}
          </h3>
          <p>
            {note.content.length > 150
              ? note.content.substring(0, 150) + "..."
              : note.content}
          </p>
        </div>
      </div>

      <span className={`${labelClass}`}>{note.label_name}</span>

      <div className="note-card__feature">
        <ul className="editor-icon__list">
          <li
            className="editor-icon__item"
            onClick={note.archive ? unArchiveAction : archiveAction}
            title="Archive"
          >
            <img src={archive} alt=".." />
          </li>
          <li
            className="editor-icon__item "
            title="Delete"
            onClick={deleteAction}
          >
            <img src={trash} alt=".." />
          </li>
        </ul>
      </div>
      {modalOpen && (
        <Modal
          setOpenModal={setModalOpen}
          children={
            <NoteCardFullSize setOpenModal={setModalOpen} content={note} />
          }
        />
      )}
    </div>
  );
}
