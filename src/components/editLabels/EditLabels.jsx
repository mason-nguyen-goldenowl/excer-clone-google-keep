import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import useOnClickOutside from "../../hook/useClickOutside";
import {
  createLabels,
  deleteLabel,
  editLabel,
} from "../../redux/action/LabelAction";

import edit from "../../asset/editorIcon/edit.svg";
import check from "../../asset/editorIcon/check.svg";
import labelIcon from "../../asset/editorIcon/label.svg";
import deleteIcon from "../../asset/menuTopIcon/delete.svg";

import "./EditLables.scss";

export default function EditLabels(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editLabelRef = useRef();

  const [label, setLabel] = useState("");
  const arrLabel = useSelector((state) => state.note.arrLabel);

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const addLabel = () => {
    const action = createLabels;
    dispatch(action({ label_name: label }));
  };

  const renderLabel = () => {
    return arrLabel?.map((label) => {
      const editLabelAction = () => {
        const action = editLabel;
        dispatch(
          action({
            label_name: label.label_name,
            label_id: label._id,
            labelChange: changeLabel,
          })
        );
        navigate(`/labels/${changeLabel}`);
      };
      let changeLabel;
      const onInputChange = (e) => {
        changeLabel = e.target.value;
      };

      const deleteLabelAction = () => {
        const action = deleteLabel;
        console.log(label.label_name);
        dispatch(action({ label_name: label.label_name }));

        navigate(`/`);
      };

      return (
        <div className="label__item" key={label._id}>
          <div className="icon">
            <img className="label-icon" src={labelIcon} alt=".." />
            <img
              className="delete-icon"
              src={deleteIcon}
              alt=".."
              onClick={deleteLabelAction}
            />
          </div>
          <p>{label.label_name}</p>

          <input onChange={onInputChange} />
          <div className="icon-edit">
            <img className="edit-icon" src={edit} alt=".." />
            <img
              className="check-icon"
              src={check}
              alt=".."
              onClick={editLabelAction}
            />
          </div>
        </div>
      );
    });
  };

  useOnClickOutside(editLabelRef, () => props.setOpenModal(false));

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
          <div className="cre__btn" onClick={addLabel}>
            <img src={check} alt="..." />
          </div>
        </div>
        <div className="edit-labels__body">{renderLabel()}</div>
        <hr></hr>
        <div className="edit-labels__footer">
          <button
            onClick={() => {
              props.setOpenModal(false);
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
