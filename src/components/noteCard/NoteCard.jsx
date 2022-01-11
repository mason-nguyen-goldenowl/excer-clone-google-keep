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
import { ARCHIVENOTE, DELETENOTE } from "../../redux/type/NoteType";

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
      type: ARCHIVENOTE,
      noteArchive: note,
    });
  };

  const deleteAction = () => {
    dispatch({
      type: DELETENOTE,
      noteDelete: note,
    });
  };
  // setAlert();
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
          <li className="noteCardIcon ">
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
          <li className="noteCardIcon" title="Delete" onClick={deleteAction}>
            <img src={trash} alt=".." />
          </li>
          <li className="noteCardIcon">
            <img src={background} alt=".." />
          </li>
          <li className="noteCardIcon">
            <img src={image} alt=".." />
          </li>
          <li className="noteCardIcon" onClick={archiveAction}>
            <img src={archive} alt=".." />
          </li>
          <li className="noteCardIcon">
            <img src={more} alt=".." />
          </li>
        </ul>
      </div>
    </div>
  );
}
