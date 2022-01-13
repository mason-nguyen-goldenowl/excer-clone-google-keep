import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import reminder from "../../asset/editorIcon/reminder.svg";
import closeIcon from "../../asset/menuTopIcon/delete.svg";

import colab from "../../asset/editorIcon/colab.svg";
import background from "../../asset/editorIcon/background.svg";
import image from "../../asset/editorIcon/image.svg";
import archive from "../../asset/editorIcon/archive.svg";
import more from "../../asset/editorIcon/more.svg";
import undo from "../../asset/editorIcon/undo.svg";
import time from "../../asset/editorIcon/time.svg";
import "./Editor.scss";
import { useDispatch } from "react-redux";
import { ADDNOTE } from "../../redux/type/NoteType";
import useOnClickOutside from "../../hook/useClickOutside";

export default function Editor(props) {
  const dispatch = useDispatch();
  const [isReminderActive, setReminderActive] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [remindDate, setRemindDate] = useState(new Date());

  const editorRef = useRef("");
  let reminderClass = "";
  let noteItem = {};

  if (isReminderActive === true) {
    reminderClass = "active";
  }

  noteItem.remind = remindDate;
  noteItem.title = title;
  noteItem.text = text;
  if (props.label) {
    noteItem.label = props.label;
  }
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleText = (e) => {
    setText(e.target.value);
  };

  const submitNote = (e) => {
    e.preventDefault();
    dispatch({
      type: ADDNOTE,
      noteItem,
      label: props.label,
    });

    alert("Add note success");
    props.setOpenModal(false);
  };

  useOnClickOutside(editorRef, () => {
    props.setOpenModal(false);

    dispatch({
      type: ADDNOTE,
      noteItem,
      label: props.label,
    });
  });

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
        <div className="editorTitle">
          <input placeholder="Title" name="title" onChange={handleTitle} />
          <div
            className="editorTitle__icon"
            title="Close Editor"
            onClick={() => {
              props.setOpenModal(false);
            }}
          >
            <span>
              <img src={closeIcon} alt=".." />
            </span>
          </div>
        </div>
        <div className="editorText">
          <input
            placeholder="Take a note..."
            name="text"
            onChange={handleText}
          />
        </div>
        <div className="editorFeature">
          <div className="editorFeature__icon">
            <ul className="editorIcon__list">
              <li
                className="editorIcon__item "
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
                          selected={remindDate}
                          showTimeSelect
                          dateFormat="Pp"
                          onChange={(date) => setRemindDate(date)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="editorIcon__item">
                <img src={colab} alt=".." />
              </li>
              <li className="editorIcon__item">
                <img src={background} alt=".." />
              </li>
              <li className="editorIcon__item">
                <img src={image} alt=".." />
              </li>
              <li className="editorIcon__item">
                <img src={archive} alt=".." />
              </li>
              <li className="editorIcon__item">
                <img src={more} alt=".." />
              </li>
              <li className="editorIcon__item">
                <img src={undo} alt=".." />
              </li>
              <li className="editorIcon__item ">
                <img src={undo} alt=".." className="redo" />
              </li>
            </ul>
          </div>
          <div className="editorFeature__close">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}
