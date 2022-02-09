import React, { useState } from "react";

import { useDispatch } from "react-redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import reminder from "../../asset/editorIcon/reminder.svg";
import pin from "../../asset/editorIcon/pin.svg";

import trash from "../../asset/editorIcon/trash.svg";

import background from "../../asset/editorIcon/background.svg";
import image from "../../asset/editorIcon/image.svg";
import archive from "../../asset/editorIcon/archive.svg";
import more from "../../asset/editorIcon/more.svg";
import select from "../../asset/editorIcon/select.svg";
import time from "../../asset/editorIcon/time.svg";

import "./NoteCard.scss";

import { ARCHIVE_NOTE, DELETE_NOTE } from "../../redux/type/NoteType";

export default function NoteCard(props) {
  const dispatch = useDispatch();
  const [remindDate, setRemindDate] = useState(new Date());
  const [isReminderActive, setReminderActive] = useState(false);

  let reminderClass = "";
  const note = props.content;

  const setAlert = () => {
    if (note.timeLeft > 0) {
      setTimeout(alert(note.title), note.timeLeft);
      note.timeLeft = -1;
    }
  };
  const archiveAction = () => {
    dispatch({
      type: ARCHIVE_NOTE,
      noteArchive: note,
    });
  };

  const deleteAction = () => {
    dispatch({
      type: DELETE_NOTE,
      noteDelete: note,
    });
  };
  setAlert();


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

          <li className="editor-icon__item" onClick={deleteAction}>
            <img src={trash} alt=".." />

          </li>
          <li className="editor-icon__item">
            <img src={background} alt=".." />
          </li>
          <li className="editor-icon__item">
            <img src={image} alt=".." />
          </li>

          <li className="editor-icon__item" onClick={archiveAction}>

            <img src={archive} alt=".." />
          </li>
          <li className="editor-icon__item">
            <img src={more} alt=".." />
          </li>
        </ul>
      </div>
    </div>
  );
}
