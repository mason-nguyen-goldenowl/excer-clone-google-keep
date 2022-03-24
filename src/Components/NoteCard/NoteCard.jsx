import React, { useEffect, useState } from "react";

import Moment from "react-moment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import time from "../../asset/editorIcon/time.svg";
import logo from "../../asset/menuTopIcon/pngwing.com.png";
import trash from "../../asset/editorIcon/trash.svg";
import archive from "../../asset/editorIcon/archive.svg";

import {
  archiveNote,
  clearLabelAction,
  clearRemindAction,
  deleteNote,
  unArchiveNote,
} from "../../redux/action/noteAction";

import Modal from "../Modal/Modal";
import NoteCardFullSize from "../NoteCardFullSize/NoteCardFullSize";
import NoteTrashFullSize from "../NoteTrashFullSize/NoteTrashFullSize";

import "./NoteCard.scss";

export default function NoteCard(props) {
  const note = props.content;
  const dispatch = useDispatch();
  const arrLabel = useSelector((state) => state.note.arrLabel);
  const [modalOpen, setModalOpen] = useState(false);

  const clearLabelName = () => {
    if (note.labelName) {
      const action = clearLabelAction;
      dispatch(action(note));
    }
  };
  const label = arrLabel?.find((label) => label._id === note.labelId);

  if (label) {
    note.labelName = label.labelName;
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

  if (note.labelName) {
    labelClass = "labels";
  }

  if (remainingTime > 0) {
    statusActive = "active";
    var alert = setTimeout(() => {
      remainingTime = -1;
      clearRemind();
    }, remainingTime);
  }

  useEffect(() => {
    if (remainingTime < 0) {
      note.remind = undefined;
    }
  }, [note, remainingTime]);

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
          <div className="note-image">
            <img src={`${process.env.REACT_APP_API}/${note.imageUrl}`} alt="" />
          </div>
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

      <span className={`${labelClass}`}>
        <Link to={`/labels/${note.labelId}`}>{note.labelName}</Link>
        {note.labelId ? (
          <span onClick={clearLabelName} className="clear-remind">
            X
          </span>
        ) : (
          <span></span>
        )}
      </span>

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
            note.deleted ? (
              <NoteTrashFullSize setOpenModal={setModalOpen} content={note} />
            ) : (
              <NoteCardFullSize setOpenModal={setModalOpen} content={note} />
            )
          }
        />
      )}
    </div>
  );
}
