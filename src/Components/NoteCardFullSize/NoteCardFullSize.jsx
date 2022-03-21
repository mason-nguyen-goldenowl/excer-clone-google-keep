import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import autosize from "autosize";
import Moment from "react-moment";
import DatePicker from "react-datepicker";
import { Button } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { stateToHTML } from "draft-js-export-html";
import { ContentState, convertFromHTML, Editor, EditorState } from "draft-js";

import time from "../../asset/editorIcon/time.svg";
import trash from "../../asset/editorIcon/trash.svg";
import image from "../../asset/editorIcon/image.svg";
import labelIcon from "../../asset/editorIcon/label.svg";
import editIcon from "../../asset/sideMenuIcon/Edit.svg";
import archive from "../../asset/editorIcon/archive.svg";
import closeIcon from "../../asset/menuTopIcon/delete.svg";
import reminder from "../../asset/editorIcon/reminder.svg";

import Modal from "../Modal/Modal";
import ComfirmNote from "../Comfirm/ComfirmNote";
import useOnClickOutside from "../../hook/useClickOutside";
import {
  archiveNote,
  clearImageAction,
  clearLabelAction,
  clearRemindAction,
  deleteNote,
  editNote,
  unArchiveNote,
} from "../../redux/action/noteAction";

import "./NoteCardFullSize.scss";

export default function NoteCardFullSize(props) {
  const noteFullSizeRef = useRef();
  const dispatch = useDispatch();

  const note = props.content;
  let reminderClass = "";
  const blocksFromHTML = convertFromHTML(note.content);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const [title, setTitle] = useState(note.title);
  const [remindDate, setRemindDate] = useState();
  const [isLabelNameActive, setIsLabelNameActive] = useState(false);
  const [labelName, setLabelName] = useState(note.labelName);
  const [isReminderActive, setReminderActive] = useState(false);
  const [onRead, setOnRead] = useState(true);
  const [imgSrc, setImgSrc] = useState();
  const [imgFile, setImgFile] = useState(null);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(state)
  );
  const [modalOpenComfirm, setModalOpenComfirm] = useState(false);
  const editorRef = useRef();
  const editorComponentRef = useRef();
  const now = new Date();

  let remindTime = new Date(note.remind).getTime();
  let remainingTime = remindTime - now.getTime();
  const deleteAction = () => {
    const action = deleteNote;
    dispatch(action({ note_id: note._id }));
  };
  const archiveAction = () => {
    const action = archiveNote;
    dispatch(action({ note_id: note._id }));
  };
  const unArchiveAction = () => {
    const action = unArchiveNote;
    dispatch(action({ note_id: note._id }));
  };
  if (isReminderActive === true) {
    reminderClass = "active";
  }

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeReadToEdit = () => {
    setOnRead(!onRead);
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
    if (note.remind) {
      const action = clearRemindAction;

      dispatch(action(note));
    }
    setRemindDate(undefined);
  };

  const clearLabelName = () => {
    if (note.labelName) {
      const action = clearLabelAction;
      dispatch(action(note));
      setLabelName("");
    }
  };
  const clearImage = () => {
    if (note.imageUrl) {
      const action = clearImageAction;
      dispatch(action(note));
    }
    setImgSrc();
    setImgFile();
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let contentLength = editorState.getSelection().getStartOffset();
    let content = stateToHTML(editorState.getCurrentContent());
    props.setOpenModal(false);

    if (!note.deleted) {
      if (
        title !== note.title ||
        content !== note.content ||
        remindDate - now > 0 ||
        labelName !== note.labelName ||
        imgSrc
      ) {
        let noteData = new FormData();
        noteData.append("_id", note._id);
        noteData.append("creator", note.creator);
        noteData.append("title", title.trim());
        noteData.append("content", content);
        if (labelName) {
          noteData.append("labelName", labelName);
        }
        noteData.append("contentLength", contentLength);
        if (remindDate - now) {
          if (remindDate) {
            noteData.append("remind", remindDate);
          }
        }
        if (imgFile) {
          noteData.append("image", imgFile);
        }
        const action = editNote;
        dispatch(action(noteData));
      }
    }
  };

  useOnClickOutside(noteFullSizeRef, () => {
    if (onRead && !isLabelNameActive && !remindDate && !imgSrc) {
      props.setOpenModal(false);
    } else {
      setModalOpenComfirm(true);
    }
  });

  useEffect(() => {
    autosize(document.querySelector(".editor-text_area"));
  }, []);
  return (
    <div className="editor" ref={noteFullSizeRef}>
      <form onSubmit={onSubmit} ref={editorComponentRef}>
        {imgSrc || note.imageUrl ? (
          <div className="editor-image">
            <img
              src={
                imgSrc
                  ? imgSrc
                  : `${process.env.REACT_APP_API}/${note.imageUrl}`
              }
              alt=""
            />
            <span className="clear-image" onClick={clearImage}>
              <img src={closeIcon} alt=".." />
            </span>
          </div>
        ) : (
          <div></div>
        )}

        <input
          type="file"
          id="noteImgEdit"
          name="image"
          className="pick-image"
          onChange={handleChangeFile}
          accept="image/png, image/jpg, image/jpeg"
        />
        <div className="editor-title">
          <textarea
            className="editor-text_area"
            disabled={onRead}
            onChange={handleTitle}
            placeholder="Empty Title"
            value={title}
            name="title"
          />

          <div className="editor-title__icon-wrap">
            {onRead ? (
              <div
                className="editor-title__icon tooltip"
                title="Edit Note"
                style={{ cursor: "pointer", zIndex: 99 }}
                onClick={changeReadToEdit}
              >
                <span>
                  <img src={editIcon} alt=".." />{" "}
                </span>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="editor-text">
          <Editor
            readOnly={onRead}
            placeholder="Note..."
            ref={editorRef}
            editorState={editorState}
            onChange={(editorState) => setEditorState(editorState)}
          />
        </div>
        <div className="remind-wrap">
          {remindDate || note.remind ? (
            <span className="remind-label">
              <Moment title="Remind time" format="MMMM ddd yyyy, HH:mm">
                {remindDate}
              </Moment>
              <span onClick={clearRemind} className="clear-remind">
                X
              </span>
            </span>
          ) : (
            <div></div>
          )}
          {note.labelId || isLabelNameActive ? (
            <span>
              {isLabelNameActive ? (
                <input
                  title="Label Name"
                  value={labelName}
                  className={`remind-label`}
                  placeholder="Enter label name..."
                  onChange={(e) => {
                    setLabelName(e.target.value);
                  }}
                />
              ) : (
                <span
                  value={note.labelName}
                  title="Label Name"
                  className={`labels`}
                >
                  <Link to={`/labels/${note.labelId}`}>{note.labelName}</Link>
                  <span onClick={clearLabelName} className="clear-remind">
                    X
                  </span>
                </span>
              )}
            </span>
          ) : (
            <div></div>
          )}
        </div>

        <div className="editor-feature">
          <div className="editor-feature__icon">
            <ul className="editor-icon__list">
              <li
                className="editor-icon__item "
                title="Reminder"
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
                          selected={remindDate || now}
                          showTimeSelect
                          dateFormat="MMMM dd yyyy, HH:mm "
                          onChange={(date) => {
                            setRemindDate(date);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li
                className="editor-icon__item"
                title={note.archive ? "Unarchive" : "Archive"}
                onClick={note.archive ? unArchiveAction : archiveAction}
              >
                <img src={archive} alt=".." />
              </li>
              <li
                title="Change Label"
                className="editor-icon__item "
                onClick={() => {
                  setIsLabelNameActive(!isLabelNameActive);
                }}
              >
                <div className="reminder__btn">
                  <img src={labelIcon} alt=".." />
                </div>
              </li>
              <li
                className="editor-icon__item "
                title="Add Image"
                onClick={() => {
                  document.querySelector("#noteImgEdit").click();
                }}
              >
                <div className="reminder__btn">
                  <img src={image} alt=".." />
                </div>
              </li>
              <li
                className="editor-icon__item "
                title="Delete"
                onClick={deleteAction}
              >
                <img src={trash} alt=".." />
              </li>
            </ul>
          </div>
          <div className="editor-feature__close">
            <Button className="btn-bg" disabled={onRead} type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
      {modalOpenComfirm && (
        <Modal
          setOpenModalComfirm={setModalOpenComfirm}
          children={
            <ComfirmNote
              setOpenModalComfirm={setModalOpenComfirm}
              content={"Did you comfirm this note?"}
              editorState={editorState}
              onSubmit={onSubmit}
              setOpenModal={props.setOpenModal}
            />
          }
        />
      )}
    </div>
  );
}
