import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Moment from "react-moment";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import pin from "../../asset/editorIcon/pin.svg";
import trash from "../../asset/editorIcon/trash.svg";
import background from "../../asset/editorIcon/background.svg";
import image from "../../asset/editorIcon/image.svg";
import select from "../../asset/editorIcon/select.svg";
import archive from "../../asset/editorIcon/archive.svg";
import reminder from "../../asset/editorIcon/reminder.svg";
import more from "../../asset/editorIcon/more.svg";
import time from "../../asset/editorIcon/time.svg";

import { ARCHIVE_NOTE, DELETE_NOTE } from "../../redux/type/NoteType";

import "./NoteCard.scss";

export default function NoteCard(props) {
  const dispatch = useDispatch();
  const [remindDate, setRemindDate] = useState(new Date());

  const note = props.content;

  let reminderClass = "";

  let statusActive = "";
  let labelClass = "";
  let remindTime = new Date(note.remind).getTime();
  let now = new Date().getTime();
  let remainingTime = remindTime - now;

  const archiveAction = () => {
    dispatch({
      type: ARCHIVE_NOTE,
      noteArchive: note,
    });
  };

  const deleteAction = () => {
    note.deleteDay = new Date();
    dispatch({
      type: DELETE_NOTE,
      noteDelete: note,
    });
  };

  if (note.label) {
    labelClass = "labels";
  }

  if (remainingTime > 0) {
    statusActive = "active";
    setTimeout(() => {
      alert(note.title);
      remainingTime = -1;
    }, remainingTime);
  }

  return (
    <div className="note-card">
      <div className="note-card__select">
        <img src={select} alt=".." />
      </div>

      <div className="note-card__pin">
        <img src={pin} alt="..." />
      </div>

      <div className="note-card__text">
        <span className={`reminderStatus ${statusActive}`}>
          <img src={time} alt="" />
          <Moment format="MMM DD, YYYY, hh:mm:A">{note.remind}</Moment>
        </span>

        <h3>{note.title}</h3>
        <p>{note.text}</p>
      </div>

      <span className={`${labelClass}`}>{note.label}</span>

      <div className="note-card__feature">
        <ul className="editor-icon__list">
          <li className="editor-icon__item  ">
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
