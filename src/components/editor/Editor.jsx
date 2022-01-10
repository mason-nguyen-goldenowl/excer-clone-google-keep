import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
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
import { useDispatch } from "react-redux";
import { ADDNOTE } from "../../redux/type/NoteType";

export default function Editor(props) {
  let noteItem = { title: "", text: "", setAlert: null, timeLeft: -1 };
  const dispatch = useDispatch();
  const [isReminderActive, setReminderActive] = useState(false);
  const [remindDate, setRemindDate] = useState(new Date());
  const title = useRef("");
  const text = useRef("");
  let reminderClass = "";
  let timeLeft = remindDate - new Date();
  noteItem.timeLeft = timeLeft;
  if (isReminderActive === true) {
    reminderClass = "active";
  }
  noteItem.remind = moment(remindDate).format();
  noteItem.timeLeft = timeLeft;
  noteItem.setAlert = () => {
    setTimeout(() => {
      if (timeLeft > 0) {
        alert(noteItem.title);
        timeLeft = -1;
      }
    }, timeLeft);
  };
  const submitNote = () => {
    alert("Add note success");
    noteItem.title = title.current.value;
    noteItem.text = text.current.value;

    dispatch({
      type: ADDNOTE,
      noteItem,
    });
    title.current.value = "";
    text.current.value = "";
  };
  return (
    <div className="editor">
      <form onSubmit={submitNote}>
        <div className="editorTitle">
          <input ref={title} placeholder="Title" name="title" />
          <div className="editorTitle__icon">
            <span>
              <img src={pin} alt=".." />
            </span>
          </div>
        </div>
        <div className="editorText">
          <input placeholder="Take a note..." name="text" ref={text} />
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
