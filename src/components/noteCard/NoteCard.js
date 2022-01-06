import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import reminder from "../../asset/editorIcon/reminder.svg";
import pin from "../../asset/editorIcon/pin.svg";
import colab from "../../asset/editorIcon/colab.svg";
import background from "../../asset/editorIcon/background.svg";
import image from "../../asset/editorIcon/image.svg";
import archive from "../../asset/editorIcon/archive.svg";
import more from "../../asset/editorIcon/more.svg";
import select from "../../asset/editorIcon/select.svg";

import time from "../../asset/editorIcon/time.svg";
import "./NoteCard.scss";
import Modal from "../modal/Modal";
import Editor from "../editor/Editor";
export default function NoteCard(props) {
  const [remindDate, setRemindDate] = useState(new Date());
  const [isReminderActive, setReminderActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  let reminderClass = "";
  const note = props.content;
  note.setAlert();
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
            className="editorIcon__item "
            onClick={() => {
              setReminderActive(!isReminderActive);
            }}
          >
            <div className="reminder__btn" title="Reminder">
              <a>
                <img src={reminder} alt=".." />
              </a>
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
            <a>
              <img src={colab} alt=".." />
            </a>
          </li>
          <li className="editorIcon__item">
            <a>
              <img src={background} alt=".." />
            </a>
          </li>
          <li className="editorIcon__item">
            <a>
              <img src={image} alt=".." />
            </a>
          </li>
          <li className="editorIcon__item">
            <a>
              <img src={archive} alt=".." />
            </a>
          </li>
          <li className="editorIcon__item">
            <a>
              <img src={more} alt=".." />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
