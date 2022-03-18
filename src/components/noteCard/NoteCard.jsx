import React, { useState } from "react";
import { useDispatch } from "react-redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import pin from "../../asset/editorIcon/pin.svg";
import more from "../../asset/editorIcon/more.svg";
import time from "../../asset/editorIcon/time.svg";
import trash from "../../asset/editorIcon/trash.svg";
import image from "../../asset/editorIcon/image.svg";
import select from "../../asset/editorIcon/select.svg";
import archive from "../../asset/editorIcon/archive.svg";
import reminder from "../../asset/editorIcon/reminder.svg";
import background from "../../asset/editorIcon/background.svg";

import { ARCHIVE_NOTE, DELETE_NOTE } from "../../redux/type/NoteType";

import "./NoteCard.scss";

export default function NoteCard(props) {
  const dispatch = useDispatch();
  const [remindDate, setRemindDate] = useState(new Date());

  let reminderClass = "";

  const note = props.content;
  let remindTime = new Date(note.remind).getTime();
  let now = new Date().getTime();
  let remainingTime = remindTime - now;

  if (remainingTime > 0) {
    setTimeout(() => {
      alert(note.title);
      remainingTime = -1;
    }, remainingTime);
  }

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
          <li className="note-cardIcon ">
            <div className="reminder__btn" title="Reminder">
              <img src={reminder} alt=".." />

              <div className={`reminder ${reminderClass}`}>
                <p>Reminder:</p>

                <div className="reminder__items">
                  <div className="reminder__item">
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

          <li
            className="editor-icon__item"
            title="Delete"
            onClick={deleteAction}
          >
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
