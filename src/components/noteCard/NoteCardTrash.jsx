import React from "react";
import { useDispatch } from "react-redux";

import pin from "../../asset/editorIcon/pin.svg";
import trash from "../../asset/editorIcon/trash.svg";
import restore from "../../asset/editorIcon/restore.svg";

import select from "../../asset/editorIcon/select.svg";

import "./NoteCard.scss";
import { DELETEFOREVER, RESTORE } from "../../redux/type/NoteType";

const Notecardtrash = (props) => {
  const dispatch = useDispatch();

  const note = props.content;

  const deleteForeverAction = () => {
    dispatch({
      type: DELETEFOREVER,
      noteDeleteForever: note,
    });
  };
  const restoreAction = () => {
    dispatch({
      type: RESTORE,
      noteRestore: note,
    });
  };
  let after7Days = new Date(note.deleteDay).setDate(new Date().getDate() + 7);

  let now = new Date().getTime();
  let remainingTime = after7Days - now;

  const deleteAfter7Day = () => {
    if (remainingTime > 0) {
      setTimeout(() => {
        dispatch({
          type: DELETEFOREVER,
          noteDeleteForever: note,
        });
      }, remainingTime);
    }
  };
  deleteAfter7Day();
  return (
    <div className="noteCard">
      <div className="noteCard__select">
        <img src={select} alt=".." />
      </div>
      <div className="noteCard__pin">
        <img src={pin} alt="..." />
      </div>
      <div className="noteCard__text">
        <h3>{note.title}</h3>
        <p>{note.text}</p>
      </div>
      <div className="noteCard__feature">
        <ul className="editorIcon__list">
          <li
            className="noteCardIcon"
            title="Delete Forever"
            onClick={deleteForeverAction}
          >
            <img src={trash} alt=".." />
          </li>
          <li className="noteCardIcon" title="Restore" onClick={restoreAction}>
            <img src={restore} alt=".." />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Notecardtrash;
