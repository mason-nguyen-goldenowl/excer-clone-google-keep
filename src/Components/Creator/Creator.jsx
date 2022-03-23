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
import image from "../../asset/editorIcon/image.svg";
import labelIcon from "../../asset/editorIcon/label.svg";
import reminder from "../../asset/editorIcon/reminder.svg";
import closeIcon from "../../asset/menuTopIcon/delete.svg";

import useOnClickOutside from "../../hook/useClickOutside";

import "./Creator.scss";
import Modal from "../Modal/Modal";
import ComfirmNote from "../Comfirm/ComfirmNote";

export default function CreatorComponent(props) {
  const titleRef = useRef();
  const creatorRef = useRef();

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [remindDate, setRemindDate] = useState();
  const [labelName, setLabelName] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [imgFile, setImgFile] = useState(null);
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
  const clearImage = () => {
    setImgSrc();
    setImgFile();
  };
  const handleChangeFile = async (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }
    setImgFile(file);
  };

  const clearRemind = () => {
    setRemindDate(undefined);
  };

  let content = stateToHTML(editorState.getCurrentContent());
  let contentLength = editorState.getSelection().getStartOffset();

  const submitNote = async (e) => {
    e.preventDefault();
    props.setOpenModal(false);
    let noteItem = new FormData();

    noteItem.append("title", title.trim());
    noteItem.append("content", content);
    if (remindDate) {
      noteItem.append("remind", remindDate);
    }
    noteItem.append("labelName", labelName);
    if (props.label) {
      noteItem.append("labelId", props.label);
    }
    noteItem.append("image", imgFile);
    dispatch(action(noteItem));
  };

  if (isReminderActive === true) {
    reminderClass = "active";
  }

  if (props.label) {
    noteItem.label = props.label;
  }

  useOnClickOutside(creatorRef, () => {
    if (title.length > 0 || contentLength > 0 || imgFile || remindDate) {
      setModalOpenComfirm(true);
    } else {
      props.setOpenModal(false);
    }
  });
  useEffect(() => {
    autosize(document.querySelector(".creator-text__area"));
    titleRef.current.focus();
  }, []);
  return (
    <form
      id="noteForm"
      className="form-creator"
      onSubmit={submitNote}
      ref={creatorRef}
    >
      <div className="creator">
        {imgSrc ? (
          <div className="editor-image">
            <img src={imgSrc} alt="" />
            <span className="clear-image" onClick={clearImage}>
              <img src={closeIcon} alt=".." />
            </span>
          </div>
        ) : (
          <span></span>
        )}

        <div className="creator-title">
          <textarea
            ref={titleRef}
            className="creator-text__area"
            placeholder="Title"
            name="title"
            onChange={handleTitle}
          />

          <div
            className="creator-title__icon"
            onClick={() => {
              props.setOpenModal(false);
            }}
          ></div>
        </div>
        <input
          type="file"
          id="noteImg"
          name="image"
          className="pick-image"
          onChange={handleChangeFile}
          accept="image/png, image/jpg, image/jpeg"
        />
        <br />

        <div className="creator-text">
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
        <div className="creator-feature">
          <div className="creator-feature__icon">
            <ul className="creator-icon__list">
              <li
                className="creator-icon__item "
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
                className="creator-icon__item "
                title="Add Label"
                onClick={() => {
                  setIsLabelNameActive(!isLabelNameActive);
                }}
              >
                <div className="reminder__btn">
                  <img src={labelIcon} alt=".." />
                </div>
              </li>
              <li
                className="creator-icon__item "
                title="Add Image"
                onClick={() => {
                  document.querySelector("#noteImg").click();
                }}
              >
                <div className="reminder__btn">
                  <img src={image} alt=".." />
                </div>
              </li>
            </ul>
          </div>
          <div className="creator-feature__close">
            <button type="submit" className="btn-bg">
              Submit
            </button>
          </div>
        </div>

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
    </form>
  );
}
