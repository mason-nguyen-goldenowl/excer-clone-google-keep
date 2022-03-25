import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import useOnClickOutside from "../../hook/useClickOutside";

import trash from "../../asset/editorIcon/trash.svg";
import refresh from "../../asset/menuTopIcon/refresh.svg";
import { removeNote, restoreNote } from "../../redux/action/noteAction";

import "./NoteTrashFullSize.scss";

export default function NoteTrashFullSize(props) {
  const dispatch = useDispatch();
  const noteTrashRef = useRef();
  const note = props.content;
  let cardHeight;

  if (note.content.length > 700) {
    cardHeight = "500px";
  }

  const deleteForeverAction = () => {
    const action = removeNote;
    dispatch(action({ note_id: note._id }));
  };

  const restoreAction = () => {
    const action = restoreNote;
    dispatch(action({ note_id: note._id }));
  };

  useOnClickOutside(noteTrashRef, () => props.setOpenModal(false));

  return (
    <div
      className="big-note-trash"
      ref={noteTrashRef}
      style={{ height: cardHeight }}
    >
      <div className="editor-image">
        {note.imageUrl ? (
          <img src={`${process.env.REACT_APP_API}/${note.imageUrl}`} alt="" />
        ) : (
          <span></span>
        )}
      </div>
      <div className="note-trash-content">
        <h3>{note.title}</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: note.content }}
        ></div>
      </div>
      <div className="big-note-trash_feature">
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
      </div>
    </div>
  );
}
