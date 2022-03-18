import autosize from "autosize";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Moment from "react-moment";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { stateToHTML } from "draft-js-export-html";
import { createNote } from "../../redux/action/NoteAction";

import time from "../../asset/editorIcon/time.svg";
import reminder from "../../asset/editorIcon/reminder.svg";
import closeIcon from "../../asset/menuTopIcon/delete.svg";

import useOnClickOutside from "../../hook/useClickOutside";
import "./Editor.scss";

export default function EditorComponent(props) {
  const dispatch = useDispatch();
  const editorRef = useRef();
  const titleRef = useRef();
  const [title, setTitle] = useState("");
  const [remindDate, setRemindDate] = useState();
  const [isReminderActive, setReminderActive] = useState(false);
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const editor = useRef(null);

  const action = createNote;

  let noteItem = {};
  let reminderClass = "";

  const now = new Date();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const clearRemind = () => {
    setRemindDate(undefined);
  };
  const submitNote = async (e) => {
    e.preventDefault();
    let content = stateToHTML(editorState.getCurrentContent());
    let contentLength = editorState.getSelection().getStartOffset();
    props.setOpenModal(false);
    if (title.length > 0 || contentLength > 0 || remindDate - now > 0) {
      noteItem = {
        title: title,
        content: content,
        remind: remindDate,
        label_id: props.label,
      };
      dispatch(action(noteItem));
    }
  };

  if (isReminderActive === true) {
    reminderClass = "active";
  }

  if (props.label) {
    noteItem.label = props.label;
  }
  useOnClickOutside(editorRef, submitNote);
  useEffect(() => {
    autosize(document.querySelector(".editor-text_area"));
    titleRef.current.focus();
  }, []);
  return (
    <div className="editor" ref={editorRef}>
      <form
        onSubmit={
          ((e) => {
            e.preventDefault();
          },
          submitNote)
        }
      >
        <div className="editor-title">
          <textarea
            ref={titleRef}
            className="editor-text_area"
            placeholder="Title"
            name="title"
            onChange={handleTitle}
          />

          <div
            className="editor-title__icon tooltip"
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

        <div className="editor-text">
          <Editor
            placeholder="Take a note..."
            ref={editor}
            editorState={editorState}
            onChange={(editorState) => setEditorState(editorState)}
          />
        </div>
        <div className="remind-wrap">
          {remindDate - now > 0 ? (
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
        <div
          className="editor-feature"
          onClick={() => {
            setReminderActive(!isReminderActive);
          }}
        >
          <div className="editor-feature__icon">
            <ul className="editor-icon__list">
              <li
                className="editor-icon__item "
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
                          selected={remindDate || new Date()}
                          showTimeSelect
                          dateFormat="Pp"
                          onChange={(date) => setRemindDate(date)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="editor-feature__close">
            <button type="submit" className="btn-bg">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
