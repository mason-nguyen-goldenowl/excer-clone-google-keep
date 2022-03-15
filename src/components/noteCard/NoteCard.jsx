import React, { useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import archive from "../../asset/editorIcon/archive.svg";
import time from "../../asset/editorIcon/time.svg";
import trash from "../../asset/editorIcon/trash.svg";

import {
  archiveNote,
  clearRemindAction,
  deleteNote,
  unArchiveNote,
} from "../../redux/action/NoteAction";

import Modal from "../modal/Modal";
import NoteCardFullSize from "../noteCardFullSize/NoteCardFullSize";
import "./NoteCard.scss";

export default function NoteCard(props) {
  const note = props.content;
  const dispatch = useDispatch();
  const arrLabel = useSelector((state) => state.note.arrLabel);
  const [modalOpen, setModalOpen] = useState(false);

  const label = arrLabel?.find((label) => label._id === note.label_id);
  if (label) {
    note.label_name = label.label_name;
  }
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
    clearTimeout(alert);
  };
  const clearRemind = () => {
    if (note.remind) {
      const action = clearRemindAction;

      dispatch(action(note));
      note.remind = undefined;
    }
  };

  if (note.label_name) {
    labelClass = "labels";
  }

  if (remainingTime > 0) {
    statusActive = "active";
    var alert = setTimeout(() => {
      remainingTime = -1;
      Swal.fire({
        icon: "warning",
        title: note.title,
        html: note.content,
        showConfirmButton: false,
      });
      clearRemind();
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
        {note.title.length === 0 && note.content.length === 0 ? (
          <div>
            <h2>Empty Note</h2>
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

      <span className={`${labelClass}`}>{note.label_name}</span>

      <div className="note-card__feature">
        <ul className="editor-icon__list">
          <li
            className="editor-icon__item"
            onClick={note.archive ? unArchiveAction : archiveAction}
            title={note.archive ? "Unarchive" : "Archive"}
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
        {note.deleted ? (
          <span className="labels" style={{ margin: "5px" }}>
            Deleted
          </span>
        ) : (
          <span></span>
        )}
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
