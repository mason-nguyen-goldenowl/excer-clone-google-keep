import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import check from "../../asset/editorIcon/check.svg";
import labelIcon from "../../asset/editorIcon/label.svg";
import edit from "../../asset/editorIcon/edit.svg";
import deleteIcon from "../../asset/menuTopIcon/delete.svg";

import { ADD_LABEL, UPDATE_LABEL } from "../../redux/type/NoteType";

import "./EditLables.scss";

export default function EditLabels(props) {
  const dispatch = useDispatch();
  const { arrLabel } = useSelector((state) => state.NoteReducer);
  const [inputValue, setInputValue] = useState("");
  const [label, setLabel] = useState("");

  let arrLabelUpdate = [];

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const renderLabel = () => {
    return arrLabel.map((item, index) => {
      const onInputChange = (e) => {
        setInputValue(e.target.value);
      };
      arrLabelUpdate.push(item);

      return (
        <div className="label__item" key={index}>
          <div className="icon">
            <img className="labelIcon" src={labelIcon} alt=".." />
            <img
              className="deleteIcon"
              src={deleteIcon}
              alt=".."
              onClick={() => {
                setInputValue("");
              }}
            />
          </div>
          <p>{item}</p>
          <input value={inputValue} onChange={onInputChange} />
          <div className="iconEdit">
            <img className="editIcon" src={edit} alt=".." />
            <img className="checkIcon" src={check} alt=".." />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="editLabels">
      <div className="editLabels__title">
        <p>Edit labels</p>
        <img
          src={deleteIcon}
          alt=".."
          onClick={() => {
            props.setOpenModal(false);
          }}
        />
      </div>
      <div className="editLabels-wrap">
        <div className="editLabels__cre">
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
        <div className="editLabels__body">{renderLabel()}</div>
        <hr></hr>
        <div className="editLabels__footer">
          <button
            onClick={() => {
              dispatch({
                type: UPDATE_LABEL,
                arrLabelUpdate,
              });
              alert("Update Label susccessed");
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
