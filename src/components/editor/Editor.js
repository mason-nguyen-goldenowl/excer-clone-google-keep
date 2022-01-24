import React, { useRef, useState } from "react";

import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";


import { ADD_NOTE } from "../../redux/type/NoteType";

import reminder from "../../asset/editorIcon/reminder.svg";
import pin from "../../asset/editorIcon/pin.svg";
import colab from "../../asset/editorIcon/colab.svg";
import background from "../../asset/editorIcon/background.svg";
import image from "../../asset/editorIcon/image.svg";
import archive from "../../asset/editorIcon/archive.svg";
import more from "../../asset/editorIcon/more.svg";
import undo from "../../asset/editorIcon/undo.svg";
import time from "../../asset/editorIcon/time.svg";


import "./Editor.scss";

export default function Editor(props) {
  let noteItem = { title: "", text: "", setAlert: null };

  const dispatch = useDispatch();

  const [isReminderActive, setReminderActive] = useState(false);
  const [remindDate, setRemindDate] = useState(new Date());
  const titleRef = useRef("");
  const textRef = useRef("");

  let reminderClass = "";
  let timeLeft = remindDate - new Date();

  if (isReminderActive === true) {
    reminderClass = "active";
  }

  noteItem.remind = moment(remindDate).format();
  noteItem.setAlert = () => {
    setTimeout(() => {
      if (timeLeft > 0) {
        alert(noteItem.title);
        timeLeft = -1;
      }
    }, timeLeft);
  };

  return (
    <div className="editor">
      <div className="editorTitle">
        <input ref={titleRef} placeholder="Title" name="title" />
        <div className="editorTitle__icon">
          <span>
            <img src={pin} alt=".." />
          </span>
        </div>
      </div>
      <div className="editorText">
        <input placeholder="Take a note..." name="text" ref={textRef} />
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
        <div
          className="editorFeature__close"
          onClick={() => {
            alert("Add note success");
            noteItem.title = titleRef.current.value;
            noteItem.text = textRef.current.value;
            dispatch({
              type: ADD_NOTE,
              noteItem,
            });
            titleRef.current.value = "";
            textRef.current.value = "";
          }}
        >
          <span>Close</span>
        </div>
      </div>
    </div>
  );
}
