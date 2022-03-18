import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import autosize from "autosize";
import Moment from "react-moment";
import DatePicker from "react-datepicker";
import { Button } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";

import editIcon from "../../asset/sideMenuIcon/Edit.svg";
import trash from "../../asset/editorIcon/trash.svg";
import time from "../../asset/editorIcon/time.svg";
import archive from "../../asset/editorIcon/archive.svg";
import closeIcon from "../../asset/menuTopIcon/delete.svg";
import reminder from "../../asset/editorIcon/reminder.svg";

import useOnClickOutside from "../../hook/useClickOutside";
import {
  archiveNote,
  clearRemindAction,
  deleteNote,
  editNote,
  unArchiveNote,
} from "../../redux/action/NoteAction";

import "./NoteCardFullSize.scss";
import { convertFromHTML, Editor, EditorState } from "draft-js";
import { ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

export default function NoteCardFullSize(props) {
  const noteFullSizeRef = useRef();
  const dispatch = useDispatch();

  const note = props.content;
  let reminderClass = "";
  const blocksFromHTML = convertFromHTML(note.content);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const [title, setTitle] = useState(note.title);
  const [remindDate, setRemindDate] = useState();
  const [isReminderActive, setReminderActive] = useState(false);
  const [onRead, setOnRead] = useState(true);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(state)
  );
  const editorRef = useRef();
  const now = new Date();

  let remindTime = new Date(note.remind).getTime();
  let remainingTime = remindTime - now.getTime();
  const deleteAction = () => {
    const action = deleteNote;
    dispatch(action({ note_id: note._id }));
  };
  const archiveAction = () => {
    const action = archiveNote;
    dispatch(action({ note_id: note._id }));
  };
  const unArchiveAction = () => {
    const action = unArchiveNote;
    dispatch(action({ note_id: note._id }));
  };
  if (isReminderActive === true) {
    reminderClass = "active";
  }

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeReadToEdit = () => {
    setOnRead(!onRead);
  };

  const clearRemind = () => {
    if (note.remind) {
      const action = clearRemindAction;

      dispatch(action(note));
    }
    setRemindDate(undefined);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let contentLength = editorState.getSelection().getStartOffset();
    let content = stateToHTML(editorState.getCurrentContent());
    props.setOpenModal(false);
    if (
      (title.length > 0 && !note.deleted) ||
      (contentLength > 0 && !note.deleted)
    ) {
      if (
        title !== note.title ||
        content !== note.content ||
        remindDate - now > 0
      ) {
        note.title = title;
        note.content = content;
        if (remindDate - now) {
          if (remindDate) {
            note.remind = remindDate;
          } else {
            note.remind = null;
          }
        }
        const action = editNote;
        dispatch(action(note));
      }
    }
  };

  useOnClickOutside(noteFullSizeRef, onSubmit);

  useEffect(() => {
    autosize(document.querySelector(".editor-text_area"));
  }, []);
  return (
    <div className="editor" ref={noteFullSizeRef}>
      <form onSubmit={onSubmit}>
        <div className="editor-title">
          <textarea
            className="editor-text_area"
            disabled={onRead}
            onChange={handleTitle}
            placeholder="Empty Title"
            value={title}
            name="title"
          />

          <div className="editor-title__icon-wrap">
            {onRead ? (
              <div
                className="editor-title__icon tooltip"
                style={{ cursor: "pointer", zIndex: 99 }}
                onClick={changeReadToEdit}
              >
                <span className="tooltiptext">Edit Note</span>
                <span>
                  <img src={editIcon} alt=".." />{" "}
                </span>
              </div>
            ) : (
              <div></div>
            )}

            <div
              className="editor-title__icon tooltip"
              style={{ cursor: "pointer" }}
              onClick={() => {
                props.setOpenModal(false);
              }}
            >
              <span className="tooltiptext">Close Editor</span>
              <span>
                <img src={closeIcon} alt=".." />
              </span>
            </div>
          </div>
        </div>
        <div className="editor-text">
          <Editor
            readOnly={onRead}
            placeholder="Note..."
            ref={editorRef}
            editorState={editorState}
            onChange={(editorState) => setEditorState(editorState)}
          />
        </div>
        <div className="remind-wrap">
          {remindDate || note.remind ? (
            <span className="remind-label">
              <Moment format="MMMM ddd yyyy, HH:mm">{remindDate}</Moment>
              <span onClick={clearRemind} className="clear-remind">
                X
              </span>
            </span>
          ) : (
            <div></div>
          )}
        </div>
        <div className="editor-feature">
          <div className="editor-feature__icon">
            <ul className="editor-icon__list">
              <li
                className="editor-icon__item "
                title="Reminder"
                onClick={() => {
                  setReminderActive(!isReminderActive);
                }}
              >
                <div className="reminder__btn" title="Reminder">
                  <img src={reminder} alt=".." />

                  <div className={`reminder ${reminderClass}`}>
                    <p>Reminder:</p>

                    <div className="reminder__items">
                      <div
                        className="reminder__item"
                        onClick={() => {
                          setReminderActive(true);
                        }}
                      >
                        <img src={time} alt="..." />
                        <span> Pick date & time </span>
                      </div>
                      <div className="reminder__item">
                        <DatePicker
                          selected={remindDate || now}
                          showTimeSelect
                          dateFormat="MMMM dd yyyy, HH:mm "
                          onChange={(date) => {
                            setRemindDate(date);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li
                className="editor-icon__item"
                title={note.archive ? "Unarchive" : "Archive"}
                onClick={note.archive ? unArchiveAction : archiveAction}
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
          <div className="editor-feature__close">
            <Button className="btn-bg" disabled={onRead} type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
