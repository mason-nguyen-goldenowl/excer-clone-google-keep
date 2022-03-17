import React from "react";
import { useDispatch } from "react-redux";

import pin from "../../asset/editorIcon/pin.svg";
import trash from "../../asset/editorIcon/trash.svg";
import restore from "../../asset/editorIcon/restore.svg";
import select from "../../asset/editorIcon/select.svg";
import { removeNote, restoreNote } from "../../redux/action/NoteAction";

import "./NoteCard.scss";

const Notecardtrash = (props) => {
  const dispatch = useDispatch();

  const note = props.content;

  const deleteForeverAction = () => {
    const action = removeNote;
    dispatch(action({ note_id: note._id }));
    console.log(note._id);
  };

  const restoreAction = () => {
    const action = restoreNote;
    dispatch(action({ note_id: note._id }));
  };

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
        <p>{note.content}</p>
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
