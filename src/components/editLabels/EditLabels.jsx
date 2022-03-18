import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import useOnClickOutside from "../../hook/useClickOutside";

import check from "../../asset/editorIcon/check.svg";
import edit from "../../asset/editorIcon/edit.svg";
import labelIcon from "../../asset/editorIcon/label.svg";
import deleteIcon from "../../asset/menuTopIcon/delete.svg";

import {
  ADD_LABEL,
  DELETE_LABEL,
  UPDATE_LABEL,
} from "../../redux/type/NoteType";

import "./EditLables.scss";

export default function EditLabels(props) {
  const dispatch = useDispatch();

  const { arrLabel } = useSelector((state) => state.note);

  const editLabelRef = useRef();

  const [label, setLabel] = useState("");

  let arrLabelUpdate = [...arrLabel];

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const renderLabel = () => {
    return arrLabel.map((item, index) => {
      let changeLabel = item;
      const onInputChange = (e) => {
        item = e.target.value;
      };

      arrLabelUpdate[index] = item;

      return (
        <div className="label__item" key={index}>
          <div className="icon">
            <img className="label-icon" src={labelIcon} alt=".." />
            <img
              className="delete-icon"
              src={deleteIcon}
              alt=".."
              onClick={() => {
                dispatch({
                  type: DELETE_LABEL,
                  labelDelete: item,
                });
              }}
            />
          </div>
          <p>{item}</p>

          <input onChange={onInputChange} />
          <div className="icon-edit">
            <img className="edit-icon" src={edit} alt=".." />
            <img
              className="check-icon"
              src={check}
              alt=".."
              onClick={() => {
                dispatch({
                  type: UPDATE_LABEL,
                  labelUpdate: changeLabel,
                  item,
                });
              }}
            />
          </div>
        </div>
      );
    });
  };

  useOnClickOutside(editLabelRef, () => props.setOpenModal(false));
  console.log(editLabelRef);
  return (
    <div className="edit-labels" ref={editLabelRef}>
      <div className="edit-labels__title">
        <p>Edit labels</p>
        <img
          src={deleteIcon}
          alt=".."
          onClick={() => {
            props.setOpenModal(false);
          }}
        />
      </div>
      <div className="edit-labels-wrap">
        <div className="edit-labels__cre">
          <input placeholder="Create new label" onChange={onLabelChange} />
          <div
            className="cre__btn"
            onClick={() => {
              dispatch({
                type: ADD_LABEL,
                label,
              });
              setLabel("");
            }}
          >
            <img src={check} alt="..." />
          </div>
        </div>
        <div className="edit-labels__body">{renderLabel()}</div>
        <hr></hr>
        <div className="edit-labels__footer">
          <button
            onClick={() => {
              dispatch({
                type: UPDATE_LABEL,
                arrLabelUpdate,
              });
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
