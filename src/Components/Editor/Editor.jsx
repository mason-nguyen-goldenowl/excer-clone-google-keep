import autosize from "autosize";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import Moment from "react-moment";
import DatePicker from "react-datepicker";
import { Editor, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import "draft-js/dist/Draft.css";
import "react-datepicker/dist/react-datepicker.css";

import { createNote } from "../../redux/action/noteAction";

import time from "../../asset/editorIcon/time.svg";
import labelIcon from "../../asset/editorIcon/label.svg";
import reminder from "../../asset/editorIcon/reminder.svg";
import closeIcon from "../../asset/menuTopIcon/delete.svg";

import useOnClickOutside from "../../hook/useClickOutside";

import "./Editor.scss";
import Modal from "../Modal/Modal";
import ComfirmNote from "../Comfirm/ComfirmNote";

export default function EditorComponent(props) {
  const titleRef = useRef();
  const editorRef = useRef();

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [remindDate, setRemindDate] = useState();
  const [labelName, setLabelName] = useState("");
  const [isLabelNameActive, setIsLabelNameActive] = useState(false);
  const [isReminderActive, setReminderActive] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [modalOpenComfirm, setModalOpenComfirm] = useState(false);
  const editor = useRef();

  const action = createNote;

  let noteItem = {};
  let reminderClass = "";

  const now = new Date();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChange = (e) => {
    setEditorState(e);
  };
  const handleLabelName = (e) => {
    setLabelName(e.target.value);
  };

  const clearRemind = () => {
    setRemindDate(undefined);
  };

  let content = stateToHTML(editorState.getCurrentContent());

  const submitNote = async (e) => {
    e.preventDefault();
    props.setOpenModal(false);

    noteItem = {
      title: title.trim(),
      content: content,
      remind: remindDate,
      label_name: labelName,
      label_id: props.label,
    };
    dispatch(action(noteItem));
  };

  if (isReminderActive === true) {
    reminderClass = "active";
  }

  if (props.label) {
    noteItem.label = props.label;
  }

  useOnClickOutside(editorRef, () => {
    setModalOpenComfirm(true);
  });
  useEffect(() => {
    autosize(document.querySelector(".editor-text_area"));
    titleRef.current.focus();
  }, []);
  return (
    <div className="editor">
      <form onSubmit={submitNote} ref={editorRef}>
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
            onBlur={handleChange}
            onChange={handleChange}
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

          {isLabelNameActive ? (
            <span>
              <input
                type="text"
                placeholder="Enter label name..."
                className="remind-label"
                onChange={handleLabelName}
              />
            </span>
          ) : (
            <span></span>
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
              <li
                className="editor-icon__item "
                title="Add Label"
                onClick={() => {
                  setIsLabelNameActive(!isLabelNameActive);
                }}
              >
                <div className="reminder__btn">
                  <img src={labelIcon} alt=".." />
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
      {modalOpenComfirm && (
        <Modal
          setOpenModalComfirm={setModalOpenComfirm}
          children={
            <ComfirmNote
              setOpenModalComfirm={setModalOpenComfirm}
              content={"Do you want to create this note?"}
              editorState={editorState}
              onSubmit={submitNote}
              setOpenModal={props.setOpenModal}
            />
          }
        />
      )}
    </div>
  );
}