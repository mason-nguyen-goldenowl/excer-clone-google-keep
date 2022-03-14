import autosize from "autosize";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from "react-moment";

import more from "../../asset/editorIcon/more.svg";
import time from "../../asset/editorIcon/time.svg";
import undo from "../../asset/editorIcon/undo.svg";
import colab from "../../asset/editorIcon/colab.svg";
import image from "../../asset/editorIcon/image.svg";
import archive from "../../asset/editorIcon/archive.svg";
import reminder from "../../asset/editorIcon/reminder.svg";
import closeIcon from "../../asset/menuTopIcon/delete.svg";
import background from "../../asset/editorIcon/background.svg";

import useOnClickOutside from "../../hook/useClickOutside";
import { createNote } from "../../redux/action/NoteAction";
import "./Editor.scss";

export default function Editor(props) {
  const dispatch = useDispatch();
  const editorRef = useRef("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [remindDate, setRemindDate] = useState();
  const [isReminderActive, setReminderActive] = useState(false);
  const action = createNote;

  let noteItem = {};
  let reminderClass = "";

  const now = new Date();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const submitNote = async (e) => {
    e.preventDefault();
    props.setOpenModal(false);
    if (title.length > 0 || text.length > 0 || remindDate) {
      noteItem = {
        title: title,
        content: text,
        remind: remindDate,
        label_name: props.label,
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

  useOnClickOutside(editorRef, async () => {
    props.setOpenModal(false);
    if (title.length > 0 || text.length > 0 || remindDate) {
      noteItem = {
        title: title,
        content: text,
        remind: remindDate,
        label_name: props.label,
      };
      dispatch(action(noteItem));
    }
  });
  useEffect(() => {
    autosize(document.querySelector(".editor-text_area"));
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
          <input placeholder="Title" name="title" onChange={handleTitle} />
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
          <textarea
            className="editor-text_area "
            onChange={handleText}
            placeholder="Take a note..."
            name="text"
            value={text}
          />
        </div>
        <div className="remind-wrap">
          {remindDate - now ? (
            <span className="remind-label">
              <Moment format="MMMM ddd yyyy, HH:mm">{remindDate}</Moment>
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
