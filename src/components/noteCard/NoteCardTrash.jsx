import React from "react";
import { useDispatch } from "react-redux";

import pin from "../../asset/editorIcon/pin.svg";
import trash from "../../asset/editorIcon/trash.svg";
import restore from "../../asset/editorIcon/restore.svg";
import select from "../../asset/editorIcon/select.svg";

import { DELETE_FOREVER, RESTORE } from "../../redux/type/NoteType";
import "./NoteCard.scss";

const Notecardtrash = (props) => {
  const dispatch = useDispatch();

  const note = props.content;

  let after7Days = new Date(note.deleteDay).setDate(new Date().getDate() + 7);
  let now = new Date().getTime();
  let remainingTime = after7Days - now;

  const deleteForeverAction = () => {
    dispatch({
      type: DELETE_FOREVER,
      noteDeleteForever: note,
    });
  };

  const restoreAction = () => {
    dispatch({
      type: RESTORE,
      noteRestore: note,
    });
  };

  const deleteAfter7Day = () => {
    if (remainingTime > 0) {
      setTimeout(() => {
        dispatch({
          type: DELETE_FOREVER,
          noteDeleteForever: note,
        });
      }, remainingTime);
    }
  };

  deleteAfter7Day();

  return (
    <div className="note-card">
      <div className="note-card__select">
        <img src={select} alt=".." />
      </div>
      <div className="note-card__pin">
        <img src={pin} alt="..." />
      </div>
      <div className="note-card__text">
        <h3>{note.title}</h3>
        <p>{note.text}</p>
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
            <img src={restore} alt=".." />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Notecardtrash;
